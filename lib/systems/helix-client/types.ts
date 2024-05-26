import type { HelixThemingClient } from "../theming";

export type HelixTokensClient = Pick<
  HelixThemingClient,
  | "ColorVariantSelector"
  | "DirectionVariantSelector"
  | "generateCSSVariablesAsInlineStyle"
> & {
  tokens: ReturnType<HelixThemingClient["useTokens"]>;
  direction: ReturnType<HelixThemingClient["useDirection"]>;
};
