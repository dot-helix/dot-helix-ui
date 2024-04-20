import type ValidityReason from "../ValidityReason";

export type CheckboxValidityState =
  | { valid: true }
  | { valid: false; reason: ValidityReason.VALUE_MISSING };

export type CheckboxInstance = {
  getCheckboxNode: () => HTMLButtonElement | null;
  isChecked: () => boolean;
  checkValidity: () => CheckboxValidityState;
};
