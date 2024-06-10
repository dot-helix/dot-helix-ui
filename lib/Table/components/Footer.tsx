import type { MergeElementProps } from "@styleless-ui/react";
import * as React from "react";
import type { CommonProps } from "../../types";
import { combineClasses as cls, componentWithForwardedRef } from "../../utils";
import classes from "../Table.module.css";
import * as Slots from "../slots";

type OwnProps = Pick<CommonProps, "className" | "children">;

export type Props = MergeElementProps<"tfoot", OwnProps>;

const FooterBase = (props: Props, ref: React.Ref<HTMLTableSectionElement>) => {
  const { className, children, ...otherProps } = props;

  return (
    <tfoot
      {...otherProps}
      ref={ref}
      data-slot={Slots.Footer}
      className={cls(className, classes.footer)}
    >
      {children}
    </tfoot>
  );
};

const Footer = componentWithForwardedRef(FooterBase, "Table.Footer");

export default Footer;
