import type { MergeElementProps } from "@styleless-ui/react";
import * as React from "react";
import type { CommonProps } from "../../types";
import { combineClasses as cls, componentWithForwardedRef } from "../../utils";
import classes from "../Table.module.css";
import * as Slots from "../slots";

type OwnProps = Pick<CommonProps, "className" | "children">;

export type Props = MergeElementProps<"tbody", OwnProps>;

const BodyBase = (props: Props, ref: React.Ref<HTMLTableSectionElement>) => {
  const { className, children, ...otherProps } = props;

  return (
    <tbody
      {...otherProps}
      ref={ref}
      data-slot={Slots.Body}
      className={cls(className, classes.body)}
    >
      {children}
    </tbody>
  );
};

const Body = componentWithForwardedRef(BodyBase, "Table.Body");

export default Body;
