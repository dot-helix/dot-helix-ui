import * as React from "react";
import { SystemError } from "../../internals";
import { ThemingClientContext } from "./ThemingClient";
import type { HelixTokensClient } from "./types";

const useTokensClient = (): HelixTokensClient => {
  const themingClient = React.useContext(ThemingClientContext);

  if (!themingClient) {
    throw new SystemError(
      "You have to use this hook in a component that is a descendant of <HelixClient>.",
      "HelixClient",
    );
  }

  const {
    ColorVariantSelector,
    DirectionVariantSelector,
    generateCSSVariablesAsInlineStyle,
    useDirection,
    useTokens,
  } = themingClient;

  const direction = useDirection();
  const tokens = useTokens();

  return {
    direction,
    tokens,
    ColorVariantSelector,
    DirectionVariantSelector,
    generateCSSVariablesAsInlineStyle,
  } satisfies HelixTokensClient;
};

export default useTokensClient;
