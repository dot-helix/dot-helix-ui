import * as React from "react";
import type { CheckboxInstance } from "./types";

const useInstanceRef = () => {
  const instanceRef = React.useRef<CheckboxInstance>(null);

  return instanceRef;
};

export default useInstanceRef;
