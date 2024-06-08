import { TreeView as StylelessTreeView } from "@styleless-ui/react";
import { ChevronRightIcon } from "../internals";
import { combineClasses as cls } from "../utils";
import classes from "./TreeView.module.css";
import * as Slots from "./slots";
import type { TreeViewItem } from "./types";

export const createItems = (items: TreeViewItem[]) =>
  items.map(item => {
    let subTree: JSX.Element | undefined = undefined;
    let icon: JSX.Element | null = null;
    let expandIcon: JSX.Element | null = null;

    if (item.children && item.children.length > 0) {
      subTree = (
        <StylelessTreeView.SubTree
          className={({ open }) =>
            cls(classes.subtree, { [classes["subtree--open"]!]: open })
          }
        >
          {createItems(item.children)}
        </StylelessTreeView.SubTree>
      );

      expandIcon = (
        <div
          aria-hidden="true"
          data-slot={Slots.ItemExpandIcon}
          className={classes["item-expand-icon"]}
        >
          <ChevronRightIcon />
        </div>
      );
    }

    if (item.icon) {
      icon = (
        <div
          aria-hidden="true"
          data-slot={Slots.ItemIcon}
          className={classes["item-icon"]}
        >
          {item.icon}
        </div>
      );
    }

    return (
      <StylelessTreeView.Item
        key={item.title + item.value}
        value={item.value}
        disabled={item.disabled}
        data-slot={Slots.ItemContainer}
        className={({ active, disabled, expandable, expanded, selected }) =>
          cls(classes.item, {
            [classes["item--active"]!]: active,
            [classes["item--disabled"]!]: disabled,
            [classes["item--expandable"]!]: expandable,
            [classes["item--expanded"]!]: expanded,
            [classes["item--selected"]!]: selected,
          })
        }
        subTree={subTree}
        triggerContent={
          <div className={cls(classes["item-container"])}>
            {icon}
            {item.title}
            {expandIcon}
          </div>
        }
      />
    );
  });
