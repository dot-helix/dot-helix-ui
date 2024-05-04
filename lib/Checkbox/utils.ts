import ValidityReason from "../ValidityReason";
import type { CheckboxValidityState } from "./types";

export const validate = (
  checkedState: boolean,
  conditions: { required: boolean },
): CheckboxValidityState => {
  const { required } = conditions;

  if (!required) return { valid: true };
  if (checkedState) return { valid: true };

  return {
    valid: false,
    reason: ValidityReason.VALUE_MISSING,
  };
};
