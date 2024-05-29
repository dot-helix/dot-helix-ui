import * as React from "react";
import type { InputSliderInstance } from "./types";

const useInstanceRef = () => {
  const instanceRef = React.useRef<InputSliderInstance>(null);

  return instanceRef;
};

export default useInstanceRef;
