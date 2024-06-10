import type { MergeElementProps } from "@styleless-ui/react";
import * as React from "react";
import type { CommonProps } from "../../types";
import { combineClasses as cls, componentWithForwardedRef } from "../../utils";
import classes from "../Table.module.css";
import * as Slots from "../slots";

type OwnProps = Pick<CommonProps, "className" | "children"> & {
  /**
   * The `vertical-align` property of the table cell.
   *
   * @default "inherit"
   */
  verticalAlign?: "inherit" | "top" | "middle" | "bottom";
  /**
   * Set the `text-align` css property of the table cell.
   *
   * @default "start"
   */
  textAlign?: "center" | "justify" | "left" | "right" | "start" | "end";
};

export type Props = MergeElementProps<"td", OwnProps>;

const CellBase = (props: Props, ref: React.Ref<HTMLTableCellElement>) => {
  const {
    className,
    children,
    verticalAlign = "inherit",
    textAlign = "start",
    ...otherProps
  } = props;

  return (
    <td
      {...otherProps}
      ref={ref}
      data-slot={Slots.Cell}
      data-valign={verticalAlign}
      data-talign={textAlign}
      className={cls(
        className,
        classes.cell,
        classes[`cell--v-align-${verticalAlign}`],
        classes[`cell--t-align-${textAlign}`],
      )}
    >
      {children}
    </td>
  );
};

const Cell = componentWithForwardedRef(CellBase, "Table.Cell");

export default Cell;
