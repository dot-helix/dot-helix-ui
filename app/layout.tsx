"use client";

import * as React from "react";
import { Switch } from "../lib";
import { getVariablesAsInlineStyle, Initializer } from "../lib/configuration";
import classes from "./layout.module.css";

const ssrCssVariables = getVariablesAsInlineStyle();

const RootLayout = (props: { children: React.ReactNode }) => {
  const [scheme, setScheme] = React.useState<"light" | "dark">("light");

  const primitives = React.useMemo<
    Parameters<typeof getVariablesAsInlineStyle>[0]
  >(() => ({ colorScheme: scheme }), [scheme]);

  return (
    <html lang="en" style={ssrCssVariables}>
      <body>
        <Initializer primitives={primitives}>
          <div className={classes.root}>
            <div className={classes.toolbar}>
              <h1 className={classes.title}>Dev Sandbox</h1>
              <Switch
                fluid
                label="Dark Scheme"
                onChange={() =>
                  void setScheme(s => (s === "light" ? "dark" : "light"))
                }
              />
            </div>
            {props.children}
          </div>
        </Initializer>
      </body>
    </html>
  );
};

export default RootLayout;
