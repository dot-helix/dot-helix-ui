/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Checkbox as StylelessCheckbox,
  type CheckboxProps,
} from "@styleless-ui/react";
import cls from "classnames";
import * as React from "react";
import classes from "./Checkbox.module.css";

type OwnProps = Pick<
  CheckboxProps,
  | "label"
  | "value"
  | "onChange"
  | "checked"
  | "defaultChecked"
  | "disabled"
  | "autoFocus"
  | "indeterminated"
> & {
  /**
   * The className applied to the component.
   */
  className?: string;
  /**
   * The size of the checkbox.
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
  /**
   * If `true`, the checkbox will fill the parent's width.
   * @default false
   */
  fluid?: boolean;
};

export type Props = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof OwnProps | "value" | "defaultValue" | "children"
> &
  OwnProps;

const CheckboxBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    className,
    label,
    value,
    checked,
    defaultChecked,
    disabled,
    onChange,
    indeterminated = false,
    fluid = false,
    autoFocus = false,
    size = "medium",
    ...otherProps
  } = props;

  return (
    <div
      {...otherProps}
      className={cls(className, classes.root, classes[`root--${size}`], {
        [classes["root--fluid"]!]: fluid,
      })}
      ref={ref}
    >
      <StylelessCheckbox
        label={label}
        indeterminated={indeterminated}
        disabled={disabled}
        onChange={onChange}
        checked={checked}
        autoFocus={autoFocus}
        defaultChecked={defaultChecked}
        value={value}
        classes={({ checked, disabled, indeterminated, focusedVisible }) => ({
          root: cls(classes.input, {
            [classes["input--disabled"]!]: disabled,
            [classes["input--checked"]!]: checked,
            [classes["input--focus-visible"]!]: focusedVisible,
            [classes["input--indeterminated"]!]: indeterminated,
          }),
          check: classes.check,
          label: classes.label,
        })}
      />
    </div>
  );
};

const Checkbox = React.forwardRef(CheckboxBase) as typeof CheckboxBase;

export default Checkbox;
