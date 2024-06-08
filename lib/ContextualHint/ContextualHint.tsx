import {
  Button as StylelessButton,
  type MergeElementProps,
} from "@styleless-ui/react";
import { contains, setRef, useEventCallback } from "@styleless-ui/react/utils";
import * as React from "react";
import { InfoIcon } from "../internals";
import type { CommonProps } from "../types";
import {
  combineClasses as cls,
  componentWithForwardedRef,
  useFocusWithin,
} from "../utils";
import classes from "./ContextualHint.module.css";
import * as Slots from "./slots";
import { calcSidePlacement } from "./utils";

type OwnProps = Pick<CommonProps, "className" | "children"> & {
  /**
   * The label of the component.
   */
  label:
    | {
        /**
         * The label to use as `aria-label` property.
         */
        screenReaderLabel: string;
      }
    | {
        /**
         * Identifies the element (or elements) that labels the component.
         *
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby MDN Web Docs} for more information.
         */
        labelledBy: string;
      };
};

export type Props = MergeElementProps<"div", OwnProps>;

const ContextualHintBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, children, label, onFocus, onBlur, ...otherProps } = props;

  const [isOpen, setIsOpen] = React.useState(false);
  const [side, setSide] = React.useState<"top" | "bottom">("top");
  const [keepContentMounted, setKeepContentMounted] = React.useState(false);

  const focusWithin = useFocusWithin();

  const labelProps: Partial<Record<"aria-label" | "aria-labelledby", string>> =
    {};

  if ("screenReaderLabel" in label) {
    labelProps["aria-label"] = label.screenReaderLabel;
  } else {
    labelProps["aria-labelledby"] = label.labelledBy;
  }

  const handleTransitionEnd = useEventCallback<
    React.TransitionEvent<HTMLDivElement>
  >(event => {
    if (event.propertyName !== "visibility") return;

    if (!isOpen) setKeepContentMounted(false);
    else setKeepContentMounted(true);
  });

  const handleFocus = useEventCallback<React.FocusEvent<HTMLDivElement>>(
    event => {
      onFocus?.(event);
      focusWithin.handleFocus(event);
    },
  );

  const handleBlur = useEventCallback<React.FocusEvent<HTMLDivElement>>(
    event => {
      onBlur?.(event);
      focusWithin.handleBlur(event);
    },
  );

  const handleClick = useEventCallback<React.MouseEvent>(event => {
    const target = event.target as HTMLElement;
    const currentTarget = event.currentTarget as HTMLElement;

    const content = currentTarget.querySelector<HTMLElement>("[role='status']");

    if (!content) return;

    if (
      target !== currentTarget &&
      (target === content || contains(content, target))
    ) {
      return;
    }

    setIsOpen(o => !o);
  });

  const refCallback = (node: HTMLDivElement | null) => {
    setRef(ref, node);

    if (!node) return;

    if (!focusWithin.isFocusWithin) setIsOpen(false);

    const content = node.querySelector<HTMLElement>("[role='status']");

    if (!content) return;

    setSide(calcSidePlacement(node, content));
  };

  const contentStyle: React.CSSProperties = {};

  if (side === "bottom") contentStyle.top = "100%";
  else contentStyle.bottom = "100%";

  return (
    <StylelessButton
      {...otherProps}
      {...labelProps}
      as="div"
      ref={refCallback}
      data-open={isOpen ? "" : undefined}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onTransitionEnd={handleTransitionEnd}
      className={({ focusedVisible }) =>
        cls(className, classes.root, {
          [classes["root--open"]!]: isOpen,
          [classes["root--focus-visible"]!]: focusedVisible,
        })
      }
    >
      <div
        aria-hidden="true"
        data-slot={Slots.Icon}
        className={classes.icon}
      >
        {<InfoIcon />}
      </div>
      <div
        role="status"
        data-slot={Slots.Content}
        style={contentStyle}
        className={classes.content}
      >
        {keepContentMounted || isOpen ? <>{children}</> : null}
      </div>
    </StylelessButton>
  );
};

const ContextualHint = componentWithForwardedRef(
  ContextualHintBase,
  "ContextualHint",
);

export default ContextualHint;
