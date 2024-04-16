import * as React from "react";
import type { Client } from "../../theming";

export type TokensClientContextValue = Client;

const TokensClientContext =
  React.createContext<TokensClientContextValue | null>(null);

if (process.env.NODE_ENV !== "production") {
  TokensClientContext.displayName = "TokensClientContext";
}

export default TokensClientContext;
