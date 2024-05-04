import type {
  PolymorphicComponent,
  PolymorphicProps,
} from "@styleless-ui/react";
import * as React from "react";
import type { CommonProps } from "../types";
import { combineClasses as cls, componentWithForwardedRef } from "../utils";
import classes from "./Text.module.css";

type OwnProps = Pick<CommonProps, "className" | "children"> & {
  /**
   * Applies the theme typography styles.
   */
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subheading1"
    | "subheading2"
    | "body1"
    | "body2"
    | "caption";
  /**
   * The color of the text.
   *
   * @default "current"
   */
  color?:
    | "current"
    | "neutral-normal"
    | "neutral-inverted"
    | "neutral-secondary"
    | "neutral-tertiary"
    | "neutral-quaternary"
    | "neutral-disabled"
    | "primary"
    | "secondary"
    | "error"
    | "success"
    | "warning"
    | "info";
  /**
   * Set the text-align on the text.
   */
  align?: "left" | "center" | "right" | "justify" | "start" | "end";
  /**
   * Set the font-weight on the text.
   */
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  /**
   * Set the display on the text.
   */
  display?: "inline" | "block" | "inline-block";
  /**
   * Set the text-overflow on the text.
   *
   * @default "ellipsis"
   */
  textOverflow?: "clip" | "ellipsis";
  /**
   * If `true`, the text will not wrap,
   * but instead will truncate or clip based on the `textOverflow` prop provided.
   *
   * Note that text overflow can only happen
   * when the element has a width in order to overflow.
   * ('block', 'inline-block')
   *
   * @default false
   */
  noWrap?: boolean;
};

export type Props<E extends React.ElementType = "span"> = PolymorphicProps<
  E,
  OwnProps
>;

const TextBase = <
  E extends React.ElementType = "span",
  R extends HTMLElement = HTMLSpanElement,
>(
  props: Props<E>,
  ref: React.Ref<R>,
) => {
  const {
    className,
    children,
    variant,
    align,
    weight,
    display,
    as: RootNode = "span",
    color = "current",
    textOverflow = "ellipsis",
    noWrap = false,
    ...otherProps
  } = props as Props<"span">;

  return (
    <RootNode
      {...otherProps}
      ref={ref}
      data-color={color}
      data-variant={variant}
      data-text-overflow={textOverflow}
      data-nowrap={noWrap ? "" : undefined}
      data-align={align}
      data-weight={weight}
      data-display={display}
      className={cls(
        className,
        classes.root,
        classes[`root--${variant}`],
        classes[`root--${color}`],
        classes[`root--${textOverflow}`],
        {
          [classes[`root--no-wrap`]!]: noWrap,
          [classes[`root--align-${align!}`]!]: !!align,
          [classes[`root--weight-${weight!}`]!]: !!weight,
          [classes[`root--display-${display!}`]!]: !!display,
        },
      )}
    >
      {children}
    </RootNode>
  );
};

const Text: PolymorphicComponent<"span", OwnProps> = componentWithForwardedRef(
  TextBase,
  "Text",
);

export default Text;
