import * as React from "react";
import type { HelixThemingClient } from "../../theming";

export type ThemingClientContextValue = HelixThemingClient;

const ThemingClientContext =
  React.createContext<ThemingClientContextValue | null>(null);

if (process.env.NODE_ENV !== "production") {
  ThemingClientContext.displayName = "ThemingClientContext";
}

export default ThemingClientContext;
