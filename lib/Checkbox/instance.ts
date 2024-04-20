import * as React from "react";

export type Instance = {
  getCheckboxNode: () => HTMLButtonElement | null;
  isChecked: () => boolean;
};

const useInstanceRef = () => {
  const instanceRef = React.useRef<Instance>(null);

  return instanceRef;
};

export default useInstanceRef;
