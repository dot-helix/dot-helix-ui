import type { MergeElementProps } from "@styleless-ui/react";
import * as React from "react";
import type { CommonProps } from "../../types";
import { combineClasses as cls, componentWithForwardedRef } from "../../utils";
import classes from "../Card.module.css";
import * as Slots from "../slots";

type OwnProps = Pick<CommonProps, "children" | "className">;

export type Props = MergeElementProps<"div", OwnProps>;

const ActionsBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, children, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      ref={ref}
      data-slot={Slots.Actions}
      className={cls(className, classes.actions)}
    >
      {children}
    </div>
  );
};

const Actions = componentWithForwardedRef(ActionsBase, "Card.Actions");

export default Actions;
