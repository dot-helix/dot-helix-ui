"use client";

import * as React from "react";

const RootLayout = (props: { children: React.ReactNode }) => (
  <html lang="en">
    <body>{props.children}</body>
  </html>
);

export default RootLayout;
