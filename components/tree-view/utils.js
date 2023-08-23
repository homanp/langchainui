export const extendedNodes = (nodes) =>
  nodes.reduce((acc, childNode) => {
    acc.push({
      ...childNode,
      leaf: !childNode.descendants,
      checked: false,
      intermediate: false,
    });
    if (childNode.descendants) {
      const ns = childNode.descendants.reduce((a, n) => {
        acc.push({
          ...n,
          leaf: !n.descendants,
          checked: false,
          intermediate: false,
        });
        if (n.descendants) a.push(...extendedNodes(n.descendants));
        return a;
      }, []);
      acc.push(...ns);
    }
    return acc;
  }, []);

export const findDescendantKeys = (node) =>
  (node.descendants ?? []).reduce((acc, childNode) => {
    acc.push(childNode.key);
    if (childNode.descendants) acc.push(...findDescendantKeys(childNode));
    return acc;
  }, []);

export const getExpandedKeys = (nodes) =>
  nodes.reduce((acc, node) => {
    if (node.descendants) {
      acc[node.key] = true;
      acc = {
        ...acc,
        ...getExpandedKeys(node.descendants),
      };
    }
    return acc;
  }, {});

export const nodesToSelectionKeys = (nodes) =>
  nodes.reduce((acc, node) => {
    acc[node.key] = node;
    return acc;
  }, {});
