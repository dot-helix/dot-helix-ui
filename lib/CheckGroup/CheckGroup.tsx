import * as React from "react";
import {
  CheckGroup as StylelessCheckGroup,
  type CheckGroupProps
} from "@styleless-ui/react";
import Checkbox from "../Checkbox";
import classes from "./CheckGroup.module.css";
import cls from "classnames";

type CheckItem = {
  /**
   * The label of the checkbox.
   */
  label: string;
  /**
   * The value of the checkbox.
   */
  value: string;
  /**
   * If `true`, the checkbox will be disabled.
   * @default false
   */
  disabled?: boolean;
};

type OwnProps = Pick<
  CheckGroupProps,
  "value" | "defaultValue" | "onChange" | "label" | "orientation"
> & {
  /**
   * The className applied to the component.
   */
  className?: string;
  /**
   * The group items.
   */
  items: CheckItem[];
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

const CheckGroupBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
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
    <Checkbox
      key={label + value}
      label={label}
      value={value}
      disabled={disabled}
      size={size}
    />
  ));

  return (
    <StylelessCheckGroup
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
          classes[`group--${size}`]
        ),
        label: classes.label
      }}
    >
      {items}
    </StylelessCheckGroup>
  );
};

const CheckGroup = React.forwardRef(CheckGroupBase) as typeof CheckGroupBase;

export default CheckGroup;
