import type ValidityReason from "../ValidityReason";

export type CheckboxValidityState =
  | { valid: true }
  | { valid: false; reason: ValidityReason.VALUE_MISSING };

export type CheckboxInstance = {
  isChecked: () => boolean;
  checkValidity: () => CheckboxValidityState;
};
