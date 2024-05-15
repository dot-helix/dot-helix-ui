import ValidityReason from "../ValidityReason";
import type { ConditionsMap } from "../utils";
import type { TextFieldValidityState } from "./types";

export const validate = (
  valueState: string,
  conditions: ConditionsMap,
): TextFieldValidityState => {
  const {
    maxLength,
    minLength,
    pattern,
    required = false,
    type = "text",
  } = conditions;

  const input = document.createElement("input");

  let tooShort = false;
  let tooLong = false;

  input.type = type;
  input.value = valueState;

  if (required) input.required = required;
  if (pattern) input.pattern = pattern;

  if (minLength) {
    tooShort = valueState.length < minLength;
  }

  if (maxLength) {
    tooLong = valueState.length > maxLength;
  }

  const isValid = input.checkValidity() && !tooShort && !tooLong;

  if (!isValid) {
    const { valueMissing, patternMismatch, typeMismatch } = input.validity;

    if (valueMissing) {
      return { valid: false, reason: ValidityReason.VALUE_MISSING };
    }

    if (typeMismatch) {
      return { valid: false, reason: ValidityReason.TYPE_MISMATCH };
    }

    if (patternMismatch) {
      return { valid: false, reason: ValidityReason.PATTERN_MISMATCH };
    }

    if (tooShort) {
      return { valid: false, reason: ValidityReason.VALUE_TOO_SHORT };
    }

    if (tooLong) {
      return { valid: false, reason: ValidityReason.VALUE_TOO_LONG };
    }
  }

  return { valid: true };
};
