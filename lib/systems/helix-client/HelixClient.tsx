"use client";

import {
  PortalConfigProvider,
  type PortalConfigProviderProps,
} from "@styleless-ui/react";
import * as React from "react";
import { SystemError } from "../../internals";
import { useConstantValue, useDeterministicId } from "../../utils";
import {
  createClient,
  defaultPrimitives,
  type PrimitiveTokens,
  type Variants,
} from "../theming";
import { HELIX_CLIENT_ROOT_PREFIX } from "./constants";
import {
  TokensClientContext,
  TokensClientProvider,
} from "./TokensClientContext";

import "./baseline.css";
import UtilityClasses from "./UtilityClasses";

export type Props = {
  children?: React.ReactNode;
  tokensConfiguration?: Partial<PrimitiveTokens>;
  colorScheme?: Variants;
  direction?: "ltr" | "rtl";
  disableUtilityClassesGeneration?: boolean;
};

const HelixClient = (props: Props) => {
  const {
    children,
    tokensConfiguration: primitives,
    colorScheme = "dark",
    direction = "ltr",
    disableUtilityClassesGeneration = false,
  } = props;

  const helixClientRootId = useDeterministicId(
    undefined,
    HELIX_CLIENT_ROOT_PREFIX,
  );

  const outerTokensClient = React.useContext(TokensClientContext);

  const portalConfig: PortalConfigProviderProps["config"] = React.useMemo(
    () => ({
      resolveContainer: () => document.getElementById(helixClientRootId),
    }),
    [helixClientRootId],
  );

  if (outerTokensClient) {
    throw new SystemError(
      "You must not use <HelixClient> in a tree that is already wrapped by it.",
      "HelixClient",
    );
  }

  const primitiveTokens = useConstantValue(
    () =>
      ({
        ...defaultPrimitives,
        ...(primitives ?? {}),
      }) as PrimitiveTokens,
  );

  const client = useConstantValue(() => createClient(primitiveTokens));

  const rootStyles = {
    direction: "var(--direction)",
    color: "var(--color-neutral-text-normal)",
    backgroundColor: "var(--color-neutral-background-base)",
    fontFamily: `var(--typography-typeface-${direction})`,
  };

  return (
    <TokensClientProvider tokensClient={client}>
      <PortalConfigProvider config={portalConfig}>
        <client.DirectionVariantSelector variant={direction}>
          <client.ColorVariantSelector variant={colorScheme}>
            <div
              id={helixClientRootId}
              data-name="HelixClientRoot"
              style={rootStyles as React.CSSProperties}
            >
              <UtilityClasses enable={!disableUtilityClassesGeneration} />
              {children}
            </div>
          </client.ColorVariantSelector>
        </client.DirectionVariantSelector>
      </PortalConfigProvider>
    </TokensClientProvider>
  );
};

export default HelixClient;
