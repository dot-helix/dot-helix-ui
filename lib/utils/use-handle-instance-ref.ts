import * as React from "react";

const useHandleInstanceRef = <T>(
  instanceRef: React.RefObject<T> | undefined,
  initializer: () => T,
  deps?: React.DependencyList,
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useImperativeHandle(instanceRef, initializer, deps);
};

export default useHandleInstanceRef;
