/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  adjustAlpha,
  generateColorSet,
  getForegroundColor,
  isValidHexColor,
} from "../../utils";
import { green, rose, sky, orange, zinc } from "./palette";
import { type PrimitiveTokens, type Theme } from "./themingClient";

type DeepPartial<T> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [P in keyof T]?: T[P] extends Record<keyof any, any>
    ? DeepPartial<T[P]>
    : T[P];
};

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
};

const successColor = green;
const errorColor = rose;
const warningColor = orange;
const infoColor = sky;

export const neutralColors: Record<
  Theme["colors"]["scheme"],
  Theme["colors"]["neutral"]
> = {
  dark: {
    origin: zinc[400],
    hover: zinc[300],
    active: zinc[100],
    disabled: zinc[800],
    background: {
      base: "#000000",
      elevated: "#1f1f1f",
      layout: "#141414",
      overlay: "rgba(0, 0, 0, 0.45)",
      spotlight: "#424242",
    },
    border: {
      normal: "#424242",
      secondary: "#303030",
    },
    text: {
      normal: "#ffffff",
      inverted: "#000000",
      secondary: "#e0e0e0",
      tertiary: "#a6a6a6",
      quaternary: "#737373",
      disabled: "#404040",
    },
    surface: {
      base: "rgba(255, 255, 255, 0.24)",
      secondary: "rgba(255, 255, 255, 0.16)",
      tertiary: "rgba(255, 255, 255, 0.08)",
      quaternary: "rgba(255, 255, 255, 0.04)",
    },
  },
  light: {
    origin: zinc[500],
    hover: zinc[600],
    active: zinc[700],
    disabled: zinc[200],
    background: {
      base: "#ffffff",
      elevated: "#ffffff",
      layout: "#f5f5f5",
      overlay: "rgba(0, 0, 0, 0.45)",
      spotlight: "#252525",
    },
    border: {
      normal: "#d9d9d9",
      secondary: "#f0f0f0",
    },
    text: {
      normal: "#000000",
      inverted: "#ffffff",
      secondary: "#1f1f1f",
      tertiary: "#595959",
      quaternary: "#8c8c8c",
      disabled: "#bfbfbf",
    },
    surface: {
      base: "rgba(0, 0, 0, 0.16)",
      secondary: "rgba(0, 0, 0, 0.08)",
      tertiary: "rgba(0, 0, 0, 0.04)",
      quaternary: "rgba(0, 0, 0, 0.02)",
    },
  },
};

export const semanticForegrounds: Pick<
  Theme["colors"]["foregrounds"],
  "onSuccess" | "onError" | "onWarning" | "onInfo"
> = {
  onSuccess: getForegroundColor(successColor[500]),
  onError: getForegroundColor(errorColor[500]),
  onWarning: getForegroundColor(warningColor[500]),
  onInfo: getForegroundColor(infoColor[500]),
};

export const semanticColorVariants: Record<
  Theme["colors"]["scheme"],
  Pick<Theme["colors"], "success" | "error" | "warning" | "info">
> = {
  dark: {
    success: {
      origin: successColor[600],
      hover: successColor[500],
      active: successColor[400],
      disabled: adjustAlpha(successColor[600], 0.32),
      surface: {
        base: adjustAlpha(successColor[600], 0.24),
        secondary: adjustAlpha(successColor[600], 0.16),
        tertiary: adjustAlpha(successColor[600], 0.08),
        quaternary: adjustAlpha(successColor[600], 0.04),
      },
    },
    error: {
      origin: errorColor[600],
      hover: errorColor[500],
      active: errorColor[400],
      disabled: adjustAlpha(errorColor[600], 0.32),
      surface: {
        base: adjustAlpha(errorColor[600], 0.24),
        secondary: adjustAlpha(errorColor[600], 0.16),
        tertiary: adjustAlpha(errorColor[600], 0.08),
        quaternary: adjustAlpha(errorColor[600], 0.04),
      },
    },
    warning: {
      origin: warningColor[600],
      hover: warningColor[500],
      active: warningColor[400],
      disabled: adjustAlpha(warningColor[600], 0.32),
      surface: {
        base: adjustAlpha(warningColor[600], 0.24),
        secondary: adjustAlpha(warningColor[600], 0.16),
        tertiary: adjustAlpha(warningColor[600], 0.08),
        quaternary: adjustAlpha(warningColor[600], 0.04),
      },
    },
    info: {
      origin: infoColor[600],
      hover: infoColor[500],
      active: infoColor[400],
      disabled: adjustAlpha(infoColor[600], 0.32),
      surface: {
        base: adjustAlpha(infoColor[600], 0.24),
        secondary: adjustAlpha(infoColor[600], 0.16),
        tertiary: adjustAlpha(infoColor[600], 0.08),
        quaternary: adjustAlpha(infoColor[600], 0.04),
      },
    },
  },
  light: {
    success: {
      origin: successColor[500],
      hover: successColor[600],
      active: successColor[700],
      disabled: adjustAlpha(successColor[500], 0.32),
      surface: {
        base: adjustAlpha(successColor[500], 0.24),
        secondary: adjustAlpha(successColor[500], 0.16),
        tertiary: adjustAlpha(successColor[500], 0.08),
        quaternary: adjustAlpha(successColor[500], 0.04),
      },
    },
    error: {
      origin: errorColor[500],
      hover: errorColor[600],
      active: errorColor[700],
      disabled: adjustAlpha(errorColor[500], 0.32),
      surface: {
        base: adjustAlpha(errorColor[500], 0.24),
        secondary: adjustAlpha(errorColor[500], 0.16),
        tertiary: adjustAlpha(errorColor[500], 0.08),
        quaternary: adjustAlpha(errorColor[500], 0.04),
      },
    },
    warning: {
      origin: warningColor[400],
      hover: warningColor[500],
      active: warningColor[600],
      disabled: adjustAlpha(warningColor[500], 0.32),
      surface: {
        base: adjustAlpha(warningColor[500], 0.24),
        secondary: adjustAlpha(warningColor[500], 0.16),
        tertiary: adjustAlpha(warningColor[500], 0.08),
        quaternary: adjustAlpha(warningColor[500], 0.04),
      },
    },
    info: {
      origin: infoColor[500],
      hover: infoColor[600],
      active: infoColor[700],
      disabled: adjustAlpha(infoColor[500], 0.32),
      surface: {
        base: adjustAlpha(infoColor[500], 0.24),
        secondary: adjustAlpha(infoColor[500], 0.16),
        tertiary: adjustAlpha(infoColor[500], 0.08),
        quaternary: adjustAlpha(infoColor[500], 0.04),
      },
    },
  },
};

export const createBrandingColorVariants = (
  color: PrimitiveTokens["primaryColor"],
  scheme: PrimitiveTokens["colorScheme"],
): Theme["colors"]["primary"] => {
  const colorSet = typeof color === "object" ? color : generateColorSet(color);

  const origin = colorSet[scheme === "dark" ? 600 : 500];
  const hover = colorSet[scheme === "dark" ? 500 : 600];
  const active = colorSet[scheme === "dark" ? 400 : 700];
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

export const generateTypefaces = (
  params: Partial<Record<"ltr" | "rtl" | "monospace", string>>,
): { typefaces?: Partial<Theme["typefaces"]> } => {
  const { ltr, rtl, monospace } = params;

  if (!ltr && !rtl && !monospace) return {};

  const partialTypefaces: Partial<Theme["typefaces"]> = { ltr, rtl, monospace };

  if (Object.keys(partialTypefaces).length > 0)
    return { typefaces: partialTypefaces };

  return {};
};

export const generateTypography = (params: {
  typographySize?: PrimitiveTokens["typographySize"];
}): { typography?: Theme["typography"] } => {
  const { typographySize } = params;

  if (typographySize == null) return {};

  const scaling = typeScaling[typographySize];
  const baseFontSize =
    typographySize === "small" ? 14 : typographySize === "large" ? 18 : 16;

  return {
    typography: {
      baseSize: baseFontSize,
      h1: { size: scaling.h1[0]!, leading: scaling.h1[1]!, weight: 300 },
      h2: { size: scaling.h2[0]!, leading: scaling.h2[1]!, weight: 300 },
      h3: { size: scaling.h3[0]!, leading: scaling.h3[1]!, weight: 400 },
      h4: { size: scaling.h4[0]!, leading: scaling.h4[1]!, weight: 400 },
      h5: { size: scaling.h5[0]!, leading: scaling.h5[1]!, weight: 400 },
      h6: { size: scaling.h6[0]!, leading: scaling.h6[1]!, weight: 500 },
      subheading1: {
        size: scaling.subheading1[0]!,
        leading: scaling.subheading1[1]!,
        weight: 400,
      },
      subheading2: {
        size: scaling.subheading2[0]!,
        leading: scaling.subheading2[1]!,
        weight: 500,
      },
      body1: {
        size: scaling.body1[0]!,
        leading: scaling.body1[1]!,
        weight: 400,
      },
      body2: {
        size: scaling.body2[0]!,
        leading: scaling.body2[1]!,
        weight: 400,
      },
      caption: {
        size: scaling.caption[0]!,
        leading: scaling.caption[1]!,
        weight: 400,
      },
    },
  };
};

export const generateSpacing = (params: {
  density?: PrimitiveTokens["density"];
}): { spacing?: Theme["spacing"] } => {
  const { density } = params;

  if (density == null) return {};

  const baseSpacer = density === "compact" ? 2 : density === "loose" ? 6 : 4;

  return {
    spacing: {
      origin: baseSpacer,
      xxs: baseSpacer / 2,
      xs: baseSpacer,
      sm: baseSpacer * 1.5,
      md: baseSpacer * 2,
      lg: baseSpacer * 3,
      xlg: baseSpacer * 4,
      steps: {
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
    },
  };
};

export const generateColors = (
  params: Partial<
    Pick<PrimitiveTokens, "primaryColor" | "secondaryColor" | "colorScheme">
  > & {
    inheritedColorScheme: PrimitiveTokens["colorScheme"];
  },
): { colors?: DeepPartial<Theme["colors"]> } => {
  const { primaryColor, secondaryColor, colorScheme, inheritedColorScheme } =
    params;

  if (
    !primaryColor &&
    !secondaryColor &&
    (!colorScheme || colorScheme === inheritedColorScheme)
  ) {
    return {};
  }

  const partialColors: DeepPartial<Theme["colors"]> =
    typeof colorScheme === "string" && colorScheme !== inheritedColorScheme
      ? { scheme: colorScheme }
      : {};

  if (primaryColor) {
    if (typeof primaryColor === "string" && !isValidHexColor(primaryColor)) {
      throw new Error(
        `Invalid hex color provided. (\`{ primaryColor: "${primaryColor}" }\`)`,
      );
    }

    const primary = createBrandingColorVariants(
      primaryColor,
      colorScheme ?? inheritedColorScheme,
    );

    if (!partialColors.foregrounds) partialColors.foregrounds = {};

    partialColors.primary = primary;
    partialColors.foregrounds = {
      ...partialColors.foregrounds,
      onPrimary: getForegroundColor(primary.origin),
    };
  }

  if (secondaryColor) {
    if (
      typeof secondaryColor === "string" &&
      !isValidHexColor(secondaryColor)
    ) {
      throw new Error(
        `Invalid hex color provided. (\`{ secondaryColor: "${secondaryColor}" }\`)`,
      );
    }

    const secondary = createBrandingColorVariants(
      secondaryColor,
      colorScheme ?? inheritedColorScheme,
    );

    if (!partialColors.foregrounds) partialColors.foregrounds = {};

    partialColors.secondary = secondary;
    partialColors.foregrounds = {
      ...partialColors.foregrounds,
      onSecondary: getForegroundColor(secondary.origin),
    };
  }

  if (typeof colorScheme === "string" && colorScheme !== inheritedColorScheme) {
    partialColors.success = semanticColorVariants[colorScheme].success;
    partialColors.error = semanticColorVariants[colorScheme].error;
    partialColors.warning = semanticColorVariants[colorScheme].warning;
    partialColors.info = semanticColorVariants[colorScheme].info;

    partialColors.neutral = neutralColors[colorScheme];
  }

  if (Object.keys(partialColors).length > 0) return { colors: partialColors };

  return {};
};
