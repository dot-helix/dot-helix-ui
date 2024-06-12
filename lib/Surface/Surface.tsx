import type {
  PolymorphicComponent,
  PolymorphicProps,
} from "@styleless-ui/react";
import * as React from "react";
import type { CommonProps } from "../types";
import { combineClasses as cls, componentWithForwardedRef } from "../utils";
import classes from "./Surface.module.css";
import * as Slots from "./slots";

type OwnProps = Pick<CommonProps, "children" | "className"> & {
  /**
   * The elevation level of the component.
   *
   * @default "mid"
   */
  level: "low" | "mid" | "high";
};

export type Props<E extends React.ElementType = "div"> = PolymorphicProps<
  E,
  OwnProps
>;

const SurfaceBase = <
  E extends React.ElementType = "div",
  R extends HTMLElement = HTMLDivElement,
>(
  props: Props<E>,
  ref: React.Ref<R>,
) => {
  const {
    className,
    children,
    as: RootNode = "div",
    level = "mid",
    ...otherProps
  } = props as Props<"div">;

  return (
    <RootNode
      {...otherProps}
      ref={ref as React.Ref<HTMLDivElement>}
      data-slot={Slots.Root}
      data-level={level}
      className={cls(className, classes.root, classes[`root--${level}`])}
    >
      {children}
    </RootNode>
  );
};

const Surface: PolymorphicComponent<"div", OwnProps> =
  componentWithForwardedRef(SurfaceBase, "Surface");

export default Surface;
