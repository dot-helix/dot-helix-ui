/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Button as StylelessButton,
  type PolymorphicProps,
} from "@styleless-ui/react";
import * as React from "react";
import type { ButtonProps } from "../Button";
import classes from "../Button/Button.module.css";
import * as Slots from "../Button/slots";
import LoadingIndicator from "../LoadingIndicator";
import { Logger } from "../internals";
import { useTokensClient } from "../systems";
import { combineClasses as cls, componentWithForwardedRef } from "../utils";

type OwnProps = Pick<
  ButtonProps<"button">,
  "className" | "disabled" | "loading" | "size" | "color" | "variant"
> & {
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
  icon: React.ReactNode;
};

export type Props<E extends React.ElementType> = PolymorphicProps<E, OwnProps>;

// TODO: Find a solution to omit props in polymorphic components
// export type Props<E extends React.ElementType> = Omit<
//   PolymorphicProps<E, OwnProps>,
//   "children"
// >;

const IconButtonBase = <
  E extends React.ElementType,
  R extends HTMLElement = HTMLButtonElement,
>(
  props: Props<E>,
  ref: React.Ref<R>,
) => {
  const polymorphicProps = props as Props<"button">;

  const {
    children,
    className,
    label,
    icon,
    tabIndex,
    as = "button",
    size = "medium",
    variant = "filled",
    color = "neutral",
    loading = false,
    disabled = false,
    ...otherProps
  } = polymorphicProps;

  const { direction } = useTokensClient();

  if (children) {
    Logger.devOnly.log(
      "Button component doesn't expect a `children` prop.",
      "warn",
      "IconButton",
    );
  }

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

    return (
      <div
        aria-hidden="true"
        className={classes.icon}
        data-slot={Slots.Icon}
      >
        {icon}
      </div>
    );
  };

  return (
    <StylelessButton
      {...otherProps}
      as={as}
      overrideTabIndex={tabIndex}
      disabled={disabled || loading}
      ref={ref as React.Ref<HTMLButtonElement>}
      aria-labelledby={"labelledBy" in label ? label.labelledBy : undefined}
      aria-label={
        "screenReaderLabel" in label ? label.screenReaderLabel : undefined
      }
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
          classes[`root--${direction}`],
          classes["root--icon-button"],
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

type PolymorphicIconButton = <E extends React.ElementType = "button">(
  props: Props<E>,
) => React.ReactNode;

const IconButton: PolymorphicIconButton = componentWithForwardedRef(
  IconButtonBase,
  "IconButton",
);

export default IconButton;
