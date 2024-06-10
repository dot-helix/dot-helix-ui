import type { MergeElementProps } from "@styleless-ui/react";
import * as React from "react";
import { combineClasses as cls, componentWithForwardedRef } from "../../utils";
import classes from "../Table.module.css";
import * as Slots from "../slots";
import { type Props as CellProps } from "./Cell";

type OwnProps = CellProps & {
  /**
   * Defines the cells that this heading element relates to.
   */
  scope: "row" | "col" | "rowgroup" | "colgroup" | "none";
};

export type Props = MergeElementProps<"th", OwnProps>;

const HeadBase = (props: Props, ref: React.Ref<HTMLTableCellElement>) => {
  const {
    className,
    children,
    scope,
    verticalAlign = "inherit",
    textAlign = "start",
    ...otherProps
  } = props;

  return (
    <th
      {...otherProps}
      scope={scope === "none" ? undefined : scope}
      ref={ref}
      data-slot={Slots.Head}
      data-valign={verticalAlign}
      data-talign={textAlign}
      className={cls(
        className,
        classes.head,
        classes[`head--v-align-${verticalAlign}`],
        classes[`head--t-align-${textAlign}`],
      )}
    >
      {children}
    </th>
  );
};

const Head = componentWithForwardedRef(HeadBase, "Table.Head");

export default Head;
