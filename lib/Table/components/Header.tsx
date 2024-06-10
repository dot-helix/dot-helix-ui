import type { MergeElementProps } from "@styleless-ui/react";
import * as React from "react";
import type { CommonProps } from "../../types";
import { combineClasses as cls, componentWithForwardedRef } from "../../utils";
import classes from "../Table.module.css";
import * as Slots from "../slots";

type OwnProps = Pick<CommonProps, "className" | "children">;

export type Props = MergeElementProps<"thead", OwnProps>;

const HeaderBase = (props: Props, ref: React.Ref<HTMLTableSectionElement>) => {
  const { className, children, ...otherProps } = props;

  return (
    <thead
      {...otherProps}
      ref={ref}
      data-slot={Slots.Header}
      className={cls(className, classes.header)}
    >
      {children}
    </thead>
  );
};

const Header = componentWithForwardedRef(HeaderBase, "Table.Header");

export default Header;
