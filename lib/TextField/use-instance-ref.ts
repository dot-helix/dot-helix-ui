import * as React from "react";
import type { TextFieldInstance } from "./types";

const useInstanceRef = () => {
  const instanceRef = React.useRef<TextFieldInstance>(null);

  return instanceRef;
};

export default useInstanceRef;
