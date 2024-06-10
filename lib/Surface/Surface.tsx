import type { MergeElementProps } from "@styleless-ui/react";
import * as React from "react";
import type { CommonProps } from "../types";
import { combineClasses as cls, componentWithForwardedRef } from "../utils";
import classes from "./Surface.module.css";
import * as Slots from "./slots";

type OwnProps = Pick<CommonProps, "children" | "className"> & {
  /**
   * The elevation level of the component.
   *
   * @default "mid"
   */
  level: "low" | "mid" | "high";
};

export type Props = MergeElementProps<"div", OwnProps>;

const SurfaceBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, children, level = "mid", ...otherProps } = props;

  return (
    <div
      {...otherProps}
      ref={ref}
      data-slot={Slots.Root}
      data-level={level}
      className={cls(className, classes.root, classes[`root--${level}`])}
    >
      {children}
    </div>
  );
};

const Surface = componentWithForwardedRef(SurfaceBase, "Surface");

export default Surface;
