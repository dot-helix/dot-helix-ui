import type ValidityReason from "../ValidityReason";

export type CheckGroupValidityState =
  | { valid: true }
  | { valid: false; reason: ValidityReason.VALUE_MISSING };

export type CheckGroupInstace = {
  getValue: () => string[];
  checkValidity: () => CheckGroupValidityState;
};
