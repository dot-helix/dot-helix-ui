import createTokens from "./create-tokens";
import { fuschsia } from "./palette";
import type { PrimitiveTokens } from "./types";

export const defaultPrimitives: PrimitiveTokens = {
  primaryColor: "#6366f1",
  secondaryColor: fuschsia,
  density: "normal",
  typographySize: "normal",
  ltrFontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  rtlFontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  monospaceFontFamily: '"Courier New", Courier, monospace',
};

export const defaultThemeTokens = createTokens(defaultPrimitives, "dark");
