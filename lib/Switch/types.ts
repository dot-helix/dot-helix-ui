import type ValidityReason from "../ValidityReason";

export type SwitchValidityState =
  | { valid: true }
  | { valid: false; reason: ValidityReason.VALUE_MISSING };

export type SwitchInstance = {
  isChecked: () => boolean;
  checkValidity: () => SwitchValidityState;
};
