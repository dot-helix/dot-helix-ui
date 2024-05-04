import {
  Menu as StylelessMenu,
  type MergeElementProps,
} from "@styleless-ui/react";
import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../internals";
import { useTokensClient } from "../systems";
import type { CommonProps } from "../types";
import {
  combineClasses as cls,
  componentWithForwardedRef,
  useDeterministicId,
} from "../utils";
import classes from "./Menu.module.css";
import { Check, Group, Item, RadioGroup } from "./components";
import type { Item as ItemType } from "./types";

type OwnProps = Pick<
  StylelessMenu.RootProps,
  "resolveAnchor" | "alignment" | "open" | "onClose" | "label"
> &
  Pick<CommonProps, "className"> & {
    /**
     * The items of the menu.
     */
    items: ItemType[];
  };

export type Props = Omit<
  MergeElementProps<"div", OwnProps>,
  "checked" | "defaultChecked" | "value" | "defaultValue" | "children"
>;

const MenuBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    id: idProp,
    className,
    items,
    label,
    open,
    alignment,
    onClose,
    resolveAnchor,
    ...otherProps
  } = props;

  const scopeId = useDeterministicId(idProp, "hui-menu-scope");

  const { useDirection } = useTokensClient();

  const direction = useDirection();

  const renderItems = (items: ItemType[]) => {
    if (items.length === 0) return null;

    return items.map((item, idx) => {
      switch (item.type) {
        case "separator": {
          return (
            <StylelessMenu.SeparatorItem
              key={item.type + String(idx)}
              className={classes.separator}
            />
          );
        }

        case "default": {
          return (
            <Item
              key={item.type + String(idx) + item.title}
              scopeId={scopeId}
              title={item.title}
              disabled={item.disabled}
              endContent={item.endContent}
              expandIcon={
                direction === "ltr" ? <ChevronRightIcon /> : <ChevronLeftIcon />
              }
              icon={item.icon}
              subMenuContent={renderItems(item.subMenu ?? [])}
              onSelect={item.onSelect}
            />
          );
        }

        case "check-item": {
          return (
            <Check
              key={item.type + String(idx) + item.title}
              scopeId={scopeId}
              title={item.title}
              disabled={item.disabled}
              value={item.value}
              checked={item.checked}
              onCheckedChange={item.onCheckedChange}
              onSelect={item.onSelect}
            />
          );
        }

        case "group": {
          return (
            <Group
              key={item.type + String(idx) + item.title}
              scopeId={scopeId}
              title={item.title}
              content={renderItems(item.items)}
            />
          );
        }

        case "radio-group": {
          return (
            <RadioGroup
              key={item.type + String(idx) + item.title}
              scopeId={scopeId}
              title={item.title}
              options={item.options}
              value={item.value}
              onValueChange={item.onValueChange}
            />
          );
        }

        default: {
          return null;
        }
      }
    });
  };

  return (
    <StylelessMenu.Root
      {...otherProps}
      id={scopeId}
      ref={ref}
      className={({ open }) =>
        cls(className, classes.root, classes[`root--${direction}`], {
          [classes["root--open"]!]: open,
        })
      }
      label={label}
      open={open}
      alignment={alignment}
      onClose={onClose}
      resolveAnchor={resolveAnchor}
    >
      {renderItems(items)}
    </StylelessMenu.Root>
  );
};

const Menu = componentWithForwardedRef(MenuBase, "Menu");

export default Menu;
