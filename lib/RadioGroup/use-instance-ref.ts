import * as React from "react";
import type { RadioGroupInstace } from "./types";

const useInstanceRef = () => {
  const instanceRef = React.useRef<RadioGroupInstace>(null);

  return instanceRef;
};

export default useInstanceRef;
