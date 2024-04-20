import type { MergeElementProps } from "@styleless-ui/react";
import { useEventCallback } from "@styleless-ui/react/utils";
import cls from "classnames";
import * as React from "react";
import type { CommonProps } from "../types";
import { componentWithForwardedRef } from "../utils";
import classes from "./Label.module.css";
import * as Slots from "./slots";

type OwnProps = Pick<CommonProps, "children" | "className"> & {
  /**
   * The id of the target element.
   */
  targetId: string;
  /**
   * If provided, indicates the type of impact on the target element upon click
   */
  impactOnTarget?: "focus" | "click";
  /**
   * If `true`, will display `*` at the the end of the label
   * to indicate the required state of the target.
   *
   * @default false
   */
  requiredIndication?: boolean;
};

export type Props = MergeElementProps<"label", OwnProps>;

const LabelBase = (props: Props, ref: React.Ref<HTMLLabelElement>) => {
  const {
    className,
    children,
    targetId,
    impactOnTarget,
    onClick,
    requiredIndication = false,
    ...otherProps
  } = props;

  const handleClick = useEventCallback<React.MouseEvent<HTMLLabelElement>>(
    event => {
      onClick?.(event);

      if (!impactOnTarget) return;
      if (event.isDefaultPrevented()) return;

      const target = document.getElementById(targetId);

      if (!target) return;

      if (impactOnTarget === "focus") target.focus();
      target.click();
    },
  );

  const renderRequiredIndicator = () => {
    if (requiredIndication) return null;

    return (
      <span
        data-slot={Slots.RequiredIndicator}
        className={classes["required-indicator"]}
      >
        *
      </span>
    );
  };

  return (
    <label
      {...otherProps}
      className={cls(className, classes.root)}
      htmlFor={targetId}
      ref={ref}
      onClick={handleClick}
      data-slot={Slots.Root}
      data-impact={impactOnTarget}
    >
      {children}
      {renderRequiredIndicator()}
    </label>
  );
};

const Label = componentWithForwardedRef(LabelBase, "Label");

export default Label;
