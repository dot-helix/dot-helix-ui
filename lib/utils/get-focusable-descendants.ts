import { isFocusable } from "@styleless-ui/react/utils";

const getFocusableDescendants = (parent: HTMLElement): HTMLElement[] => {
  const result: HTMLElement[] = [];

  const recurse = (node: HTMLElement, excludeNode = false) => {
    if (!excludeNode && isFocusable(node)) result.push(node);

    for (const child of Array.from(node.children)) {
      recurse(child as HTMLElement);
    }
  };

  recurse(parent, true);

  return result;
};

export default getFocusableDescendants;
