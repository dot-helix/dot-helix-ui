import cls from "classnames";
import * as React from "react";
import classes from "./Icon.module.css";

interface OwnProps {
  /**
   * The className applied to the component.
   */
  className?: string;
  /**
   * The `d` attribute of the path element.
   */
  pathData: string;
  /**
   * The viewBox of the SVG.
   * @default "0 0 24 24"
   */
  viewBox?: string;
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  title?: string;
  /**
   * The size of the icon.
   * If set to `"auto"`, the icon will get the parent's width and height.
   * @default "auto"
   */
  size?: number | "auto";
  /**
   * The color of the icon.
   * @default "inherit"
   */
  color?:
    | "inherit"
    | "neutral-text-normal"
    | "neutral-text-inverted"
    | "neutral-text-secondary"
    | "neutral-text-tertiary"
    | "neutral-text-quaternary"
    | "neutral-text-disabled"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "info";
}

export type Props = Omit<React.ComponentPropsWithRef<"svg">, keyof OwnProps> &
  OwnProps;

const IconBase = (props: Props, ref: React.Ref<SVGSVGElement>) => {
  const {
    style: styleProp,
    className,
    pathData,
    title,
    viewBox = "0 0 24 24",
    size = "auto",
    color = "inherit",
    ...otherProps
  } = props;

  const sizeStyle: React.CSSProperties =
    size === "auto"
      ? { width: "100%", height: "100%" }
      : {
          width: `${size / 16}rem`,
          height: `${size / 16}rem`,
          minWidth: `${size / 16}rem`,
          minHeight: `${size / 16}rem`
        };

  const style: React.CSSProperties = { ...styleProp, ...sizeStyle };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cls(className, classes.root, classes[`root--${color}`])}
      viewBox={viewBox}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      focusable="false"
      style={style}
      ref={ref}
      {...otherProps}
    >
      {title && <title>{title}</title>}
      <path d={pathData} />
    </svg>
  );
};

const Icon = React.forwardRef(IconBase) as typeof IconBase;

export default Icon;
