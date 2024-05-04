"use client";

import * as React from "react";
import classes from "./layout.module.css";

import { HelixClient } from "../lib/systems";
import "./global.css";

const RootLayout = (props: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <HelixClient
          colorScheme="dark"
          direction="ltr"
        >
          <div className={classes.root}>
            <div className={classes.toolbar}>
              <h1 className={classes.title}>Dev Sandbox</h1>
            </div>
            {props.children}
          </div>
        </HelixClient>
      </body>
    </html>
  );
};

export default RootLayout;
