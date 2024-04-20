/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Button as StylelessButton,
  type PolymorphicProps,
} from "@styleless-ui/react";
import cls from "classnames";
import * as React from "react";
import LoadingIndicator from "../LoadingIndicator";
import { useTokensClient } from "../systems";
import type { CommonProps } from "../types";
import { componentWithForwardedRef } from "../utils";
import classes from "./Button.module.css";
import * as Slots from "./slots";

type OwnProps = Pick<CommonProps, "className"> & {
  /**
   * If `true`, the component will be disabled.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the button will have a loading indicator.
   *
   * @default false
   */
  loading?: boolean;
  /**
   * The size of the button.
   *
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
  /**
   * The color of the button.
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
  /**
   * The variant of the button.
   *
   * @default "filled"
   */
  variant?: "filled" | "outlined" | "inlined";
  /**
   * The content of the button.
   */
  text: string;
  /**
   * The start icon element placed before the text.
   */
  startIcon?: React.ReactNode;
  /**
   * The end icon element placed after the text.
   */
  endIcon?: React.ReactNode;
};

export type Props<E extends React.ElementType = "button"> = Omit<
  PolymorphicProps<E, OwnProps>,
  "children" | "value" | "defaultValue" | "checked" | "defaultChecked"
>;

const ButtonBase = <
  E extends React.ElementType = "button",
  R extends HTMLElement = HTMLButtonElement,
>(
  props: Props<E>,
  ref: React.Ref<R>,
) => {
  const polymorphicProps = props as Props<"button">;

  const {
    className,
    text,
    startIcon,
    endIcon,
    as = "button",
    size = "medium",
    variant = "filled",
    color = "neutral",
    loading = false,
    disabled = false,
    ...otherProps
  } = polymorphicProps;

  const { useDirection } = useTokensClient();

  const direcrion = useDirection();

  const renderContent = () => {
    if (loading) {
      return (
        <LoadingIndicator
          label={{ screenReaderLabel: "Waiting for the button" }}
          className={classes["loading-indicator"]}
          data-slot={Slots.LoadingIndicator}
        />
      );
    }

    const renderStartIcon = () => {
      if (!startIcon) return null;

      return (
        <div
          aria-hidden="true"
          className={cls(classes.icon, classes["icon--start"])}
          data-slot={Slots.StartIcon}
        >
          {startIcon}
        </div>
      );
    };

    const renderEndIcon = () => {
      if (!endIcon) return null;

      return (
        <div
          aria-hidden="true"
          className={cls(classes.icon, classes["icon--end"])}
          data-slot={Slots.EndIcon}
        >
          {endIcon}
        </div>
      );
    };

    return (
      <>
        {renderStartIcon()}
        <span
          className={classes.text}
          data-slot={Slots.Text}
        >
          {text}
        </span>
        {renderEndIcon()}
      </>
    );
  };

  return (
    <StylelessButton
      {...otherProps}
      as={as}
      disabled={disabled || loading}
      ref={ref as React.Ref<HTMLButtonElement>}
      aria-label={loading ? text : undefined}
      data-loading={loading ? "" : undefined}
      data-variant={variant}
      data-size={size}
      data-color={color}
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
            [classes["root--focus-visible"]!]: focusedVisible,
          },
        )
      }
    >
      {renderContent()}
    </StylelessButton>
  );
};

type PolymorphicButton = <E extends React.ElementType = "button">(
  props: Props<E>,
) => React.ReactNode;

const Button: PolymorphicButton = componentWithForwardedRef(
  ButtonBase,
  "Button",
);

export default Button;
