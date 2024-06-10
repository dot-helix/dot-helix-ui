import type { MergeElementProps } from "@styleless-ui/react";
import * as React from "react";
import type { CommonProps } from "../../types";
import { combineClasses as cls, componentWithForwardedRef } from "../../utils";
import classes from "../Table.module.css";
import * as Slots from "../slots";

type OwnProps = Pick<CommonProps, "className" | "children">;

export type Props = MergeElementProps<"div", OwnProps>;

const WrapperBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, children, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      ref={ref}
      data-slot={Slots.Wrapper}
      className={cls(className, classes.wrapper)}
    >
      {children}
    </div>
  );
};

const Wrapper = componentWithForwardedRef(WrapperBase, "Table.Wrapper");

export default Wrapper;
