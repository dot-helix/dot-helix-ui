import { create } from "react-design-tokens";
import { createCommonTokens, createVariantTokensMap } from "./create-tokens";
import cssVariableGenerator from "./css-variable-generator";
import type { HelixThemingClient, PrimitiveTokens } from "./types";

const createClient = (primitiveTokens: PrimitiveTokens): HelixThemingClient => {
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

  const directionClient = create(
    {
      variants: {
        ltr: { direction: "ltr" },
        rtl: { direction: "rtl" },
      },
      common: {},
    },
    { cssVariableGenerator },
  );

  const useDirection = () =>
    directionClient.useTokens().direction as "ltr" | "rtl";

  const DirectionVariantSelector: typeof directionClient.VariantSelector =
    props => {
      const { variant, disableCSSVariableGeneration, children } = props;

      return (
        <directionClient.VariantSelector
          variant={variant}
          disableCSSVariableGeneration={disableCSSVariableGeneration}
        >
          <div dir={variant}>{children}</div>
        </directionClient.VariantSelector>
      );
    };

  return {
    generateCSSVariablesAsInlineStyle,
    ColorVariantSelector,
    DirectionVariantSelector,
    useTokens,
    useDirection,
  } satisfies HelixThemingClient;
};

export default createClient;
