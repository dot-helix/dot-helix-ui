import * as ColorUtils from "../../utils/color-utils";
import {
  neutralColorVariantsMap,
  semanticColorVariantsMap,
  semanticForegrounds,
} from "./constants";
import palette from "./palette";
import type {
  CommonTokens,
  PrimitiveTokens,
  ThemeTokens,
  VariantTokensMap,
  Variants,
} from "./types";

const { adjustAlpha, generateColorSet, getForegroundColor, isValidHexColor } =
  ColorUtils;

const typeScaling = {
  normal: {
    h1: [80, 88 / 80],
    h2: [64, 72 / 64],
    h3: [48, 56 / 48],
    h4: [36, 44 / 36],
    h5: [24, 32 / 24],
    h6: [20, 28 / 20],
    subheading1: [16, 26 / 16],
    subheading2: [14, 22 / 14],
    body1: [16, 24 / 16],
    body2: [14, 20 / 14],
    caption: [12, 20 / 12],
  },
  small: {
    h1: [64, 72 / 64],
    h2: [48, 56 / 48],
    h3: [36, 44 / 36],
    h4: [24, 32 / 24],
    h5: [20, 28 / 20],
    h6: [18, 26 / 18],
    subheading1: [14, 22 / 14],
    subheading2: [12, 18 / 12],
    body1: [14, 20 / 14],
    body2: [12, 16 / 12],
    caption: [10, 18 / 10],
  },
  large: {
    h1: [86, 104 / 86],
    h2: [80, 88 / 80],
    h3: [64, 72 / 64],
    h4: [48, 56 / 48],
    h5: [36, 44 / 36],
    h6: [24, 32 / 24],
    subheading1: [18, 30 / 18],
    subheading2: [16, 26 / 16],
    body1: [18, 26 / 18],
    body2: [16, 22 / 16],
    caption: [14, 22 / 14],
  },
} as const;

export const createCommonTokens = (
  nonVariantPrimitives: Omit<
    PrimitiveTokens,
    "primaryColor" | "secondaryColor"
  >,
): CommonTokens => {
  const {
    density,
    ltrFontFamily,
    monospaceFontFamily,
    rtlFontFamily,
    typographySize,
  } = nonVariantPrimitives;

  const baseSpacer = density === "compact" ? 2 : density === "loose" ? 6 : 4;

  const baseFontSize =
    typographySize === "small" ? 14 : typographySize === "large" ? 18 : 16;

  const scaling = typeScaling[typographySize];

  const commonTokens: CommonTokens = {
    palette,
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
      xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xlg: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    },
    spacing: {
      origin: baseSpacer,
      xxs: baseSpacer / 2,
      xs: baseSpacer,
      sm: baseSpacer * 1.5,
      md: baseSpacer * 2,
      lg: baseSpacer * 3,
      xlg: baseSpacer * 4,
      0: 0,
      "0.5": baseSpacer / 2,
      "1": baseSpacer,
      "1.5": baseSpacer * 1.5,
      "2": baseSpacer * 2,
      "2.5": baseSpacer * 2.5,
      "3": baseSpacer * 3,
      "3.5": baseSpacer * 3.5,
      "4": baseSpacer * 4,
      "5": baseSpacer * 5,
      "6": baseSpacer * 6,
      "7": baseSpacer * 7,
      "8": baseSpacer * 8,
      "9": baseSpacer * 9,
      "10": baseSpacer * 10,
      "11": baseSpacer * 11,
      "12": baseSpacer * 12,
      "14": baseSpacer * 14,
      "16": baseSpacer * 16,
      "18": baseSpacer * 18,
      "20": baseSpacer * 20,
      "24": baseSpacer * 24,
      "28": baseSpacer * 28,
      "32": baseSpacer * 32,
      "36": baseSpacer * 36,
      "40": baseSpacer * 40,
      "44": baseSpacer * 44,
      "48": baseSpacer * 48,
      "52": baseSpacer * 52,
      "56": baseSpacer * 56,
      "60": baseSpacer * 60,
      "64": baseSpacer * 64,
      "72": baseSpacer * 72,
      "80": baseSpacer * 80,
      "96": baseSpacer * 96,
      "112": baseSpacer * 112,
      "128": baseSpacer * 128,
    },
    typography: {
      h1: { size: scaling.h1[0], leading: scaling.h1[1], weight: 300 },
      h2: { size: scaling.h2[0], leading: scaling.h2[1], weight: 300 },
      h3: { size: scaling.h3[0], leading: scaling.h3[1], weight: 400 },
      h4: { size: scaling.h4[0], leading: scaling.h4[1], weight: 400 },
      h5: { size: scaling.h5[0], leading: scaling.h5[1], weight: 400 },
      h6: { size: scaling.h6[0], leading: scaling.h6[1], weight: 500 },
      subheading1: {
        size: scaling.subheading1[0],
        leading: scaling.subheading1[1],
        weight: 400,
      },
      subheading2: {
        size: scaling.subheading2[0],
        leading: scaling.subheading2[1],
        weight: 500,
      },
      body1: {
        size: scaling.body1[0],
        leading: scaling.body1[1],
        weight: 400,
      },
      body2: {
        size: scaling.body2[0],
        leading: scaling.body2[1],
        weight: 400,
      },
      caption: {
        size: scaling.caption[0],
        leading: scaling.caption[1],
        weight: 400,
      },
      typefaces: {
        ltr: ltrFontFamily,
        rtl: rtlFontFamily,
        monospace: monospaceFontFamily,
      },
      baseSize: baseFontSize,
    },
    zIndexes: {
      "0": 1000,
      "1": 1010,
      "2": 1020,
      "3": 1030,
      "4": 1040,
      "5": 1050,
    },
  };

  return commonTokens;
};

export const createVariantTokensMap = (
  colorPrimitives: Pick<PrimitiveTokens, "primaryColor" | "secondaryColor">,
): VariantTokensMap => {
  const { primaryColor, secondaryColor } = colorPrimitives;

  if (typeof primaryColor === "string" && !isValidHexColor(primaryColor)) {
    throw new Error(
      `Invalid hex color provided. (\`primaryColor="${primaryColor}"\`)`,
    );
  }

  if (typeof secondaryColor === "string" && !isValidHexColor(secondaryColor)) {
    throw new Error(
      `Invalid hex color provided. (\`secondaryColor="${secondaryColor}"\`)`,
    );
  }

  const createBrandingColorGroup = (
    color: PrimitiveTokens["primaryColor"],
    colorScheme: Variants,
  ) => {
    const colorSet =
      typeof color === "object" ? color : generateColorSet(color);

    const origin = colorSet[colorScheme === "dark" ? 600 : 500];
    const hover = colorSet[colorScheme === "dark" ? 500 : 600];
    const active = colorSet[colorScheme === "dark" ? 400 : 700];
    const disabled = adjustAlpha(origin, 0.32);

    return {
      origin,
      hover,
      active,
      disabled,
      surface: {
        base: adjustAlpha(origin, 0.24),
        secondary: adjustAlpha(origin, 0.16),
        tertiary: adjustAlpha(origin, 0.08),
        quaternary: adjustAlpha(origin, 0.04),
      },
    };
  };

  const primaryLight = createBrandingColorGroup(primaryColor, "light");
  const primaryDark = createBrandingColorGroup(primaryColor, "dark");

  const secondaryLight = createBrandingColorGroup(secondaryColor, "light");
  const secondaryDark = createBrandingColorGroup(secondaryColor, "dark");

  const variantTokensMap: VariantTokensMap = {
    dark: {
      colors: {
        ...semanticColorVariantsMap["dark"],
        primary: primaryDark,
        secondary: secondaryDark,
        neutral: neutralColorVariantsMap["dark"],
        foregrounds: {
          ...semanticForegrounds,
          onPrimary: getForegroundColor(primaryDark.origin),
          onSecondary: getForegroundColor(secondaryDark.origin),
        },
      },
    },
    light: {
      colors: {
        ...semanticColorVariantsMap["light"],
        primary: primaryLight,
        secondary: secondaryLight,
        neutral: neutralColorVariantsMap["light"],
        foregrounds: {
          ...semanticForegrounds,
          onPrimary: getForegroundColor(primaryLight.origin),
          onSecondary: getForegroundColor(secondaryLight.origin),
        },
      },
    },
  };

  return variantTokensMap;
};

const createTokens = (primitives: PrimitiveTokens, variant: Variants) => {
  const { primaryColor, secondaryColor, ...otherPrimitives } = primitives;

  const commonTokens = createCommonTokens(otherPrimitives);
  const variantTokensMap = createVariantTokensMap({
    primaryColor,
    secondaryColor,
  });

  const variantTokens = variantTokensMap[variant];

  const tokens: ThemeTokens = { ...variantTokens, ...commonTokens };

  return tokens;
};

export default createTokens;
