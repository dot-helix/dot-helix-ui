import type { MergeElementProps } from "@styleless-ui/react";
import { useEventCallback } from "@styleless-ui/react/utils";
import * as React from "react";
import type { CommonProps } from "../types";
import { componentWithForwardedRef } from "../utils";

type OwnProps = Pick<CommonProps, "children" | "className"> & {
  /**
   * The id of the target element.
   */
  targetId: string;
  /**
   * If provided, indicates the type of impact on the target element upon click
   */
  impactOnTarget?: "focus" | "click";
};

export type Props = MergeElementProps<"label", OwnProps>;

const LabelBase = (props: Props, ref: React.Ref<HTMLLabelElement>) => {
  const {
    className,
    children,
    targetId,
    impactOnTarget,
    onClick,
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

  return (
    <label
      {...otherProps}
      htmlFor={targetId}
      ref={ref}
      className={className}
      onClick={handleClick}
    >
      {children}
    </label>
  );
};

const Label = componentWithForwardedRef(LabelBase, "Label");

export default Label;
