/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export type AnyObject = Record<keyof any, unknown>;
export type AnyFunction = (...args: any) => any;

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
};
