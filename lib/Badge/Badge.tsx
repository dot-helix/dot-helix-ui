/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { MergeElementProps } from "@styleless-ui/react";
import cls from "classnames";
import * as React from "react";
import { componentWithForwardedRef } from "../utils";
import classes from "./Badge.module.css";
import * as Slots from "./slots";
import { getValidChild } from "./utils";

type OwnProps = {
  /**
   * The className applied to the parent of the relative badge.
   */
  wrapperClassName?: string;
  /**
   * The className applied to the badge itself.
   */
  className?: string;
  /**
   * The color of the badge.
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
   * The badge will be added relative to this node.
   * If omitted, the badge renders as a standalone component.
   */
  children?: JSX.Element;
  /**
   * The shape of the child the badge will be wrapped around.
   * Set this for better positioning.
   *
   * * @default "rectangular"
   */
  childShape?: "rectangular" | "circular";
  /**
   * If `true`, the badge will be visible.
   *
   * @default true
   */
  visible?: boolean;
  /**
   * The text content of the badge.
   * If it's omitted or empty, the badge appears as a dot.
   */
  content?: string;
};

export type Props = Omit<
  MergeElementProps<"span", OwnProps>,
  "defaultChecked" | "checked" | "value" | "defaultValue"
>;

const BadgeBase = (props: Props, ref: React.Ref<HTMLSpanElement>) => {
  const {
    wrapperClassName,
    className,
    children,
    content,
    visible = true,
    childShape = "rectangular",
    color = "neutral",
    ...otherProps
  } = props;

  const child = children ? getValidChild(children) : null;

  const isStandalone = child == null;
  const variant: "dot" | "standard" =
    content == null || content.length === 0 ? "dot" : "standard";

  const createStandaloneBadge = () => (
    <span
      {...otherProps}
      // @ts-expect-error React hasn't added `inert` yet
      inert={!visible ? "" : undefined}
      ref={ref}
      aria-hidden={!visible}
      data-slot={Slots.Root}
      data-variant={variant}
      data-color={color}
      data-hidden={visible ? undefined : ""}
      data-child-shape={childShape}
      className={cls(
        className,
        classes.root,
        classes[`root--${color}`],
        classes[`root--${variant}`],
        classes[`root--${childShape}-child`],
        { [classes[`root--hidden`]!]: !visible },
      )}
    >
      {content}
    </span>
  );

  if (isStandalone) return createStandaloneBadge();

  return (
    <div
      data-slot={Slots.Wrapper}
      className={cls(wrapperClassName, classes["wrapper"])}
    >
      {createStandaloneBadge()}
      {child}
    </div>
  );
};

const Badge = componentWithForwardedRef(BadgeBase, "Badge");

export default Badge;
