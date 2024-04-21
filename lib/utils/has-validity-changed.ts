import type { ValidityState } from "../types";

const hasValidityChanged = (
  prevValidity: ValidityState,
  currentValidity: ValidityState,
) => {
  if (prevValidity.valid !== currentValidity.valid) return true;

  if (!prevValidity.valid && !currentValidity.valid) {
    return prevValidity.reason !== currentValidity.reason;
  }

  return false;
};

export default hasValidityChanged;
