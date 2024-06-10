import type { MergeElementProps } from "@styleless-ui/react";
import * as React from "react";
import { Logger } from "../../internals";
import type { CommonProps } from "../../types";
import { combineClasses as cls, componentWithForwardedRef } from "../../utils";
import classes from "../Table.module.css";
import * as Slots from "../slots";

type OwnProps = Pick<CommonProps, "className" | "children"> & {
  /**
   * The `vertical-align` property of the table row.
   *
   * @default "middle"
   */
  verticalAlign?: "top" | "middle" | "bottom";
  /**
   * Determines whether the table row is selectable or not.
   *
   * @default false
   */
  selectable?: boolean;
  /**
   * If `true`, the table row will display as selected.
   *
   * It only affects the row if `selectable={true}`.
   *
   * @default false
   */
  selected?: boolean;
  /**
   * If `true`, the table row will have the hover styles upon pointer enter.
   *
   * @default false
   */
  hoverable?: boolean;
};

export type Props = MergeElementProps<"tr", OwnProps>;

const RowBase = (props: Props, ref: React.Ref<HTMLTableRowElement>) => {
  const {
    className,
    children,
    hoverable = false,
    selected = false,
    selectable = false,
    verticalAlign = "middle",
    ...otherProps
  } = props;

  if (!selectable && selected) {
    Logger.devOnly.log(
      [
        "You are trying to select a non-selectable row.",
        "To fix it set `selectable` prop to `true`.",
      ].join("\n"),
      "warn",
      "Table.Row",
    );
  }

  const selectabilityProps: Record<string, unknown> = {};

  if (selectable) {
    selectabilityProps.role = "checkbox";
    selectabilityProps["aria-checked"] = selected;
  }

  return (
    <tr
      {...otherProps}
      {...selectabilityProps}
      ref={ref}
      data-slot={Slots.Row}
      data-hoverable={hoverable ? "" : undefined}
      data-selected={selectable && selected ? "" : undefined}
      data-selectable={selectable ? "" : undefined}
      data-valign={verticalAlign}
      className={cls(
        className,
        classes.row,
        classes[`row--v-align-${verticalAlign}`],
        {
          [classes["row--hoverable"]!]: hoverable,
          [classes["row--selected"]!]: selectable && selected,
          [classes["row--selectable"]!]: selectable,
        },
      )}
    >
      {children}
    </tr>
  );
};

const Row = componentWithForwardedRef(RowBase, "Table.Row");

export default Row;
