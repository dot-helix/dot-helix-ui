import * as React from "react";
import {
  defaultPrimitives,
  ThemingConfig,
  type PrimitiveTokens,
} from "../theming";
import {
  RootContextProvider,
  useRootContext,
  type RootContextValue,
} from "./Contexts";

import "./baseline.css";

interface Props {
  primitives?: Partial<PrimitiveTokens>;
  children: React.ReactNode;
}

const Initializer = (props: Props) => {
  if (useRootContext().__init) {
    throw new Error(
      "You must not use `<Initializer>` in a tree that is already wrapped by it.",
    );
  }

  const { primitives: primitivesProp = defaultPrimitives, children } = props;

  const primitives = React.useMemo(
    () =>
      primitivesProp === defaultPrimitives
        ? defaultPrimitives
        : { ...defaultPrimitives, ...primitivesProp },
    [primitivesProp],
  );

  const context = React.useMemo<RootContextValue>(() => ({ __init: true }), []);

  return (
    <RootContextProvider context={context}>
      <ThemingConfig primitives={primitives}>{children}</ThemingConfig>
    </RootContextProvider>
  );
};

export default Initializer;
