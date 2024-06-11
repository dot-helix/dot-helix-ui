/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import type ValidityReason from "./ValidityReason";
import type { BreakpointTokens } from "./systems/theming";

export type AnyObject = Record<keyof any, unknown>;
export type AnyFunction = (...args: any) => any;
export type AnyVoidFunction = (...args: any) => void;

export type EmptyObjectNotation = {};

export type CommonProps = {
  /**
   * The className applied to the component.
   */
  className?: string;
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * If `true`, the component will indicate an error state.
   *
   * @default false
   */
  hasError?: boolean;
  /**
   * If `true`, the component will be disabled.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * The visible text label of the component.
   */
  label: string;
  /**
   * The visible description of the component.
   */
  description?: string;
  /**
   * The feedback message of the component.
   * Opt-in this prop when you want to provide feedback on user input.
   */
  feedbackMessage?: string;
  /**
   * The size of the component.
   *
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
  /**
   * The color of the component.
   *
   * @default "neutral"
   */
  color?:
    | "neutral"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "info";
};

export type ValidityState =
  | { valid: true }
  | { valid: false; reason: ValidityReason };

export type PropWithBreakpoints<T> = T | { [P in keyof BreakpointTokens]?: T };
