/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button as StylelessButton } from "@styleless-ui/react";
import type { PolymorphicProps } from "@styleless-ui/react/typings";
import cls from "classnames";
import * as React from "react";
import classes from "../Button/Button.module.css";
import { useTheme } from "../configuration";
import LoadingIndicator from "../LoadingIndicator";

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
   * The label of the button.
   */
  label:
    | {
        /**
         * Identifies the element (or elements) that labels the component.
         *
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby MDN Web Docs} for more information.
         */
        labelledBy: string;
      }
    | {
        /**
         * The label to use as `aria-label` property.
         */
        screenReaderLabel: string;
      };
  /**
   * The icon element.
   */
  icon?: React.ReactNode;
}

export type Props<E extends React.ElementType> = PolymorphicProps<E, OwnProps>;

const ButtonBase = <E extends React.ElementType, R extends HTMLElement>(
  props: Props<E>,
  ref: React.Ref<R>
) => {
  const {
    as,
    label,
    className,
    icon,
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
          classes["root--icon-button"],
          {
            [classes["root--disabled"]!]: disabled,
            [classes["root--loading"]!]: loading,
            [classes["root--focus-visible"]!]: focusedVisible
          }
        )
      }
      aria-labelledby={"labelledBy" in label ? label.labelledBy : undefined}
      aria-label={
        "screenReaderLabel" in label ? label.screenReaderLabel : undefined
      }
    >
      {loading ? (
        <LoadingIndicator className={classes["loading-indicator"]} />
      ) : (
        <div className={classes.icon}>{icon}</div>
      )}
    </StylelessButton>
  );
};

const Button = React.forwardRef(ButtonBase) as typeof ButtonBase;

export default Button;
