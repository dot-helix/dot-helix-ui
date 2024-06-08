import type { MergeElementProps } from "@styleless-ui/react";
import * as React from "react";
import type { CommonProps } from "../types";
import { combineClasses as cls, componentWithForwardedRef } from "../utils";
import classes from "./InlineAlert.module.css";
import * as Slots from "./slots";

type OwnProps = Pick<CommonProps, "className" | "color"> & {
  /**
   * If `true`, the alert will be visible.
   */
  visible?: boolean;
  /**
   * The subject of the alert.
   */
  subject: string;
  /**
   * The description of the subject.
   */
  description: string;
};

export type Props = Omit<MergeElementProps<"div", OwnProps>, "children">;

const InlineAlertBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    className,
    subject,
    description,
    color = "neutral",
    visible = false,
    ...otherProps
  } = props;

  if (!visible) return null;

  return (
    <div
      {...otherProps}
      role="alert"
      data-color={color}
      data-visible=""
      data-slot={Slots.Root}
      ref={ref}
      className={cls(className, classes.root, classes[`root--${color}`])}
    >
      <strong
        data-slot={Slots.Subject}
        className={classes.subject}
      >
        {subject}
      </strong>
      <p
        data-slot={Slots.Description}
        className={classes.description}
      >
        {description}
      </p>
    </div>
  );
};

const InlineAlert = componentWithForwardedRef(InlineAlertBase, "InlineAlert");

export default InlineAlert;
