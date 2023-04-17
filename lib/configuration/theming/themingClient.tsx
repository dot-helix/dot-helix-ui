import * as React from "react";
import {
  createTheming as createThemingClient,
  defaultCssVariableGenerator
} from "react-design-tokens";
import { deepMerge } from "react-design-tokens/helpers";
import { useRootContext } from "../Initializer/Contexts";
import { defaultPrimitives, defaultTheme } from "./defaults";
import {
  generateColors,
  generateSpacing,
  generateTypefaces,
  generateTypography
} from "./generate";

interface Theme {
  colors: Record<
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
    neutral: {
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
    foregrounds: {
      onPrimary: string;
      onSecondary: string;
      onSuccess: string;
      onError: string;
      onWarning: string;
      onInfo: string;
    };
  } & {
    scheme: "dark" | "light";
    palette: Record<
      | "gray"
      | "zinc"
      | "red"
      | "orange"
      | "amber"
      | "yellow"
      | "lime"
      | "green"
      | "emerald"
      | "teal"
      | "cyan"
      | "sky"
      | "blue"
      | "indigo"
      | "violet"
      | "purple"
      | "fuschsia"
      | "pink"
      | "rose",
      Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>
    >;
  };
  spacing: Record<
    "origin" | "xxs" | "xs" | "sm" | "md" | "lg" | "xlg",
    number
  > & {
    steps: Record<
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
  };
  breakpoints: Record<"xxs" | "xs" | "sm" | "md" | "lg" | "xlg", number>;
  typefaces: Record<"ltr" | "rtl" | "monospace", string>;
  typography: Record<
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
  > & { baseSize: number };
  zIndexes: Record<0 | 1 | 2 | 3 | 4 | 5, number>;
  borderRadius: Record<"full" | "xs" | "sm" | "md" | "lg" | "xlg", number>;
  shadows: Record<"xs" | "sm" | "md" | "lg" | "xlg", string>;
  direction: "ltr" | "rtl";
}

interface PrimitiveTokens {
  primaryColor:
    | string
    | Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>;
  secondaryColor:
    | string
    | Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, string>;
  density: "normal" | "compact" | "loose";
  typographySize: "normal" | "slightly-smaller" | "slightly-larger";
  rtlFontFamily: string;
  ltrFontFamily: string;
  monospaceFontFamily: string;
  colorScheme: "dark" | "light";
  direction: "ltr" | "rtl";
}

const createPartialTheme = (
  primitives: Partial<PrimitiveTokens> & {
    inheritedColorScheme: PrimitiveTokens["colorScheme"];
  }
) => {
  const {
    density,
    typographySize,
    colorScheme,
    direction,
    rtlFontFamily,
    ltrFontFamily,
    monospaceFontFamily,
    primaryColor,
    secondaryColor,
    inheritedColorScheme
  } = primitives;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...(direction ? { direction } : {}),
    ...generateTypefaces({
      ltr: ltrFontFamily,
      rtl: rtlFontFamily,
      monospace: monospaceFontFamily
    }),
    ...generateTypography({ typographySize }),
    ...generateSpacing({ density }),
    ...generateColors({
      primaryColor,
      secondaryColor,
      colorScheme,
      inheritedColorScheme
    })
  };
};

const { ThemeProvider, useTheme, getVariablesAsStyles } = createThemingClient(
  defaultTheme,
  {
    initializeVariablesOnHTMLRoot: true,
    cssVariableGenerator: (tokenFamilyKey: string, tokenPath, tokenValue) => {
      let value: unknown = tokenValue;
      let rootKey = String(tokenFamilyKey);
      let path: string = tokenPath;

      switch (tokenFamilyKey) {
        case "breakpoints":
          rootKey = "breakpoint";
          break;
        case "borderRadius":
          rootKey = "rounded";

          if (typeof value === "number") {
            const pathSegments = tokenPath.split(".");

            switch (pathSegments[pathSegments.length - 1]) {
              case "full":
                break;
              default:
                value = `${value / 16}rem`;
                break;
            }
          }

          break;
        case "colors":
          rootKey = "color";
          break;
        case "shadows":
          rootKey = "shadow";
          break;
        case "spacing":
          rootKey = "space";
          path = path.replace("steps.", "");

          if (typeof value === "number") value = `${value / 16}rem`;
          if (["0.5", "1.5", "2.5", "3.5"].includes(path)) {
            return {
              variable: `space-${path.replace(".", "p")}`,
              value: value as string
            };
          }

          break;
        case "typefaces":
          rootKey = "typeface";
          break;
        case "zIndexes":
          rootKey = "z";

          if (typeof value === "number") value = String(value);

          break;
        case "direction":
          break;
        case "typography": {
          if (typeof value === "number") {
            const pathSegments = tokenPath.split(".");

            switch (pathSegments[pathSegments.length - 1]) {
              case "weight":
              case "leading":
                value = String(value);
                break;
              default:
                value = `${value / 16}rem`;
                break;
            }
          }

          break;
        }
        default:
          return null;
      }

      return defaultCssVariableGenerator(rootKey, path, value);
    }
  }
);

const ThemingConfig = (props: {
  children: React.ReactNode;
  primitives: Partial<PrimitiveTokens>;
}) => {
  if (!useRootContext().__init) {
    throw new Error(
      "You must not use `<ThemingConfig>` outside of a tree that is not wrapped by `<Initializer>`."
    );
  }

  const { children, primitives } = props;

  const outerTheme = useTheme();

  // @ts-expect-error framework's internal property
  const isInitialProvider = !outerTheme.__viaProvider;
  const inheritedColorScheme = outerTheme.colors.scheme;

  const theme = React.useMemo<Theme>(() => {
    if (primitives === defaultPrimitives) return defaultTheme;

    const partialTheme = createPartialTheme({
      ...primitives,
      inheritedColorScheme
    }) as Theme;

    return isInitialProvider
      ? deepMerge(defaultTheme, partialTheme)
      : partialTheme;
  }, [primitives, isInitialProvider, inheritedColorScheme]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const getVariablesAsInlineStyle = (primitives?: Partial<PrimitiveTokens>) => {
  let tokens = primitives ?? defaultPrimitives;

  tokens =
    tokens === defaultPrimitives
      ? defaultPrimitives
      : { ...defaultPrimitives, ...tokens };

  const theme = (() => {
    if (tokens === defaultPrimitives) return defaultTheme;

    const partialTheme = createPartialTheme({
      ...tokens,
      inheritedColorScheme: defaultPrimitives.colorScheme
    }) as Theme;

    return deepMerge(defaultTheme, partialTheme);
  })();

  return getVariablesAsStyles(theme);
};

export {
  useTheme,
  ThemingConfig,
  getVariablesAsInlineStyle,
  type Theme,
  type PrimitiveTokens
};
