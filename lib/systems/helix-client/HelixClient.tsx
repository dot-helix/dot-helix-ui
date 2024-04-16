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
import {
  TokensClientContext,
  TokensClientProvider,
} from "./TokensClientContext";
import { HELIX_CLIENT_ROOT_PREFIX } from "./constants";

import "./baseline.css";

export type Props = {
  children?: React.ReactNode;
  primitives?: Partial<PrimitiveTokens>;
  colorScheme?: Variants;
  direction?: "ltr" | "rtl";
};

const HelixClient = (props: Props) => {
  const {
    children,
    primitives,
    colorScheme = "dark",
    direction = "ltr",
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
    "background-color": "var(--color-neutral-background-base)",
    "font-family": `var(--typography-typeface-${direction})`,
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
              {children}
            </div>
          </client.ColorVariantSelector>
        </client.DirectionVariantSelector>
      </PortalConfigProvider>
    </TokensClientProvider>
  );
};

export default HelixClient;
