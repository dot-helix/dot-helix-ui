import {
  TreeView as StylelessTreeView,
  type MergeElementProps,
} from "@styleless-ui/react";
import * as React from "react";
import { useTokensClient } from "../systems";
import type { CommonProps } from "../types";
import { combineClasses as cls, componentWithForwardedRef } from "../utils";
import classes from "./TreeView.module.css";
import type { TreeViewItem } from "./types";
import { createItems } from "./utils";

type OwnProps = Pick<CommonProps, "className"> &
  Pick<
    StylelessTreeView.RootProps,
    | "selectability"
    | "expandedDescendants"
    | "defaultExpandedDescendants"
    | "selectedDescendants"
    | "defaultSelectedDescendants"
    | "onExpandStateChange"
    | "onSelectStateChange"
    | "label"
  > & {
    items: TreeViewItem[];
  };

export type Props = Omit<
  MergeElementProps<"div", OwnProps>,
  | "children"
  | "onSelect"
  | "onSelectCapture"
  | "onChange"
  | "onChangeCapture"
  | "defaultValue"
  | "value"
  | "defaultChecked"
  | "checked"
>;

const TreeViewBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, items: itemsProp, ...otherProps } = props;

  const { direction } = useTokensClient();

  return (
    <StylelessTreeView.Root
      {...otherProps}
      ref={ref}
      className={cls(className, classes.root, classes[`root--${direction}`])}
    >
      {createItems(itemsProp)}
    </StylelessTreeView.Root>
  );
};

const TreeView = componentWithForwardedRef(TreeViewBase, "TreeView");

export default TreeView;
