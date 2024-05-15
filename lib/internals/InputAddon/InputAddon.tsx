import type { MergeElementProps } from "@styleless-ui/react";
import type { CommonProps } from "../../types";
import { combineClasses as cls } from "../../utils";
import classes from "./InputAddon.module.css";
import * as Slots from "./slots";

type OwnProps = Pick<
  CommonProps,
  "className" | "children" | "size" | "disabled"
> & {
  /**
   * The variant of the component.
   *
   * @default "node"
   */
  variant?: "icon" | "text" | "node";
};

export type Props = Omit<
  MergeElementProps<"div", OwnProps>,
  "defaultValue" | "value" | "defaultChecked" | "checked" | "color" | "content"
>;

const InputAddon = (props: Props) => {
  const {
    className,
    children,
    variant = "node",
    size = "medium",
    disabled = false,
    ...otherProps
  } = props;

  return (
    <div
      {...otherProps}
      data-slot={Slots.Root}
      data-variant={variant}
      className={cls(
        className,
        classes.root,
        classes[`root--${variant}`],
        classes[`root--${size}`],
        {
          [classes["root--disabled"]!]: disabled,
        },
      )}
    >
      {children}
    </div>
  );
};

export default InputAddon;
