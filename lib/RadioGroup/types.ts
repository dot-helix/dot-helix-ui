import type ValidityReason from "../ValidityReason";

export type RadioGroupValidityState =
  | { valid: true }
  | { valid: false; reason: ValidityReason.VALUE_MISSING };

export type RadioGroupInstace = {
  getValue: () => string;
  checkValidity: () => RadioGroupValidityState;
};
