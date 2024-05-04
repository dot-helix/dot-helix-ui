import { Menu as StylelessMenu } from "@styleless-ui/react";
import { CheckIcon } from "../../internals";
import { combineClasses as cls, useDeterministicId } from "../../utils";
import classes from "../Menu.module.css";
import {
  CheckItemIndicator as CheckItemIndicatorSlot,
  ItemTitle as ItemTitleSlot,
} from "../slots";
import type { CheckItem } from "../types";

type Props = Omit<CheckItem, "type"> & {
  scopeId: string;
};

const Check = (props: Props) => {
  const {
    scopeId,
    title,
    value,
    checked,
    disabled,
    onCheckedChange,
    onSelect,
  } = props;

  const id = useDeterministicId(undefined, scopeId);
  const labelId = `${id}__label`;

  return (
    <StylelessMenu.CheckItem
      id={id}
      className={({ active, checked, disabled }) =>
        cls(classes.check, {
          [classes["check--active"]!]: active,
          [classes["check--checked"]!]: checked,
          [classes["check--disabled"]!]: disabled,
        })
      }
      aria-labelledby={labelId}
      value={value}
      checked={checked}
      disabled={disabled}
      onSelect={onSelect}
      onCheckedChange={onCheckedChange}
    >
      {({ checked }) => (
        <>
          <div
            aria-hidden="true"
            className={cls(classes["check-indicator"], {
              [classes["check-indicator--checked"]!]: checked,
            })}
            data-slot={CheckItemIndicatorSlot}
          >
            <CheckIcon />
          </div>
          <span
            id={labelId}
            className={classes["item-title"]}
            data-slot={ItemTitleSlot}
          >
            {title}
          </span>
        </>
      )}
    </StylelessMenu.CheckItem>
  );
};

export default Check;
