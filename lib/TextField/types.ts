import type ValidityReason from "../ValidityReason";

export type TextFieldValidityState =
  | { valid: true }
  | { valid: false; reason: ValidityReason.VALUE_MISSING }
  | { valid: false; reason: ValidityReason.VALUE_TOO_SHORT }
  | { valid: false; reason: ValidityReason.VALUE_TOO_LONG }
  | { valid: false; reason: ValidityReason.PATTERN_MISMATCH }
  | { valid: false; reason: ValidityReason.TYPE_MISMATCH };

export type TextFieldInstance = {
  getValue: () => string;
  checkValidity: () => TextFieldValidityState;
};
