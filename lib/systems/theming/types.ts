import type { ReactElement } from "react";
import type { Palette } from "./palette";

export type Variants = "dark" | "light";

export type NeutralColorTokens = {
  origin: string;
  hover: string;
  active: string;
  disabled: string;
  text: {
    normal: string;
    inverted: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    disabled: string;
  };
  border: { normal: string; secondary: string };
  background: {
    base: string;
    elevated: string;
    layout: string;
    spotlight: string;
    overlay: string;
  };
  surface: {
    base: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
  };
};

export type ForegroundColorTokens = {
  onPrimary: string;
  onSecondary: string;
  onSuccess: string;
  onError: string;
  onWarning: string;
  onInfo: string;
};

export type ColorTokens = Record<
  "primary" | "secondary" | "success" | "error" | "warning" | "info",
  {
    origin: string;
    hover: string;
    active: string;
    disabled: string;
    surface: {
      base: string;
      secondary: string;
      tertiary: string;
      quaternary: string;
    };
  }
> & {
  neutral: NeutralColorTokens;
  foregrounds: ForegroundColorTokens;
};

export type StepsSpacingTokens = Record<
  | 0
  | 0.5
  | 1
  | 1.5
  | 2
  | 2.5
  | 3
  | 3.5
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 14
  | 16
  | 18
  | 20
  | 24
  | 28
  | 32
  | 36
  | 40
  | 44
  | 48
  | 52
  | 56
  | 60
  | 64
  | 72
  | 80
  | 96
  | 112
  | 128,
  number
>;

export type SpacingTokens = Record<
  "origin" | "xxs" | "xs" | "sm" | "md" | "lg" | "xlg",
  number
> &
  StepsSpacingTokens;

export type BreakpointTokens = Record<
  "xxs" | "xs" | "sm" | "md" | "lg" | "xlg",
  number
>;

export type TypefaceTokens = Record<"ltr" | "rtl" | "monospace", string>;

export type TypeScaleTokens = Record<
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subheading1"
  | "subheading2"
  | "body1"
  | "body2"
  | "caption",
  {
    size: number;
    leading: number;
    weight: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  }
>;

export type TypographyTokens = TypeScaleTokens & {
  typefaces: TypefaceTokens;
  baseSize: number;
};

export type ZIndexeTokens = Record<0 | 1 | 2 | 3 | 4 | 5, number>;

export type BorderRadiusTokens = Record<
  "full" | "xs" | "sm" | "md" | "lg" | "xlg",
  number
>;

export type ShadowTokens = Record<"xs" | "sm" | "md" | "lg" | "xlg", string>;

export type ThemeTokens = {
  colors: ColorTokens;
  palette: Palette;
  spacing: SpacingTokens;
  breakpoints: BreakpointTokens;
  typography: TypographyTokens;
  zIndexes: ZIndexeTokens;
  borderRadius: BorderRadiusTokens;
  shadows: ShadowTokens;
};

export type VariantTokens = Pick<ThemeTokens, "colors">;
export type CommonTokens = Omit<ThemeTokens, "colors">;

export type PrimitiveTokens = {
  primaryColor:
    | string
    | Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>;
  secondaryColor:
    | string
    | Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>;
  density: "normal" | "compact" | "loose";
  typographySize: "normal" | "small" | "large";
  rtlFontFamily: string;
  ltrFontFamily: string;
  monospaceFontFamily: string;
};

export type VariantTokensMap = Record<Variants, VariantTokens>;

export type Client = {
  ColorVariantSelector: (props: {
    children?: React.ReactNode;
    disableCSSVariableGeneration?: boolean;
    variant: Variants;
  }) => ReactElement | null;
  DirectionVariantSelector: (props: {
    children?: React.ReactNode;
    disableCSSVariableGeneration?: boolean;
    variant: "ltr" | "rtl";
  }) => ReactElement | null;
  useTokens: () => ThemeTokens;
  useDirection: () => "ltr" | "rtl";
  generateCSSVariablesAsInlineStyle: (
    variant: Variants,
    options?: { disableCommonTokensGeneration?: boolean },
  ) => Record<string, string> | null;
};
