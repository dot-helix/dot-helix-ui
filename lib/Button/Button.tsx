/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button as StylelessButton } from "@styleless-ui/react";
import type { PolymorphicProps } from "@styleless-ui/react/typings";
import cls from "classnames";
import * as React from "react";
import { useTheme } from "../configuration";
import LoadingIndicator from "../LoadingIndicator";
import classes from "./Button.module.css";

interface OwnProps {
  /**
   * The className applied to the component.
   */
  className?: string;
  /**
   * If `true`, the component will be disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the button will have a loading indicator.
   * @default false
   */
  loading?: boolean;
  /**
   * The size of the button.
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
  /**
   * The color of the button.
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
  /**
   * The variant of the button.
   * @default "filled"
   */
  variant?: "filled" | "outlined" | "inlined";
  /**
   * The content of the button.
   */
  text: string;
  /**
   * The leading icon element placed before the text.
   */
  leadingIcon?: React.ReactNode;
  /**
   * The trailing icon element placed after the text.
   */
  trailingIcon?: React.ReactNode;
}

export type Props<E extends React.ElementType> = PolymorphicProps<E, OwnProps>;

const ButtonBase = <E extends React.ElementType, R extends HTMLElement>(
  props: Props<E>,
  ref: React.Ref<R>
) => {
  const {
    as,
    text,
    className,
    leadingIcon,
    trailingIcon,
    size = "medium",
    variant = "filled",
    color = "neutral",
    loading = false,
    disabled = false,
    ...otherProps
  } = props as Props<"button">;

  const direcrion = useTheme().direction;

  return (
    <StylelessButton
      {...otherProps}
      as={as}
      disabled={disabled || loading}
      aria-label={loading ? text : undefined}
      ref={ref as React.Ref<HTMLButtonElement>}
      data-loading={loading ? "" : undefined}
      className={({ disabled, focusedVisible }) =>
        cls(
          className,
          classes.root,
          classes[`root--${size}`],
          classes[`root--${color}`],
          classes[`root--${variant}`],
          classes[`root--${direcrion}`],
          {
            [classes["root--disabled"]!]: disabled,
            [classes["root--loading"]!]: loading,
            [classes["root--focus-visible"]!]: focusedVisible
          }
        )
      }
    >
      {loading ? (
        <LoadingIndicator className={classes["loading-indicator"]} />
      ) : (
        <>
          {leadingIcon && (
            <div className={cls(classes.icon, classes["icon--leading"])}>
              {leadingIcon}
            </div>
          )}
          <span className={classes.text}>{text}</span>
          {trailingIcon && (
            <div className={cls(classes.icon, classes["icon--trailing"])}>
              {trailingIcon}
            </div>
          )}
        </>
      )}
    </StylelessButton>
  );
};

const Button = React.forwardRef(ButtonBase) as typeof ButtonBase;

export default Button;
