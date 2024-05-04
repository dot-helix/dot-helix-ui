import type * as React from "react";
import TokensClientContext, {
  type TokensClientContextValue,
} from "./TokensClientContext";

type Props = {
  children?: React.ReactNode;
  tokensClient: TokensClientContextValue;
};

const TokensClientProvider = (props: Props) => {
  const { children, tokensClient } = props;

  return (
    <TokensClientContext.Provider value={tokensClient}>
      {children}
    </TokensClientContext.Provider>
  );
};

export default TokensClientProvider;
