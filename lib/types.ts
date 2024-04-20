/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

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
   * If `true`, the component will visually indicate a required state.
   *
   * Please note that this is only a visual feedback
   * and doesn't actually display any error message.
   *
   * @default false
   */
  required?: boolean;
  /**
   * The visible label text of the component.
   */
  label: string;
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
