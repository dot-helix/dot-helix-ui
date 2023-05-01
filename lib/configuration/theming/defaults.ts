/* eslint-disable import/no-named-as-default-member */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getForegroundColor } from "../../utils";
import {
  createBrandingColorVariants,
  semanticForegrounds,
  generateSpacing,
  generateTypography,
  neutralColors,
  semanticColorVariants,
} from "./generate";
import palette from "./palette";
import { type PrimitiveTokens, type Theme } from "./themingClient";

export const defaultPrimitives: PrimitiveTokens = {
  primaryColor: palette.indigo,
  secondaryColor: palette.fuschsia,
  density: "normal",
  typographySize: "normal",
  colorScheme: "light",
  direction: "ltr",
  ltrFontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  rtlFontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  monospaceFontFamily: '"Courier New", Courier, monospace',
};

export const defaultTheme: Theme = {
  direction: defaultPrimitives.direction,
  typefaces: {
    ltr: defaultPrimitives.ltrFontFamily,
    rtl: defaultPrimitives.rtlFontFamily,
    monospace: defaultPrimitives.monospaceFontFamily,
  },
  typography: generateTypography({
    typographySize: defaultPrimitives.typographySize,
  }).typography!,
  spacing: generateSpacing({ density: defaultPrimitives.density }).spacing!,
  zIndexes: {
    "0": 1000,
    "1": 1010,
    "2": 1020,
    "3": 1030,
    "4": 1040,
    "5": 1050,
  },
  borderRadius: {
    full: 9999,
    xs: 2,
    sm: 4,
    md: 6,
    lg: 8,
    xlg: 12,
  },
  breakpoints: {
    xxs: 320,
    xs: 520,
    sm: 768,
    md: 960,
    lg: 1024,
    xlg: 1366,
  },
  shadows: {
    xs: "0 1px 2px 0 rgb(0 0 0 / 0.05);",
    sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);",
    xlg: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);",
  },
  colors: {
    palette,
    ...semanticColorVariants[defaultPrimitives.colorScheme],
    primary: createBrandingColorVariants(
      defaultPrimitives.primaryColor,
      defaultPrimitives.colorScheme,
    ),
    secondary: createBrandingColorVariants(
      defaultPrimitives.secondaryColor,
      defaultPrimitives.colorScheme,
    ),
    scheme: defaultPrimitives.colorScheme,
    foregrounds: {
      ...semanticForegrounds,
      onPrimary: getForegroundColor(defaultPrimitives.primaryColor[500]),
      onSecondary: getForegroundColor(defaultPrimitives.secondaryColor[500]),
    },
    neutral: neutralColors[defaultPrimitives.colorScheme],
  },
};
