import type { MergeElementProps } from "@styleless-ui/react";
import * as React from "react";
import type { CommonProps } from "../types";
import { combineClasses as cls, componentWithForwardedRef } from "../utils";
import classes from "./Table.module.css";
import * as Slots from "./slots";

type OwnProps = Pick<CommonProps, "className" | "children"> & {
  /**
   * If `true`, the table will appear denser.
   *
   * @default false
   */
  dense?: boolean;
  /**
   * The caption of the table.
   */
  caption?: string;
};

export type Props = MergeElementProps<"table", OwnProps>;

const TableBase = (props: Props, ref: React.Ref<HTMLTableElement>) => {
  const { className, children, caption, dense = false, ...otherProps } = props;

  const renderCaption = () => {
    if (!caption) return null;

    return (
      <caption
        data-slot={Slots.Caption}
        className={classes.caption}
      >
        {caption}
      </caption>
    );
  };

  return (
    <table
      {...otherProps}
      ref={ref}
      data-slot={Slots.Root}
      data-dense={dense}
      className={cls(className, classes.root, {
        [classes["root--dense"]!]: dense,
      })}
    >
      {renderCaption()}
      {children}
    </table>
  );
};

const Table = componentWithForwardedRef(TableBase, "Table");

export default Table;
