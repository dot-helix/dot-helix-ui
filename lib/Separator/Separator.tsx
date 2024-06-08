import type { MergeElementProps } from "@styleless-ui/react";
import * as React from "react";
import { combineClasses as cls, componentWithForwardedRef } from "../utils";
import classes from "./Separator.module.css";
import * as Slots from "./slots";

type OwnProps = {
  /**
   * The orientation of the separator.
   */
  orientation: "horizontal" | "vertical";
  /**
   * The size of the margin around the separator.
   *
   * @default "md"
   */
  marginSize?: "xxs" | "xs" | "sm" | "md" | "lg" | "xlg" | false;
  /**
   * The size of the separator in the container.
   *
   * @default "auto"
   */
  size?: "auto" | "full";
};

export type Props = Omit<MergeElementProps<"div", OwnProps>, "children">;

const SeparatorBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    className,
    orientation,
    marginSize = "md",
    size = "auto",
    ...otherProps
  } = props;

  return (
    <div
      {...otherProps}
      role="separator"
      aria-orientation={orientation}
      data-orientation={orientation}
      data-margin-size={marginSize}
      data-size={size}
      data-slot={Slots.Root}
      ref={ref}
      className={cls(
        className,
        classes.root,
        classes[`root--${orientation}`],
        classes[`root--${size}`],
        {
          [cls(classes["root--margin"], classes[`root--margin-${marginSize}`])]:
            !!marginSize,
        },
      )}
    />
  );
};

const Separator = componentWithForwardedRef(SeparatorBase, "Separator");

export default Separator;
