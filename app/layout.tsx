"use client";

import * as React from "react";
import classes from "./layout.module.css";

import { ToggleGroup } from "../lib";
import { HelixClient } from "../lib/systems";
import "./global.css";

type ColorScheme = "dark" | "light";
type Direction = "ltr" | "rtl";

const RootLayout = (props: { children: React.ReactNode }) => {
  const [colorScheme, setColorScheme] = React.useState<ColorScheme>("dark");

  const [direction, setDirection] = React.useState<Direction>("ltr");

  const makeHandleToggleValueChange =
    <T extends string | string[]>(
      stateUpdater: React.Dispatch<React.SetStateAction<T>>,
    ) =>
    (value: T) => {
      if (value.length === 0) return;

      stateUpdater(value);
    };

  return (
    <html lang="en">
      <body>
        <HelixClient
          colorScheme={colorScheme}
          direction={direction}
        >
          <div className={classes.root}>
            <div className={classes.toolbar}>
              <h1 className={classes.title}>Dev Sandbox</h1>
              <div className={classes.toggles}>
                <ToggleGroup
                  selectMode="single"
                  size="small"
                  value={colorScheme}
                  onValueChange={value =>
                    makeHandleToggleValueChange(setColorScheme)(
                      value as ColorScheme,
                    )
                  }
                  label={{ screenReaderLabel: "Toggle color scheme" }}
                  items={[
                    { title: "Dark", value: "dark" },
                    { title: "Light", value: "light" },
                  ]}
                />
                <ToggleGroup
                  selectMode="single"
                  size="small"
                  value={direction}
                  onValueChange={value =>
                    makeHandleToggleValueChange(setDirection)(
                      value as Direction,
                    )
                  }
                  label={{ screenReaderLabel: "Toggle color scheme" }}
                  items={[
                    { title: "RTL", value: "rtl" },
                    { title: "LTR", value: "ltr" },
                  ]}
                />
              </div>
            </div>
            {props.children}
          </div>
        </HelixClient>
      </body>
    </html>
  );
};

export default RootLayout;
