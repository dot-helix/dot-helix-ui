import type { MergeElementProps } from "@styleless-ui/react";
import { componentWithForwardedRef } from "@styleless-ui/react/utils";
import * as React from "react";
import { generateClassesWithBreakpoints } from "../internals";
import type { CommonProps, PropWithBreakpoints } from "../types";
import { combineClasses as cls } from "../utils";
import classes from "./FlexLayout.module.css";
import * as Slots from "./slots";

type OwnProps = Pick<CommonProps, "className" | "children"> & {
  /**
   * If `true`, the paddings will be removed.
   */
  noPadding?: PropWithBreakpoints<boolean>;
  /**
   * Determines whether the container should be fluid or not.
   */
  fluid?: PropWithBreakpoints<boolean>;
};

export type Props = MergeElementProps<"div", OwnProps>;

const FlexLayoutBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, children, noPadding, fluid, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      ref={ref}
      data-slot={Slots.Root}
      className={cls(
        className,
        classes.root,
        generateClassesWithBreakpoints(classes, "root", "fluid", fluid),
        generateClassesWithBreakpoints(
          classes,
          "root",
          "no-padding",
          noPadding,
        ),
      )}
    >
      {children}
    </div>
  );
};

const FlexLayout = componentWithForwardedRef(
  FlexLayoutBase,
  "FlexLayout.Container",
);

export default FlexLayout;
