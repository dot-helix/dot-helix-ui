import {
  Toast as StylelessToast,
  type MergeElementProps,
} from "@styleless-ui/react";
import { setRef, useEventCallback } from "@styleless-ui/react/utils";
import * as React from "react";
import Button, { type ButtonProps } from "../Button";
import type { CommonProps } from "../types";
import { combineClasses as cls, componentWithForwardedRef } from "../utils";
import classes from "./Toast.module.css";
import * as Slots from "./slots";

type Action = Pick<
  ButtonProps<"button">,
  "text" | "endIcon" | "startIcon" | "disabled" | "loading" | "onClick"
>;

type OwnProps = Pick<
  StylelessToast.RootProps,
  "open" | "role" | "duration" | "onDurationEnd"
> &
  Pick<CommonProps, "className"> & {
    /**
     * The text content of the toast.
     */
    text: string;
    /**
     * The action button used in the toast.
     */
    action?: Action;
    /**
     * The placement of the toast.
     *
     * @default "bottom-center"
     */
    placement?:
      | "top-left"
      | "top-center"
      | "top-right"
      | "bottom-left"
      | "bottom-center"
      | "bottom-right";
  };

export type Props = Omit<
  MergeElementProps<"div", OwnProps>,
  | "children"
  | "onDurationChange"
  | "onDurationChangeCapture"
  | "placeholder"
  | "value"
  | "defaultValue"
  | "checked"
  | "defaultChecked"
  | "color"
>;

const ToastBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    className,
    action,
    text,
    open,
    placement = "bottom-center",
    ...otherProps
  } = props;

  const [keepMounted, setKeepMounted] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  const handleTransitionEnd = useEventCallback<
    React.TransitionEvent<HTMLDivElement>
  >(event => {
    if (event.propertyName !== "visibility") return;

    if (!open) setKeepMounted(false);
    else setKeepMounted(true);
  });

  const refCallback = React.useCallback(
    (node: HTMLDivElement | null) => {
      setRef(ref, node);

      if (!node) return;

      if (open) setIsVisible(true);
      else setIsVisible(false);
    },
    [open, ref],
  );

  const renderAction = () => {
    if (!action) return null;

    return (
      <StylelessToast.Action
        {...action}
        size="small"
        variant="inlined"
        as={Button<"button">}
      />
    );
  };

  return (
    <StylelessToast.Root
      {...otherProps}
      open={open}
      keepMounted={keepMounted}
      ref={refCallback}
      onTransitionEnd={handleTransitionEnd}
      className={({ open }) =>
        cls(className, classes.root, classes[`root--${placement}`], {
          [classes[`root--open`]!]: open,
          [classes["root--visible"]!]: isVisible,
        })
      }
    >
      <StylelessToast.Content className={classes.content}>
        <span
          className={classes.text}
          data-slot={Slots.Text}
        >
          {text}
        </span>
        {renderAction()}
      </StylelessToast.Content>
    </StylelessToast.Root>
  );
};

const Toast = componentWithForwardedRef(ToastBase, "Toast");

export default Toast;
