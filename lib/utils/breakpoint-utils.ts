import { defaultThemeTokens } from "../systems";
import { breakpointKeys } from "../systems/theming/constants";

const { breakpoints } = defaultThemeTokens;

const MEDIAQUERY_UNIT = "px";
const MEDIAQUERY_STEP = 5;

type Options = {
  excludeAtMedia?: boolean;
};

export const up = (
  key: keyof typeof breakpoints | number,
  options?: Options,
) => {
  const { excludeAtMedia = false } = options ?? {};
  const value = typeof key === "number" ? key : breakpoints[key];

  let atMedia: string = "";

  if (!excludeAtMedia) atMedia = "@media ";

  return `${atMedia}(min-width:${value}${MEDIAQUERY_UNIT})`;
};

export const down = (
  key: keyof typeof breakpoints | number,
  options?: Options,
) => {
  const { excludeAtMedia = false } = options ?? {};
  const value = typeof key === "number" ? key : breakpoints[key];

  if (
    typeof key !== "number" &&
    breakpointKeys.indexOf(key) === breakpointKeys.length - 1
  ) {
    return up("xxs", options);
  }

  let atMedia: string = "";

  if (!excludeAtMedia) atMedia = "@media ";

  return `${atMedia}(max-width:${value - MEDIAQUERY_STEP / 100}${MEDIAQUERY_UNIT})`;
};

export const between = (
  startKey: keyof typeof breakpoints | number,
  endKey: keyof typeof breakpoints | number,
  options?: Options,
) => {
  const { excludeAtMedia = false } = options ?? {};

  const endIndex =
    typeof endKey !== "number" ? breakpointKeys.indexOf(endKey) : -1;

  if (endIndex === breakpointKeys.length - 1) return up(startKey, options);

  const minVal =
    typeof startKey === "number" ? startKey : breakpoints[startKey];

  let maxVal: number;

  if (endIndex === -1) maxVal = endKey as number;
  else maxVal = breakpoints[breakpointKeys[endIndex]!];

  let atMedia: string = "";

  if (!excludeAtMedia) atMedia = "@media ";

  return (
    `${atMedia}(min-width:${minVal}${MEDIAQUERY_UNIT}) and ` +
    `(max-width:${maxVal - MEDIAQUERY_STEP / 100}${MEDIAQUERY_UNIT})`
  );
};

export const getWidth = (key: keyof typeof breakpoints) => breakpoints[key];
