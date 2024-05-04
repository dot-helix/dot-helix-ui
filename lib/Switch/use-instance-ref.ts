import * as React from "react";
import type { SwitchInstance } from "./types";

const useInstanceRef = () => {
  const instanceRef = React.useRef<SwitchInstance>(null);

  return instanceRef;
};

export default useInstanceRef;
