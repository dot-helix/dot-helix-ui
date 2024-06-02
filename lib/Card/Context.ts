import * as React from "react";
import { SystemError } from "../internals";

type ContextValue = {
  scopeId: string;
  titleId: string;
  subtitleId: string;
  smaller: boolean;
};

const Context = React.createContext<ContextValue | null>(null);

const useContext = () => {
  const context = React.useContext(Context);

  if (!context) {
    throw new SystemError(
      "You have to use this in a component that is a descendant of the <Card.Container> component.",
      "Card",
    );
  }

  return context;
};

if (process.env.NODE_ENV !== "production") {
  Context.displayName = "Card.Context";
}

export {
  Context as CardContext,
  useContext as useCardContext,
  type ContextValue as CardContextValue,
};
