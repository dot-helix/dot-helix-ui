import ValidityReason from "../ValidityReason";
import type { CheckGroupValidityState } from "./types";

export const validate = (
  valueState: string[],
  conditions: { required: boolean },
): CheckGroupValidityState => {
  const { required } = conditions;

  if (!required) return { valid: true };
  if (valueState.length > 0) return { valid: true };

  return {
    valid: false,
    reason: ValidityReason.VALUE_MISSING,
  };
};
