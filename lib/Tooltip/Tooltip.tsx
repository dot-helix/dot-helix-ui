import {
  Tooltip as StylelessTooltip,
  type MergeElementProps,
  type TooltipProps,
} from "@styleless-ui/react";
import { setRef, useEventCallback } from "@styleless-ui/react/utils";
import cls from "classnames";
import * as React from "react";
import type { CommonProps } from "../types";
import { componentWithForwardedRef } from "../utils";
import classes from "./Tooltip.module.css";

type OwnProps = Pick<
  TooltipProps,
  | "resolveAnchor"
  | "placement"
  | "autoPlacement"
  | "behavior"
  | "open"
  | "defaultOpen"
  | "onOutsideClick"
> &
  Pick<CommonProps, "className"> & {
    /**
     * The text of the tooltip.
     */
    text: string;
  };

export type Props = Omit<
  MergeElementProps<"div", OwnProps>,
  | "value"
  | "defaultValue"
  | "checked"
  | "defaultChecked"
  | "children"
  | "content"
  | "color"
>;

const TooltipBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, text, ...otherProps } = props;

  const [keepMounted, setKeepMounted] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  const handleTransitionEnd = useEventCallback<
    React.TransitionEvent<HTMLDivElement>
  >(event => {
    if (event.propertyName !== "visibility") return;

    const root = event.currentTarget as HTMLDivElement;
    const isOpen = root.hasAttribute("data-open");

    if (!isOpen) setKeepMounted(false);
    else setKeepMounted(true);
  });

  const refCallback = React.useCallback(
    (node: HTMLDivElement | null) => {
      setRef(ref, node);

      if (!node) return;

      const isOpen = node.hasAttribute("data-open");

      if (isOpen) setIsVisible(true);
      else setIsVisible(false);
    },
    [ref],
  );

  return (
    <StylelessTooltip
      {...otherProps}
      keepMounted={keepMounted}
      ref={refCallback}
      onTransitionEnd={handleTransitionEnd}
      className={({ open, placement }) =>
        cls(className, classes.root, classes[`root--${placement}`], {
          [classes[`root--open`]!]: open,
          [classes["root--visible"]!]: isVisible,
        })
      }
    >
      {text}
    </StylelessTooltip>
  );
};

const Tooltip = componentWithForwardedRef(TooltipBase, "Tooltip");

export default Tooltip;
