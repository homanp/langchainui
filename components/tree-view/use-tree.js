import { useMemo } from "react";
import { useAtom } from "jotai";
import { uniq } from "ramda";
import { expandedKeysAtom, selectionKeysAtom } from "../../utils/atoms";
import {
  extendedNodes,
  nodesToSelectionKeys,
  findDescendantKeys,
  getExpandedKeys,
} from "../../utils";

export const useTree = () => {
  const [selectionKeys, setSelectionKeys] = useAtom(selectionKeysAtom);
  const [expandedKeys, setExpandedKeys] = useAtom(expandedKeysAtom);

  const parents = useMemo(
    () =>
      uniq(
        Object.keys(selectionKeys)
          .filter((key) => selectionKeys[key]?.checked)
          .map((key) => key.split(".")[0] ?? "")
      ),
    [selectionKeys]
  );

  const descendants = useMemo(
    () =>
      parents.reduce((acc, key) => {
        const node = selectionKeys[key];
        if (!node) return acc;
        findDescendantKeys(node).forEach((k) => {
          acc[k] = selectionKeys[k]?.checked ?? false;
        });
        return acc;
      }, {}),
    [parents, selectionKeys]
  );

  const intermediates = useMemo(() => {
    const desc = parents.reduce((acc, key) => {
      acc[key] = Object.keys(descendants).filter((k) =>
        k.startsWith(key)
      ).length;
      return acc;
    }, {});

    const check = parents.reduce((acc, key) => {
      acc[key] = Object.keys(descendants).filter(
        (k) => k.startsWith(key) && !!selectionKeys[k]?.checked
      ).length;
      return acc;
    }, {});

    return parents.reduce((acc, key) => {
      const d = desc[key] ?? 0;
      const c = check[key] ?? 0;
      acc[key] = c !== 0 && d > c && d !== c;
      return acc;
    }, {});
  }, [parents, descendants, selectionKeys]);

  const isNodeLeaf = (node) => {
    return node.leaf === false
      ? false
      : !(node.descendants && node.descendants.length);
  };

  return {
    selectionKeys,
    setSelectionKeys,
    expandedKeys,
    setExpandedKeys,
    extendedNodes,
    nodesToSelectionKeys,
    findDescendantKeys,
    getExpandedKeys,
    intermediates,
    isNodeLeaf,
  };
};
