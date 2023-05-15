/* eslint-disable @typescript-eslint/no-non-null-assertion */
import cls from "classnames";
import * as React from "react";
import classes from "./Badge.module.css";

interface OwnProps {
  /**
   * The className applied to the parent of the relative badge.
   */
  relativeParentClassName?: string;
  /**
   * The className applied to the badge itself.
   */
  className?: string;
  /**
   * The color of the badge.
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
   */
  children?: JSX.Element;
  /**
   * The shape of the child the badge will be wrapped around.
   *
   * Set this for better positioning.
   * * @default "rectangular"
   */
  childShape?: "rectangular" | "circular";
  /**
   * If `true`, the badge will be visible.
   * @default true
   */
  visible?: boolean;
  /**
   * The text content of the badge, when `variant="standard"`.
   */
  text?: string;
}

export type Props = Omit<
  React.ComponentPropsWithRef<"span">,
  keyof OwnProps | "defaultValue" | "defaultChecked"
> &
  OwnProps;

const getValidChild = (children: JSX.Element) => {
  try {
    if (!React.isValidElement(children)) throw 0;
    return React.Children.only(children) as React.FunctionComponentElement<
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Record<keyof any, unknown>
    >;
  } catch {
    throw new Error(
      "[Badge]: The `children` prop has to be a single valid element.",
    );
  }
};

const BadgeBase = (props: Props, ref: React.Ref<HTMLSpanElement>) => {
  const {
    relativeParentClassName,
    className,
    children,
    text,
    visible = true,
    childShape = "rectangular",
    color = "neutral",
    ...otherProps
  } = props;

  const child = children ? getValidChild(children) : null;

  const isStandalone = child == null;
  const variant: "dot" | "standard" =
    text == null || text.length === 0 ? "dot" : "standard";

  const createRelativeBadge = () => (
    <div
      data-slot="Badge:RelativeRoot"
      className={cls(relativeParentClassName, classes["relative-root"])}
    >
      {createStandaloneBadge()}
      {child}
    </div>
  );

  const createStandaloneBadge = () => (
    <span
      {...otherProps}
      // @ts-expect-error React hasn't added `inert` yet
      inert={!visible ? "" : undefined}
      data-slot="Badge:Root"
      ref={ref}
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

  return isStandalone ? createStandaloneBadge() : createRelativeBadge();
};

const Badge = React.forwardRef(BadgeBase) as typeof BadgeBase;

export default Badge;
