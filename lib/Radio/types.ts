import type ValidityReason from "../ValidityReason";

export type RadioValidityState =
  | { valid: true }
  | { valid: false; reason: ValidityReason.VALUE_MISSING };

export type RadioInstance = {
  isChecked: () => boolean;
  checkValidity: () => RadioValidityState;
};
