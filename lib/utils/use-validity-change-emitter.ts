import * as React from "react";
import type { AnyVoidFunction, ValidityState } from "../types";
import hasValidityChanged from "./has-validity-changed";

type ConditionsMap = {
  required?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StateChangeEmitter = (state: any) => void;

const useValidityChangeEmitter = <
  TState extends ValidityState,
  TConditions extends ConditionsMap,
  TValidityChangeEmitter extends AnyVoidFunction,
  TStateChangeEmitter extends StateChangeEmitter,
>(props: {
  conditions: TConditions;
  validator: (
    state: Parameters<TStateChangeEmitter>[0],
    conditions: TConditions,
  ) => TState;
  onValidityChange?: TValidityChangeEmitter;
  onStateChange?: TStateChangeEmitter;
}) => {
  const { conditions, onStateChange, onValidityChange, validator } = props;

  const validityStateRef = React.useRef<TState | null>(null);

  const emitValidityChange = (validity: TState) => {
    onValidityChange?.(validity);

    validityStateRef.current = validity;
  };

  const handleStateChange = (state: Parameters<TStateChangeEmitter>) => {
    onStateChange?.(state);

    const prevValidity = validityStateRef.current;
    const validity = validator(state, conditions);

    if (prevValidity && !hasValidityChanged(prevValidity, validity)) return;

    emitValidityChange(validity);
  };

  return handleStateChange as TStateChangeEmitter;
};

export default useValidityChangeEmitter;
