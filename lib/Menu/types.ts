import type { Menu } from "@styleless-ui/react";

export type SeparatorItem = { type: "separator" };

export type NormalItem = Pick<Menu.ItemProps, "disabled" | "onSelect"> & {
  type: "default";
  /**
   * The title of the item.
   */
  title: string;
  /**
   * The sub-menu of the component.
   * If provided, this item will be expandable.
   */
  subMenu?: Item[];
  /**
   * The icon placed before the title.
   */
  icon?: React.ReactNode;
  /**
   * The end content placed after the title.
   */
  endContent?: React.ReactNode;
};

export type CheckItem = Pick<
  Menu.CheckItemProps,
  "disabled" | "value" | "checked" | "onCheckedChange" | "onSelect"
> & {
  type: "check-item";
  /**
   * The title of the item.
   */
  title: string;
};

export type RadioGroupItem = Pick<
  Menu.RadioGroupProps,
  "value" | "onValueChange"
> & {
  type: "radio-group";
  /**
   * The title of the group.
   */
  title: string;
  /**
   * The radio options of the group.
   */
  options: Array<
    Pick<Menu.RadioItemProps, "value" | "disabled" | "onSelect"> & {
      /**
       * The title of the option.
       */
      title: string;
    }
  >;
};

export type GroupItem = {
  type: "group";
  /**
   * The title of the group.
   */
  title: string;
  /**
   * The items of the group.
   */
  items: (SeparatorItem | NormalItem | CheckItem | RadioGroupItem)[];
};

export type Item =
  | SeparatorItem
  | NormalItem
  | CheckItem
  | RadioGroupItem
  | GroupItem;
