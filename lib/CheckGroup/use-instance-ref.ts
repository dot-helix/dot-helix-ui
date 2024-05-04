import * as React from "react";
import type { CheckGroupInstace } from "./types";

const useInstanceRef = () => {
  const instanceRef = React.useRef<CheckGroupInstace>(null);

  return instanceRef;
};

export default useInstanceRef;
