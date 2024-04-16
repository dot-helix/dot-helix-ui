import * as React from "react";

const resolveValue = <T>(value: T | (() => T)) => {
  if (typeof value === "function") return (value as () => T)();

  return value;
};

const useConstantValue = <T>(value: T | (() => T)) => {
  const isResolvedRef = React.useRef(false);
  const valueRef = React.useRef<T>();

  if (isResolvedRef.current) return valueRef.current as T;

  valueRef.current = resolveValue(value);
  isResolvedRef.current = true;

  return valueRef.current;
};

export default useConstantValue;
