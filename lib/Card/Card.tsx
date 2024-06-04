import type { MergeElementProps } from "@styleless-ui/react";
import * as React from "react";
import type { CommonProps } from "../types";
import {
  combineClasses as cls,
  componentWithForwardedRef,
  useDeterministicId,
} from "../utils";
import classes from "./Card.module.css";
import { CardContext } from "./Context";
import * as Slots from "./slots";

type OwnProps = Pick<CommonProps, "children" | "className"> & {
  /**
   * If `true`, the card will have hover effect.
   *
   * @default false
   */
  hoverable?: boolean;
  /**
   * If `true`, the card will display smaller.
   *
   * @default false
   */
  smaller?: boolean;
};

export type Props = MergeElementProps<"div", OwnProps>;

const CardBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    id: idProp,
    className,
    children,
    smaller = false,
    hoverable = false,
    ...otherProps
  } = props;

  const scopeId = useDeterministicId(idProp, "hui-card-scope");
  const titleId = `${scopeId}__title`;
  const subtitleId = `${scopeId}__sub-title`;

  return (
    <div
      {...otherProps}
      ref={ref}
      data-slot={Slots.Root}
      data-smaller={smaller ? "" : undefined}
      data-hoverable={hoverable ? "" : undefined}
      className={cls(className, classes.root, {
        [classes["root--hoverable"]!]: hoverable,
        [classes["root--smaller"]!]: smaller,
      })}
    >
      <CardContext.Provider value={{ scopeId, subtitleId, titleId, smaller }}>
        {children}
      </CardContext.Provider>
    </div>
  );
};

const Card = componentWithForwardedRef(CardBase, "Card");

export default Card;
