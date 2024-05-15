import type ValidityReason from "../ValidityReason";

export type TextAreaValidityState =
  | { valid: true }
  | { valid: false; reason: ValidityReason.VALUE_MISSING }
  | { valid: false; reason: ValidityReason.VALUE_TOO_SHORT }
  | { valid: false; reason: ValidityReason.VALUE_TOO_LONG };

export type TextAreaInstance = {
  getValue: () => string;
  checkValidity: () => TextAreaValidityState;
};

export type SyncedHeightState = {
  overflow: boolean;
  outerHeight: number;
};
