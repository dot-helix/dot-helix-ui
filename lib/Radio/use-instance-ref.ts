import * as React from "react";
import type { RadioInstance } from "./types";

const useInstanceRef = () => {
  const instanceRef = React.useRef<RadioInstance>(null);

  return instanceRef;
};

export default useInstanceRef;
