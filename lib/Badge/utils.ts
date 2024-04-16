import * as React from "react";
import { SystemError } from "../internals";
import { isFragment } from "../utils";

export const getValidChild = (children: JSX.Element) => {
  try {
    if (!React.isValidElement(children)) throw 0;
    if (isFragment(children)) throw 0;

    return React.Children.only(children) as JSX.Element;
  } catch {
    throw new SystemError(
      "The `children` prop has to be a single valid non-fragment element.",
      "Badge",
    );
  }
};
