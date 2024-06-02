import type { MergeElementProps } from "@styleless-ui/react";
import * as React from "react";
import type { CommonProps } from "../../types";
import { combineClasses as cls, componentWithForwardedRef } from "../../utils";
import classes from "../Card.module.css";
import * as Slots from "../slots";

type OwnProps = Pick<CommonProps, "children" | "className">;

export type Props = MergeElementProps<"div", OwnProps>;

const ContentBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, children, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      ref={ref}
      data-slot={Slots.Content}
      className={cls(className, classes.content)}
    >
      {children}
    </div>
  );
};

const Content = componentWithForwardedRef(ContentBase, "Card.Content");

export default Content;
