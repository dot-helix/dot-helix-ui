import { defaultThemeTokens } from "../systems";
import { breakpointKeys } from "../systems/theming/constants";

const { breakpoints } = defaultThemeTokens;

const MEDIAQUERY_UNIT = "px";
const MEDIAQUERY_STEP = 5;

export const up = (key: keyof typeof breakpoints | number) => {
  const value = typeof key === "number" ? key : breakpoints[key];

  return `@media (min-width:${value}${MEDIAQUERY_UNIT})`;
};

export const down = (key: keyof typeof breakpoints | number) => {
  const value = typeof key === "number" ? key : breakpoints[key];

  if (
    typeof key !== "number" &&
    breakpointKeys.indexOf(key) === breakpointKeys.length - 1
  ) {
    return up("xxs");
  }

  return `@media (max-width:${value - MEDIAQUERY_STEP / 100}${MEDIAQUERY_UNIT})`;
};

export const between = (
  startKey: keyof typeof breakpoints | number,
  endKey: keyof typeof breakpoints | number,
) => {
  const endIndex =
    typeof endKey !== "number" ? breakpointKeys.indexOf(endKey) : -1;

  if (endIndex === breakpointKeys.length - 1) return up(startKey);

  const minVal =
    typeof startKey === "number" ? startKey : breakpoints[startKey];

  let maxVal: number;

  if (endIndex === -1) maxVal = endKey as number;
  else maxVal = breakpoints[breakpointKeys[endIndex]!];

  return (
    `@media (min-width:${minVal}${MEDIAQUERY_UNIT}) and ` +
    `(max-width:${maxVal - MEDIAQUERY_STEP / 100}${MEDIAQUERY_UNIT})`
  );
};

export const getWidth = (key: keyof typeof breakpoints) => breakpoints[key];
