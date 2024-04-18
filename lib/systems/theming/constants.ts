import { adjustAlpha, getForegroundColor } from "../../utils";
import { green, orange, rose, sky, zinc } from "./palette";
import type {
  ColorTokens,
  ForegroundColorTokens,
  NeutralColorTokens,
  Variants,
} from "./types";

const successColor = green;
const errorColor = rose;
const warningColor = orange;
const infoColor = sky;

export const SEMANTIC_FOREGROUNDS: Pick<
  ForegroundColorTokens,
  "onSuccess" | "onError" | "onWarning" | "onInfo"
> = {
  onSuccess: getForegroundColor(successColor[500]),
  onError: getForegroundColor(errorColor[500]),
  onWarning: getForegroundColor(warningColor[500]),
  onInfo: getForegroundColor(infoColor[500]),
} as const;

export const semanticColorVariantsMap: Record<
  Variants,
  Pick<ColorTokens, "success" | "error" | "warning" | "info">
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
} as const;

export const neutralColorVariantsMap: Record<Variants, NeutralColorTokens> = {
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
} as const;
