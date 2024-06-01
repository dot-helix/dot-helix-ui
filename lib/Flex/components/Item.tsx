import type {
  PolymorphicComponent,
  PolymorphicProps,
} from "@styleless-ui/react";
import { componentWithForwardedRef } from "@styleless-ui/react/utils";
import * as React from "react";
import { generateClassesWithBreakpoints } from "../../internals";
import type { PropWithBreakpoints } from "../../types";
import { combineClasses as cls } from "../../utils";
import classes from "../Flex.module.css";
import * as Slots from "../slots";

type OwnProps = {
  /**
   * Sets the initial main size of the flex-item.
   * It sets the size of the content box unless otherwise set with `box-sizing`.
   */
  basis?: PropWithBreakpoints<"zero" | "auto" | "full">;
  /**
   * Sets the flex grow factor,
   * which specifies how much of the flex-container's remaining space
   * should be assigned to the flex-item's main size.
   */
  grow?: PropWithBreakpoints<0 | 1 | 2 | 3>;
  /**
   * Sets the flex shrink factor of the flex-item.
   * If the size of all flex-items is larger than the flex-container,
   * items shrink to fit according to this property.
   */
  shrink?: PropWithBreakpoints<0 | 1 | 2 | 3>;
  /**
   * Overrides the flex-item's `align-items` value.
   * It aligns the item on the cross-axis.
   */
  alignSelf?: PropWithBreakpoints<
    "auto" | "start" | "end" | "center" | "baseline" | "stretch"
  >;
  /**
   * Sets the logical block start margin of the item to `auto`.
   * This maps to a physical margin depending on the item's
   * writing mode, directionality, and text orientation.
   */
  autoMarginBlockStart?: PropWithBreakpoints<boolean>;
  /**
   * Sets the logical block end margin of the item to `auto`.
   * This maps to a physical margin depending on the item's
   * writing mode, directionality, and text orientation.
   */
  autoMarginBlockEnd?: PropWithBreakpoints<boolean>;
  /**
   * Sets the logical inline start margin of the item to `auto`.
   * This maps to a physical margin depending on the item's
   * writing mode, directionality, and text orientation.
   */
  autoMarginInlineStart?: PropWithBreakpoints<boolean>;
  /**
   * Sets the logical inline end margin of the item to `auto`.
   * This maps to a physical margin depending on the item's
   * writing mode, directionality, and text orientation.
   */
  autoMarginInlineEnd?: PropWithBreakpoints<boolean>;
};

export type Props<E extends React.ElementType = "div"> = PolymorphicProps<
  E,
  OwnProps
>;

const ItemBase = <
  E extends React.ElementType = "div",
  R extends HTMLElement = HTMLDivElement,
>(
  props: Props<E>,
  ref: React.Ref<R>,
) => {
  const {
    as: RootNode = "div",
    style: styleProp,
    className,
    basis,
    grow,
    shrink,
    alignSelf,
    autoMarginBlockStart,
    autoMarginBlockEnd,
    autoMarginInlineStart,
    autoMarginInlineEnd,
    ...otherProps
  } = props as Props<"div">;

  const style: React.CSSProperties = styleProp ?? {};

  return (
    <RootNode
      {...otherProps}
      style={style}
      ref={ref as React.Ref<HTMLDivElement>}
      data-slot={Slots.Item}
      className={cls(
        className,
        classes.item,
        generateClassesWithBreakpoints(classes, "item", "basis", basis),
        generateClassesWithBreakpoints(classes, "item", "grow", grow),
        generateClassesWithBreakpoints(classes, "item", "shrink", shrink),
        generateClassesWithBreakpoints(classes, "item", "align", alignSelf),
        generateClassesWithBreakpoints(
          classes,
          "item",
          "auto-mb-start",
          autoMarginBlockStart,
        ),
        generateClassesWithBreakpoints(
          classes,
          "item",
          "auto-mb-end",
          autoMarginBlockEnd,
        ),
        generateClassesWithBreakpoints(
          classes,
          "item",
          "auto-mi-start",
          autoMarginInlineStart,
        ),
        generateClassesWithBreakpoints(
          classes,
          "item",
          "auto-mi-end",
          autoMarginInlineEnd,
        ),
      )}
    />
  );
};

const Item: PolymorphicComponent<"div", OwnProps> = componentWithForwardedRef(
  ItemBase,
  "Flex.Item",
);

export default Item;
