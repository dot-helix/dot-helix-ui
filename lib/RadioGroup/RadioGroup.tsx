import * as React from "react";
import {
  RadioGroup as StylelessRadioGroup,
  type RadioGroupProps,
} from "@styleless-ui/react";
import Radio from "../Radio";
import classes from "./RadioGroup.module.css";
import cls from "classnames";

type RadioItem = {
  /**
   * The label of the radio.
   */
  label: string;
  /**
   * The value of the radio.
   */
  value: string;
  /**
   * If `true`, the radio will be disabled.
   * @default false
   */
  disabled?: boolean;
};

type OwnProps = Pick<
  RadioGroupProps,
  "value" | "defaultValue" | "onChange" | "label" | "orientation"
> & {
  /**
   * The className applied to the component.
   */
  className?: string;
  /**
   * The group items.
   */
  items: RadioItem[];
  /**
   * The size of the items.
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
};

export type Props = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof OwnProps | "defaultChecked" | "children"
> &
  OwnProps;

const RadioGroupBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    className,
    items: itemsProp,
    label,
    onChange,
    value,
    defaultValue,
    orientation = "vertical",
    size = "medium",
    ...otherProps
  } = props;

  const items = itemsProp.map(({ label, value, disabled = false }) => (
    <Radio
      key={label + value}
      label={label}
      value={value}
      disabled={disabled}
      size={size}
    />
  ));

  return (
    <StylelessRadioGroup
      {...otherProps}
      orientation={orientation}
      label={label}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      ref={ref}
      classes={{
        root: cls(className, classes.root),
        group: cls(
          classes.group,
          classes[`group--${orientation}`],
          classes[`group--${size}`],
        ),
        label: classes.label,
      }}
    >
      {items}
    </StylelessRadioGroup>
  );
};

const RadioGroup = React.forwardRef(RadioGroupBase) as typeof RadioGroupBase;

export default RadioGroup;
