import { memo, useRef, useMemo, useCallback } from "react";
import { chakra, Checkbox, Box, HStack, IconButton } from "@chakra-ui/react";
import { BiChevronDown, BiChevronRight } from "react-icons/bi";
import { useTree } from "./use-tree";

/**
 * Modified version of https://github.com/primefaces/primereact/tree/master/components/lib/tree
 * @todo
 * - Bug: Checked state does not calculate correct when moving from intermediate state
 * - Init state from save object (update) keys.split(',')
 * - Precalculate values on init; parents (keys + length), descendants (keys + length)
 * - Move more logic to jotai using optics
 */
export const TreeNode = memo(
  ({ root, node, path, index, isReadOnly = false, isDisabled = false }) => {
    const {
    //   findDescendantKeys,
    //   selectionKeys,
    //   setSelectionKeys,
      expandedKeys,
      setExpandedKeys,
    //   intermediates,
      isNodeLeaf,
    } = useTree();

    const contentRef = useRef(null);
    const descendants = useMemo(
      () => node.descendants ?? [],
      [node.descendants]
    );

    const isExpanded = useMemo(
      () => Object.prototype.hasOwnProperty.call(expandedKeys, node.key),
      [expandedKeys, node.key]
    );

    // const isChecked = useMemo(() => {
    //   const selection = selectionKeys[node.key];
    //   return selection?.checked ?? false;
    // }, [node.key, selectionKeys]);

    // const isIntermediate = useMemo(() => {
    //   if (
    //     node.key === "all" &&
    //     Object.values(intermediates).some((bool) => bool)
    //   ) {
    //     return true;
    //   }
    //   return intermediates[node.key] ?? false;
    // }, [node.key, intermediates]);

    const expand = useCallback(() => {
      const keys = {
        ...expandedKeys,
        [node.key]: true,
      };
      setExpandedKeys(keys);
    }, [node.key, expandedKeys, setExpandedKeys]);

    const collapse = useCallback(() => {
      const keys = Object.keys(expandedKeys).reduce((acc, key) => {
        if (key === node.key) return acc;
        acc[key] = true;
        return acc;
      }, {});
      setExpandedKeys(keys);
    }, [node.key, expandedKeys, setExpandedKeys]);

    // const toggleSelectionKeys = useCallback(
    //   (checked) => {
    //     const descendants = findDescendantKeys(node);
    //     const keys = {
    //       ...selectionKeys,
    //       [node.key]: {
    //         ...selectionKeys[node.key],
    //         checked,
    //         intermediate: false,
    //       },
    //       ...descendants.reduce((acc, key) => {
    //         acc[key] = {
    //           ...selectionKeys[key],
    //           checked,
    //           intermediate: false,
    //         };
    //         return acc;
    //       }, {}),
    //     };

    //     setSelectionKeys(keys);
    //   },
    //   [node, selectionKeys, setSelectionKeys, findDescendantKeys]
    // );

    const onTogglerClick = useCallback(
      (event) => {
        if (isExpanded) collapse();
        else expand();

        event.preventDefault();
        event.stopPropagation();
      },
      [collapse, expand, isExpanded]
    );

    const createLabel = () => <Box as="span">{node.label}</Box>;

    // const createCheckbox = () => (
    //   <Checkbox
    //     isChecked={isChecked}
    //     isIndeterminate={isIntermediate}
    //     isReadOnly={isReadOnly}
    //     isDisabled={isDisabled}
    //     onChange={(event) => {
    //       toggleSelectionKeys(event.currentTarget.checked);
    //     }}
    //   />
    // );

    const createToggler = () => {
      if (!descendants?.length) return null;

      return (
        <IconButton
          isRound
          size="xs"
          variant="link"
          colorScheme="blue"
          aria-label="Expand"
          onClick={onTogglerClick}
          fontSize="24px"
          icon={isExpanded ? <BiChevronDown /> : <BiChevronRight />}
        />
      );
    };

    const createContent = () => (
      <Box
        role="treeitem"
        ref={contentRef}
        tabIndex={0}
        aria-posinset={index + 1}
        aria-expanded={isExpanded}
        sx={{
          pl: descendants?.length ? 0 : 6,
        }}
      >
        <HStack>
          {createToggler()}
          {/* {createCheckbox()} */}
          {createLabel()}
        </HStack>
      </Box>
    );

    const createChildren = () => {
      if (!descendants?.length || !isExpanded) return null;

      return (
        <chakra.ul
          role="group"
          sx={{
            pl: isNodeLeaf(node) ? 0 : 6,
            listStyleType: "none",
          }}
        >
          {descendants.map((descendant, key) => (
            <TreeNode
              key={descendant.key}
              node={descendant}
              parent={node}
              root={root}
              index={key}
              last={key === descendants.length - 1}
              path={`${path}-${key}`}
              isReadOnly={isReadOnly}
              isDisabled={isDisabled}
            />
          ))}
        </chakra.ul>
      );
    };

    const createNode = () => (
      <chakra.li
        sx={{
          pl: isNodeLeaf(node) ? 2 : 1,
        }}
      >
        {createContent()}
        {createChildren()}
      </chakra.li>
    );

    return createNode();
  }
);

TreeNode.displayName = "TreeNode";
