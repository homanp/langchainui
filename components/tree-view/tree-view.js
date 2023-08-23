// https://codesandbox.io/s/chakra-ui-checkbox-tree-view-7ooex5?file=/src/components/tree/use-tree.ts:295-302
import { memo, forwardRef, useRef, useImperativeHandle } from "react";
import { chakra, Box } from "@chakra-ui/react";
import { TreeNode } from "./tree-node";

export const Tree = memo(
  forwardRef((props, ref) => {
    const elementRef = useRef(null);

    useImperativeHandle(ref, () => ({
      props,
      getElement: () => elementRef.current
    }));

    const getRootNode = () => {
      return props.value ?? [];
    };

    const createRootChild = (
      node,
      index,
      last
    ) => (
      <TreeNode
        key={node.key}
        index={index}
        root={getRootNode()}
        node={node}
        last={last}
        path={String(index)}
        isReadOnly={props.isReadOnly ?? false}
        isDisabled={props.isDisabled ?? false}
      />
    );

    const createRootChildren = () => {
      const value = getRootNode();
      return value.map((node, index) =>
        createRootChild(node, index, index === value.length - 1)
      );
    };

    const createModel = () => {
      if (!props.value) return null;

      const rootNodes = createRootChildren();

      return (
        <chakra.ul
          role="tree"
          sx={{
            listStyleType: "none"
          }}
        >
          {rootNodes}
        </chakra.ul>
      );
    };

    return <Box ref={elementRef}>{createModel()}</Box>;
  })
);
