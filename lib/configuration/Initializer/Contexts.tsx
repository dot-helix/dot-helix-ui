import * as React from "react";

interface RootContextValue {
  __init: boolean;
}

const RootContext = React.createContext<RootContextValue>({ __init: false });

if (process.env.NODE_ENV !== "production")
  RootContext.displayName = "RootContext";

const useRootContext = () => React.useContext(RootContext);

const RootContextProvider = (props: {
  children: React.ReactNode;
  context: RootContextValue;
}) => (
  <RootContext.Provider value={props.context}>
    {props.children}
  </RootContext.Provider>
);

export { useRootContext, RootContextProvider, type RootContextValue };
