import type * as React from "react";
import type { HelixThemingClient } from "../../theming";
import ThemingClientContext from "./ThemingClientContext";

type Props = {
  children?: React.ReactNode;
  themingClient: HelixThemingClient;
};

const ThemingClientProvider = (props: Props) => {
  const { children, themingClient } = props;

  return (
    <ThemingClientContext.Provider value={themingClient}>
      {children}
    </ThemingClientContext.Provider>
  );
};

export default ThemingClientProvider;
