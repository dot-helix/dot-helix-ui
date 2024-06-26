/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { MergeElementProps } from "@styleless-ui/react";
import { setRef, useDeterministicId } from "@styleless-ui/react/utils";
import * as React from "react";
import type { CommonProps } from "../types";
import { combineClasses as cls, componentWithForwardedRef } from "../utils";
import classes from "./Badge.module.css";
import * as Slots from "./slots";
import { getValidChild } from "./utils";

type OwnProps = Pick<CommonProps, "color"> & {
  /**
   * The className applied to the parent of the relative badge.
   */
  wrapperClassName?: string;
  /**
   * The className applied to the badge itself.
   */
  className?: string;
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
  text?: string;
};

export type Props = Omit<
  MergeElementProps<"span", OwnProps>,
  "defaultChecked" | "checked" | "value" | "defaultValue"
>;

const BadgeBase = (props: Props, ref: React.Ref<HTMLSpanElement>) => {
  const {
    id: idProp,
    wrapperClassName,
    className,
    children,
    text,
    visible = true,
    childShape = "rectangular",
    color = "neutral",
    ...otherProps
  } = props;

  const id = useDeterministicId(idProp, "hui-badge-scope");

  const child = children
    ? (getValidChild(children) as React.ReactElement<
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Record<keyof any, unknown>
      >)
    : null;

  const isStandalone = child == null;
  const variant: "dot" | "standard" =
    text == null || text.length === 0 ? "dot" : "standard";

  const childRefCallback = React.useCallback(
    (node: HTMLElement | null) => {
      if (!child) return;

      setRef(child.props.ref as React.Ref<HTMLElement>, node);

      if (!node) return;

      let describedBy = node.getAttribute("aria-describedby");

      if (describedBy) {
        if (describedBy.includes(id)) return;

        describedBy = `${id} ` + describedBy;
      } else describedBy = id;

      node.setAttribute("aria-describedby", describedBy);
    },
    [child, id],
  );

  const createStandaloneBadge = () => (
    <span
      {...otherProps}
      id={id}
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
      {text}
    </span>
  );

  if (isStandalone) return createStandaloneBadge();

  return (
    <div
      data-slot={Slots.Wrapper}
      className={cls(wrapperClassName, classes["wrapper"])}
    >
      {createStandaloneBadge()}
      {React.cloneElement(child, {
        ref: childRefCallback,
      })}
    </div>
  );
};

const Badge = componentWithForwardedRef(BadgeBase, "Badge");

export default Badge;
