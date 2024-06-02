import type { MergeElementProps } from "@styleless-ui/react";
import { componentWithForwardedRef } from "@styleless-ui/react/utils";
import * as React from "react";
import { generateClassesWithBreakpoints } from "../../internals";
import type { CommonProps, PropWithBreakpoints } from "../../types";
import { combineClasses as cls } from "../../utils";
import classes from "../FlexLayout.module.css";

type OwnProps = Pick<CommonProps, "className" | "children"> & {
  /**
   * The size of the flex column.
   */
  size?: PropWithBreakpoints<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>;
  /**
   * The order of the flex column.
   */
  order?: PropWithBreakpoints<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>;
  /**
   * The offset of the flex column.
   */
  offset?: PropWithBreakpoints<
    0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
  >;
};

export type Props = MergeElementProps<"div", OwnProps>;

const ColBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, children, size, order, offset, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      ref={ref}
      className={cls(
        className,
        classes.col,
        generateClassesWithBreakpoints(classes, "col", "size", size),
        generateClassesWithBreakpoints(classes, "col", "order", order),
        generateClassesWithBreakpoints(classes, "col", "offset", offset),
      )}
    >
      {children}
    </div>
  );
};

const Col = componentWithForwardedRef(ColBase, "FlexLayout.Col");

export default Col;
