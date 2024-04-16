import { create } from "react-design-tokens";
import { createCommonTokens, createVariantTokensMap } from "./create-tokens";
import cssVariableGenerator from "./css-variable-generator";
import type { Client, PrimitiveTokens } from "./types";

const createClient = (primitiveTokens: PrimitiveTokens): Client => {
  const { primaryColor, secondaryColor, ...otherPrimitives } = primitiveTokens;

  const variantTokensMap = createVariantTokensMap({
    primaryColor,
    secondaryColor,
  });

  const commonTokens = createCommonTokens(otherPrimitives);

  const {
    VariantSelector: ColorVariantSelector,
    generateCSSVariablesAsInlineStyle,
    useTokens,
  } = create(
    {
      variants: variantTokensMap,
      common: commonTokens,
    },
    { cssVariableGenerator },
  );

  const {
    VariantSelector: DirectionVariantSelector,
    useTokens: useDirectionToken,
  } = create(
    {
      variants: {
        ltr: { direction: "ltr" },
        rtl: { direction: "rtl" },
      },
      common: {},
    },
    { cssVariableGenerator },
  );

  return {
    generateCSSVariablesAsInlineStyle,
    ColorVariantSelector,
    DirectionVariantSelector,
    useTokens,
    useDirectionToken: useDirectionToken as Client["useDirectionToken"],
  } satisfies Client;
};

export default createClient;
