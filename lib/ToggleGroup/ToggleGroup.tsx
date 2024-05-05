import {
  ToggleGroup as StylelessToggleGroup,
  type MergeElementProps,
  type ToggleGroupProps,
} from "@styleless-ui/react";
import * as React from "react";
import { useTokensClient } from "../systems";
import type { CommonProps } from "../types";
import { combineClasses as cls, componentWithForwardedRef } from "../utils";
import classes from "./ToggleGroup.module.css";
import { Item } from "./components";
import type { ToggleItem } from "./types";

type OwnProps = Pick<ToggleGroupProps, "keyboardActivationBehavior" | "label"> &
  Pick<CommonProps, "className" | "size"> & {
    /**
     * The group items.
     */
    items: ToggleItem[];
    /**
     * If `true`, the component will fill the parent's width.
     *
     * @default false
     */
    fluid?: boolean;
    /**
     * If `true`, the group will be disabled.
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * The select mode of the items.
     *
     * @default "single"
     */
    selectMode?: "multiple" | "single";
    /**
     * The value of the active toggles.
     */
    value?: string[];
    /**
     * The default value. Use when the component is not controlled.
     */
    defaultValue?: string[];
    /**
     * The Callback is fired when the value state changes.
     */
    onValueChange?: (value: string[]) => void;
  };

export type Props = Omit<
  MergeElementProps<"div", OwnProps>,
  "checked" | "defaultChecked" | "children" | "content" | "color"
>;

const ToggleGroupBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    className,
    value,
    defaultValue,
    items: itemsProp,
    selectMode = "single",
    fluid = false,
    disabled = false,
    size = "medium",
    onValueChange,
    ...otherProps
  } = props;

  const { useDirection } = useTokensClient();

  const direction = useDirection();

  const transformValue = (value?: string[]) => {
    if (typeof value === "undefined") return value;
    if (selectMode === "multiple") return value;

    return value[0];
  };

  const handleValueChange = (value: string | string[]) => {
    if (disabled) return;

    if (selectMode === "multiple") onValueChange?.(value as string[]);
    else onValueChange?.([value as string]);
  };

  const items = itemsProp.map(item => (
    <Item
      {...item}
      disabled={item.disabled ?? disabled}
      key={item.title + item.value}
    />
  ));

  return (
    // @ts-expect-error It is confused due to multiple is being set dynamically
    <StylelessToggleGroup
      {...otherProps}
      ref={ref}
      multiple={selectMode === "multiple"}
      value={transformValue(value)}
      defaultValue={transformValue(defaultValue)}
      onValueChange={handleValueChange}
      aria-disabled={disabled}
      data-disabled={disabled ? "" : undefined}
      className={cls(
        className,
        classes.root,
        classes[`root--${size}`],
        classes[`root--${direction}`],
        {
          [classes["root--fluid"]!]: fluid,
          [classes["root--disabled"]!]: disabled,
        },
      )}
    >
      {items}
    </StylelessToggleGroup>
  );
};

const ToggleGroup = componentWithForwardedRef(ToggleGroupBase, "ToggleGroup");

export default ToggleGroup;
