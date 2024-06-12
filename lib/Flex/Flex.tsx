import type {
  PolymorphicComponent,
  PolymorphicProps,
} from "@styleless-ui/react";
import * as React from "react";
import { generateClassesWithBreakpoints } from "../internals";
import type { CommonProps, PropWithBreakpoints } from "../types";
import { combineClasses as cls, componentWithForwardedRef } from "../utils";
import classes from "./Flex.module.css";
import * as Slots from "./slots";

type OwnProps = Pick<CommonProps, "children" | "className"> & {
  /**
   * The variant of the flex-box.
   *
   * @default "block"
   */
  variant?: PropWithBreakpoints<"block" | "inline">;
  /**
   * Changes how flex-items wrap in the flex-box.
   */
  wrapMode?: PropWithBreakpoints<"nowrap" | "wrap" | "wrap-reverse">;
  /**
   * Sets the gap between flex-items in the flex-box.
   */
  gap?: PropWithBreakpoints<"xxs" | "xs" | "sm" | "md" | "lg" | "xlg">;
  /**
   * Sets the direction of flex-items in the flex-box.
   */
  direction?: PropWithBreakpoints<
    "row" | "column" | "row-reverse" | "column-reverse"
  >;
  /**
   * Defines how the browser distributes space between and around content items
   * along the main-axis of the flex-box.
   */
  justifyContent?: PropWithBreakpoints<
    "start" | "end" | "center" | "between" | "around" | "evenly"
  >;
  /**
   * Controls the alignment of flex-items on the cross-axis in the flex-box.
   */
  alignItems?: PropWithBreakpoints<
    "start" | "end" | "center" | "baseline" | "stretch"
  >;
  /**
   * Sets the distribution of space between and around content items
   * along the cross-axis of the flex-box.
   *
   * (Note: This property has no effect on single rows of flex-items.)
   */
  alignContent?: PropWithBreakpoints<
    "start" | "end" | "center" | "between" | "around" | "evenly" | "stretch"
  >;
};

export type Props<E extends React.ElementType = "div"> = PolymorphicProps<
  E,
  OwnProps
>;

const FlexBase = <
  E extends React.ElementType = "div",
  R extends HTMLElement = HTMLDivElement,
>(
  props: Props<E>,
  ref: React.Ref<R>,
) => {
  const {
    className,
    children,
    wrapMode,
    gap,
    direction,
    justifyContent,
    alignItems,
    alignContent,
    as: RootNode = "div",
    variant = "block",
    ...otherProps
  } = props as Props<"div">;

  return (
    <RootNode
      {...otherProps}
      ref={ref as React.Ref<HTMLDivElement>}
      data-slot={Slots.Root}
      className={cls(
        className,
        classes.root,
        generateClassesWithBreakpoints(classes, "root", "variant", variant),
        generateClassesWithBreakpoints(classes, "root", "wrap", wrapMode),
        generateClassesWithBreakpoints(classes, "root", "gap", gap),
        generateClassesWithBreakpoints(classes, "root", "direction", direction),
        generateClassesWithBreakpoints(
          classes,
          "root",
          "justify",
          justifyContent,
        ),
        generateClassesWithBreakpoints(classes, "root", "align", alignItems),
        generateClassesWithBreakpoints(
          classes,
          "root",
          "content",
          alignContent,
        ),
      )}
    >
      {children}
    </RootNode>
  );
};

const Flex: PolymorphicComponent<"div", OwnProps> = componentWithForwardedRef(
  FlexBase,
  "Flex.Container",
);

export default Flex;
