import { getWindow } from "@styleless-ui/react/utils";
import ValidityReason from "../ValidityReason";
import type { ConditionsMap } from "../utils";
import type { SyncedHeightState, TextAreaValidityState } from "./types";

export const validate = (
  valueState: string,
  conditions: Omit<ConditionsMap, "pattern" | "type">,
): TextAreaValidityState => {
  const { maxLength, minLength, required = false } = conditions;

  const input = document.createElement("input");

  let tooShort = false;
  let tooLong = false;

  input.type = "text";
  input.value = valueState;

  if (required) input.required = required;

  if (minLength) {
    tooShort = valueState.length < minLength;
  }

  if (maxLength) {
    tooLong = valueState.length > maxLength;
  }

  const isValid = input.checkValidity() && !tooShort && !tooLong;

  if (!isValid) {
    const { valueMissing } = input.validity;

    if (valueMissing) {
      return { valid: false, reason: ValidityReason.VALUE_MISSING };
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

const getNumericStyleValue = (
  computedStyle: CSSStyleDeclaration,
  property: keyof CSSStyleDeclaration,
  fallbackValue: number,
) => {
  const styleValue = computedStyle[property] as string | null | undefined;

  if (styleValue == null) return fallbackValue;

  return parseInt(styleValue, 10);
};

export const syncHeights = (
  inputElement: HTMLTextAreaElement,
  shadowElement: HTMLTextAreaElement,
  minRows: number,
  maxRows: number,
  prevState: SyncedHeightState | null,
): SyncedHeightState | null => {
  const win = getWindow(inputElement);
  const inputComputedStyle = win.getComputedStyle(inputElement);

  // If input's width is shrunk and it's not visible, don't sync height.
  if (inputComputedStyle.width === "0px") return null;

  shadowElement.style.width = inputComputedStyle.width;
  shadowElement.value = inputElement.value || inputElement.placeholder || " ";
  if (shadowElement.value.slice(-1) === "\n") {
    // Certain fonts which overflow the line height will cause the textarea
    // to report a different scrollHeight depending on whether the last line
    // is empty. Make it non-empty to avoid this issue.
    shadowElement.value += " ";
  }

  const boxSizing = inputComputedStyle.boxSizing;

  const padding =
    getNumericStyleValue(inputComputedStyle, "paddingBottom", 0) +
    getNumericStyleValue(inputComputedStyle, "paddingTop", 0);

  const border =
    getNumericStyleValue(inputComputedStyle, "borderBottomWidth", 0) +
    getNumericStyleValue(inputComputedStyle, "borderTopWidth", 0);

  // The height of the inner content
  const shadowInnerHeight = shadowElement.scrollHeight;

  // Measure height of a textarea with a single row
  shadowElement.value = " ";
  const singleRowHeight = shadowElement.scrollHeight;

  // The height of the outer content
  let shadowOuterHeight = shadowInnerHeight;

  shadowOuterHeight = Math.max(
    Number(minRows) * singleRowHeight,
    shadowOuterHeight,
  );

  shadowOuterHeight = Math.min(
    Number(maxRows) * singleRowHeight,
    shadowOuterHeight,
  );

  shadowOuterHeight = Math.max(shadowOuterHeight, singleRowHeight);

  // Take the box sizing into account for applying this value as a style.
  const outerHeight =
    shadowOuterHeight + (boxSizing === "border-box" ? padding + border : 0);

  const overflow = Math.abs(shadowOuterHeight - innerHeight) <= 1;

  if (
    (outerHeight > 0 &&
      Math.abs((prevState?.outerHeight ?? 0) - outerHeight) > 1) ||
    prevState?.overflow !== overflow
  ) {
    return { overflow, outerHeight };
  }

  return null;
};
