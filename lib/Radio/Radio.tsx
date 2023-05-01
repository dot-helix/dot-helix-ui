/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Radio as StylelessRadio, type RadioProps } from "@styleless-ui/react";
import cls from "classnames";
import * as React from "react";
import classes from "./Radio.module.css";

type OwnProps = Pick<
  RadioProps,
  | "label"
  | "value"
  | "onChange"
  | "checked"
  | "defaultChecked"
  | "disabled"
  | "autoFocus"
> & {
  /**
   * The className applied to the component.
   */
  className?: string;
  /**
   * The size of the radio.
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
  /**
   * If `true`, the radio will fill the parent's width.
   * @default false
   */
  fluid?: boolean;
};

export type Props = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof OwnProps | "value" | "defaultValue" | "children"
> &
  OwnProps;

const RadioBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    className,
    label,
    value,
    checked,
    defaultChecked,
    disabled,
    onChange,
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
      <StylelessRadio
        label={label}
        disabled={disabled}
        onChange={onChange}
        checked={checked}
        autoFocus={autoFocus}
        defaultChecked={defaultChecked}
        value={value}
        classes={({ checked, disabled, focusedVisible }) => ({
          root: cls(classes.input, {
            [classes["input--disabled"]!]: disabled,
            [classes["input--checked"]!]: checked,
            [classes["input--focus-visible"]!]: focusedVisible,
          }),
          check: classes.check,
          label: classes.label,
        })}
      />
    </div>
  );
};

const Radio = React.forwardRef(RadioBase) as typeof RadioBase;

export default Radio;
