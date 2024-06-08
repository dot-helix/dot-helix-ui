import type { MergeElementProps } from "@styleless-ui/react";
import * as React from "react";
import { Logger } from "../internals";
import type { CommonProps } from "../types";
import { combineClasses as cls, componentWithForwardedRef } from "../utils";
import classes from "./Skeleton.module.css";
import * as Slots from "./slots";

type OwnProps = Pick<CommonProps, "className"> & {
  /**
   * Optional children to infer width and height from.
   */
  children?: React.ReactNode;
  /**
   * The ratio of the width to the height.
   *
   * Only works when `variant="rectangular"`.
   */
  ratio?: number;
  /**
   * Width of the skeleton.
   * Useful when the skeleton is inside an inline element with no width of its own.
   */
  width?: React.CSSProperties["width"];
  /**
   * Height of the skeleton.
   * Useful when you don't want to adapt the skeleton to a text element but for instance a card.
   */
  height?: React.CSSProperties["height"];
  /**
   * The type of content that will be rendered.
   *
   * @default "text"
   */
  variant?: "circular" | "rectangular" | "text";
};

export type Props = MergeElementProps<"div", OwnProps>;

const SkeletonBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    className,
    children,
    ratio,
    width,
    height,
    style: styleProp,
    variant = "text",
    ...otherProps
  } = props;

  const style: React.CSSProperties = {
    ...(styleProp ?? {}),
    width,
    height,
  };

  if (ratio && variant === "rectangular") {
    style.height = 0;
    style.paddingTop = `${100 / ratio}%`;
  } else if (ratio && variant !== "rectangular") {
    Logger.devOnly.log(
      'You can only use `ratio` when `variant="rectangular"`.',
      "error",
      "Skeleton",
    );
  }

  return (
    <div
      {...otherProps}
      data-slot={Slots.Root}
      data-variant={variant}
      style={style}
      ref={ref}
      className={cls(className, classes.root, classes[`root--${variant}`], {
        [classes["root--has-children"]!]: !!children,
        [classes["root--auto-width"]!]: !!children && !width,
        [classes["root--auto-height"]!]: !!children && !height,
      })}
    >
      {children}
    </div>
  );
};

const Skeleton = componentWithForwardedRef(SkeletonBase, "Skeleton");

export default Skeleton;
