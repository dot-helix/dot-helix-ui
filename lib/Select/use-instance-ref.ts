import * as React from "react";
import type { SelectInstance } from "./types";

const useInstanceRef = () => {
  const instanceRef = React.useRef<SelectInstance>(null);

  return instanceRef;
};

export default useInstanceRef;
