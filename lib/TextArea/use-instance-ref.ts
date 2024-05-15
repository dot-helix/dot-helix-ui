import * as React from "react";
import type { TextAreaInstance } from "./types";

const useInstanceRef = () => {
  const instanceRef = React.useRef<TextAreaInstance>(null);

  return instanceRef;
};

export default useInstanceRef;
