import { Menu as StylelessMenu } from "@styleless-ui/react";
import { combineClasses as cls, useDeterministicId } from "../../../../utils";
import classes from "../../../Menu.module.css";
import {
  ItemTitle as ItemTitleSlot,
  RadioItemIndicator as RadioItemIndicatorSlot,
} from "../../../slots";
import type { RadioGroupItem } from "../../../types";

type Props = RadioGroupItem["options"][0] & {
  scopeId: string;
};

const Radio = (props: Props) => {
  const { scopeId, title, value, disabled, onSelect } = props;

  const id = useDeterministicId(undefined, scopeId);
  const labelId = `${id}__label`;

  return (
    <StylelessMenu.RadioItem
      id={id}
      className={({ active, checked, disabled }) =>
        cls(classes.radio, {
          [classes["radio--active"]!]: active,
          [classes["radio--checked"]!]: checked,
          [classes["radio--disabled"]!]: disabled,
        })
      }
      aria-labelledby={labelId}
      value={value}
      onSelect={onSelect}
      disabled={disabled}
    >
      {({ checked }) => (
        <>
          <div
            aria-hidden="true"
            className={cls(classes["check-indicator"], {
              [classes["check-indicator--checked"]!]: checked,
            })}
            data-slot={RadioItemIndicatorSlot}
          ></div>
          <span
            id={labelId}
            className={classes["item-title"]}
            data-slot={ItemTitleSlot}
          >
            {title}
          </span>
        </>
      )}
    </StylelessMenu.RadioItem>
  );
};

export default Radio;
