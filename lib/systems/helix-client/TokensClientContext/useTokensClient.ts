import * as React from "react";
import { SystemError } from "../../../internals";
import TokensClientContext from "./TokensClientContext";

const useTokensClient = () => {
  const tokensClient = React.useContext(TokensClientContext);

  if (!tokensClient) {
    throw new SystemError(
      "You have to use this hook in a component that is a descendant of <HelixClient>.",
      "HelixClient",
    );
  }

  return tokensClient;
};

export default useTokensClient;
