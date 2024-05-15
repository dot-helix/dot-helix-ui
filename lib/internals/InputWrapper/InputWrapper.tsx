import type { MergeElementProps } from "@styleless-ui/react";
import Label from "../../Label";
import type { CommonProps } from "../../types";
import {
  combineClasses as cls,
  useFocusWithin,
  type FocusWithinPredicateCallback,
} from "../../utils";
import classes from "./InputWrapper.module.css";
import * as Slots from "./slots";

type OwnProps = Pick<
  CommonProps,
  | "className"
  | "children"
  | "size"
  | "hasError"
  | "disabled"
  | "description"
  | "feedbackMessage"
  | "label"
> & {
  /**
   * The variant of the component.
   *
   * @default "outlined"
   */
  variant?: "outlined" | "filled";
  /**
   * If `true`, the label will be hidden.
   *
   * @default false
   */
  hideLabel?: boolean;
  /**
   * If `true`, it will display `*` at the the end of the label
   * to indicate the required state of the target.
   *
   * @default false
   */
  required?: boolean;
  /**
   * If `true`, the component will indicate the readonly state.
   *
   * @default false
   */
  readOnly?: boolean;
  /**
   * The id used for the label.
   */
  labelId: string;
  /**
   * The id used for the controller.
   */
  controllerId: string;
  /**
   * The id used for the description.
   */
  descriptionId: string;
  /**
   * The predicate callback to determine focusWithin state.
   */
  focusWithinPredicate?: FocusWithinPredicateCallback<HTMLDivElement>;
};

export type Props = Omit<
  MergeElementProps<"div", OwnProps>,
  "defaultValue" | "value" | "defaultChecked" | "checked" | "color" | "content"
>;

const InputWrapper = (props: Props) => {
  const {
    className,
    children,
    label,
    labelId,
    description,
    descriptionId,
    controllerId,
    feedbackMessage,
    variant = "outlined",
    size = "medium",
    required = false,
    hasError = false,
    disabled = false,
    hideLabel = false,
    readOnly = false,
    focusWithinPredicate,
    ...otherProps
  } = props;

  const { handleBlur, handleFocus, isFocusWithin } =
    useFocusWithin<HTMLDivElement>(focusWithinPredicate);

  const renderLabel = () => {
    if (hideLabel) return null;

    return (
      <Label
        id={labelId}
        targetId={controllerId}
        className={classes.label}
        requiredIndication={required}
      >
        {label}
      </Label>
    );
  };

  const renderDescription = () => {
    if (!description) return null;

    return (
      <p
        id={descriptionId}
        data-slot={Slots.Description}
        className={classes.description}
      >
        {description}
      </p>
    );
  };

  const renderFeedbackMessage = () => {
    if (!feedbackMessage) return null;

    return (
      <p
        data-slot={Slots.FeedbackMessage}
        className={classes["feedback-message"]}
      >
        {feedbackMessage}
      </p>
    );
  };

  return (
    <div
      {...otherProps}
      tabIndex={-1}
      data-slot={Slots.Root}
      data-size={size}
      data-variant={variant}
      data-error={hasError ? "" : undefined}
      data-disabled={disabled ? "" : undefined}
      data-hide-label={hideLabel ? "" : undefined}
      data-required={required ? "" : undefined}
      data-focus-within={isFocusWithin ? "" : undefined}
      data-readonly={readOnly ? "" : undefined}
      className={cls(
        className,
        classes.root,
        classes[`root--${variant}`],
        classes[`root--${size}`],
        {
          [classes["root--error"]!]: hasError,
          [classes["root--disabled"]!]: disabled,
          [classes["root--readonly"]!]: readOnly,
        },
      )}
    >
      {renderLabel()}
      {renderDescription()}
      <div
        tabIndex={-1}
        data-slot={Slots.Container}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cls(classes.container, {
          [classes["container--focus-within"]!]: isFocusWithin,
        })}
      >
        {children}
      </div>
      {renderFeedbackMessage()}
    </div>
  );
};

export default InputWrapper;
