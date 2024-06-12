import type { MergeElementProps } from "@styleless-ui/react";
import { componentWithForwardedRef } from "@styleless-ui/react/utils";
import * as React from "react";
import type { CommonProps } from "../../types";
import { combineClasses as cls } from "../../utils";
import classes from "../Layout.module.css";
import * as Slots from "../slots";

type OwnProps = Pick<CommonProps, "className" | "children">;

export type Props = MergeElementProps<"div", OwnProps>;

const ColGroupBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, children, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      ref={ref}
      data-slot={Slots.ColGroup}
      className={cls(className, classes["col-group"])}
    >
      {children}
    </div>
  );
};

const ColGroup = componentWithForwardedRef(ColGroupBase, "Layout.ColGroup");

export default ColGroup;
