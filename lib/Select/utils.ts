import ValidityReason from "../ValidityReason";
import type { ConditionsMap } from "../utils";
import type { SelectItem, SelectValidityState } from "./types";

export const validate = (
  valueState: string | string[],
  conditions: Pick<ConditionsMap, "required">,
): SelectValidityState => {
  const { required = false } = conditions;

  if (!required) return { valid: true };
  if (valueState.length !== 0) return { valid: true };

  return {
    valid: false,
    reason: ValidityReason.VALUE_MISSING,
  };
};

export const makeGetItemFromValue =
  (items: SelectItem[]) => (value: string) => {
    for (const item of items) {
      if (item.type === "option") {
        if (item.value !== value) continue;

        return item;
      } else {
        for (const innerItem of item.items) {
          if (innerItem.value !== value) continue;

          return innerItem;
        }
      }
    }

    return undefined;
  };
