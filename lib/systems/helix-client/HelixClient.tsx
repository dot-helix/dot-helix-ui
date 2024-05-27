"use client";

import {
  PortalConfigProvider,
  type PortalConfigProviderProps,
} from "@styleless-ui/react";
import * as React from "react";
import { SystemError } from "../../internals";
import { useConstantValue, useDeterministicId } from "../../utils";
import {
  createClient as createThemingClient,
  defaultPrimitives,
  type PrimitiveTokens,
  type Variants,
} from "../theming";
import { HELIX_CLIENT_ROOT_PREFIX } from "./constants";
import { ThemingClientContext, ThemingClientProvider } from "./ThemingClient";

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

  const outerThemingClient = React.useContext(ThemingClientContext);

  if (outerThemingClient) {
    throw new SystemError(
      "You must not use <HelixClient> in a tree that is already wrapped by it.",
      "HelixClient",
    );
  }

  const helixClientRootId = useDeterministicId(
    undefined,
    HELIX_CLIENT_ROOT_PREFIX,
  );

  const primitiveTokens = useConstantValue(
    () =>
      ({
        ...defaultPrimitives,
        ...(primitives ?? {}),
      }) as PrimitiveTokens,
  );

  const themingClient = useConstantValue(() =>
    createThemingClient(primitiveTokens),
  );

  const rootStyles: React.CSSProperties = {
    direction: "var(--direction)" as "ltr" | "rtl",
    color: "var(--color-neutral-text-normal)",
    backgroundColor: "var(--color-neutral-background-base)",
    fontFamily: `var(--typography-typeface-${direction})`,
  };

  const bgStyles: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "var(--color-neutral-background-base)",
    zIndex: "-1",
  };

  const portalConfig: PortalConfigProviderProps["config"] = React.useMemo(
    () => ({
      resolveContainer: () => document.getElementById(helixClientRootId),
    }),
    [helixClientRootId],
  );

  return (
    <ThemingClientProvider themingClient={themingClient}>
      <PortalConfigProvider config={portalConfig}>
        <themingClient.DirectionVariantSelector variant={direction}>
          <themingClient.ColorVariantSelector variant={colorScheme}>
            <div
              id={helixClientRootId}
              data-name="HelixClient:Root"
              style={rootStyles}
            >
              <div
                aria-hidden="true"
                data-name="HelixClient:Background"
                style={bgStyles}
              ></div>
              <UtilityClasses enable={!disableUtilityClassesGeneration} />
              {children}
            </div>
          </themingClient.ColorVariantSelector>
        </themingClient.DirectionVariantSelector>
      </PortalConfigProvider>
    </ThemingClientProvider>
  );
};

export default HelixClient;
