import { Select } from "@styleless-ui/react";
import { CheckIcon } from "../../internals";
import { combineClasses as cls } from "../../utils";
import classes from "../Select.module.css";
import * as Slots from "../slots";
import type { OptionItem } from "../types";

type Props = Omit<OptionItem, "type">;

const Item = (props: Props) => {
  const { title, value, disabled } = props;

  return (
    <Select.Option
      valueLabel={title}
      disabled={disabled}
      value={value}
      className={({ active, disabled, hidden, selected }) =>
        cls(classes.item, {
          [classes["item--disabled"]!]: disabled,
          [classes["item--active"]!]: active,
          [classes["item--hidden"]!]: hidden,
          [classes["item--selected"]!]: selected,
        })
      }
    >
      <span
        className={classes["item-title"]}
        data-slot={Slots.ItemTitle}
      >
        {title}
      </span>
      <div
        aria-hidden="true"
        className={cls(classes["item-select-indicator"])}
        data-slot={Slots.ItemSelectIndicator}
      >
        <CheckIcon />
      </div>
    </Select.Option>
  );
};

export default Item;
