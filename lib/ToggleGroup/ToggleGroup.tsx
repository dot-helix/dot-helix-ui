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
  };

export type Props = Omit<
  MergeElementProps<"div", OwnProps>,
  | "checked"
  | "defaultChecked"
  | "children"
  | "content"
  | "color"
  | "value"
  | "defaultValue"
  | "onChange"
  | "onChangeCapture"
> &
  (
    | {
        selectMode: "single";
        /**
         * The value of the active toggles.
         */
        value?: string;
        /**
         * The default value. Use when the component is not controlled.
         */
        defaultValue?: string;
        /**
         * The Callback is fired when the value state changes.
         */
        onValueChange?: (value: string) => void;
      }
    | {
        selectMode: "multiple";
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
      }
  );

const ToggleGroupBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    className,
    items: itemsProp,
    selectMode = "single",
    fluid = false,
    disabled = false,
    size = "medium",
    onValueChange,
    ...otherProps
  } = props;

  const { direction } = useTokensClient();

  const items = itemsProp.map(item => (
    <Item
      {...item}
      disabled={item.disabled ?? disabled}
      key={item.title + item.value}
    />
  ));

  const handleValueChange = (value: string | string[]) => {
    if (disabled) return;

    onValueChange?.(value as string & string[]);
  };

  return (
    <StylelessToggleGroup
      {...otherProps}
      // @ts-expect-error React hasn't added `inert` yet
      inert={disabled ? "" : undefined}
      ref={ref}
      multiple={selectMode === "multiple"}
      aria-disabled={disabled}
      data-disabled={disabled ? "" : undefined}
      data-fluid={fluid ? "" : undefined}
      data-size={size}
      data-select-mode={selectMode}
      onValueChange={handleValueChange}
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
