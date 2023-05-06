/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Tooltip as StylelessTooltip, TooltipProps } from "@styleless-ui/react";
import cls from "classnames";
import * as React from "react";
import classes from "./Tooltip.module.css";

type OwnProps = Pick<
  TooltipProps,
  | "placement"
  | "autoPlacement"
  | "behavior"
  | "open"
  | "defaultOpen"
  | "onOutsideClick"
> & {
  /**
   * The className applied to the component.
   */
  className?: string;
  /**
   * The text of the tooltip.
   */
  text: string;
  /**
   * The anchor element for the tooltip.
   * It's either HTMLElement RefObject, HTMLElement or query selector.
   */
  anchorElement: React.RefObject<HTMLElement> | HTMLElement | string;
};

export type Props = Omit<
  React.ComponentPropsWithRef<"div">,
  | keyof OwnProps
  | "defaultValue"
  | "defaultChecked"
  | "children"
  | "content"
  | "placeholder"
> &
  OwnProps;

const TooltipBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, anchorElement, text, ...otherProps } = props;

  return (
    <StylelessTooltip
      {...otherProps}
      ref={ref}
      anchorElement={anchorElement}
      className={({ openState, placement }) =>
        cls(className, classes.root, classes[`root--${placement}`], {
          [classes[`root--open`]!]: openState,
        })
      }
    >
      {text}
    </StylelessTooltip>
  );
};

const Tooltip = React.forwardRef(TooltipBase) as typeof TooltipBase;

export default Tooltip;
