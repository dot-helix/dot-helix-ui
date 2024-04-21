/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Checkbox as StylelessCheckbox,
  type CheckboxProps,
  type MergeElementProps,
} from "@styleless-ui/react";
import cls from "classnames";
import * as React from "react";
import Label from "../Label";
import { Logger } from "../internals";
import type { CommonProps } from "../types";
import {
  componentWithForwardedRef,
  useDeterministicId,
  useValidityChangeEmitter,
} from "../utils";
import classes from "./Checkbox.module.css";
import * as Slots from "./slots";
import type { CheckboxInstance, CheckboxValidityState } from "./types";
import { validate } from "./utils";

type OwnProps = Pick<
  CommonProps,
  "className" | "label" | "size" | "hasError" | "feedbackMessage"
> &
  Pick<
    CheckboxProps,
    | "name"
    | "value"
    | "onCheckedChange"
    | "checked"
    | "defaultChecked"
    | "disabled"
    | "autoFocus"
    | "readOnly"
  > & {
    /**
     * The instance ref of the component.
     */
    instanceRef?: React.RefObject<CheckboxInstance>;
    /**
     * If `true`, the checkbox will fill the parent's width.
     *
     * @default false
     */
    fluid?: boolean;
    /**
     * If `true`, the `checked` state of the component must be `true` to be valid.
     * The component takes it into account when calculating validity state.
     *
     * @default false
     */
    required?: boolean;
    /**
     * The callback is fired when the validity state changes.
     */
    onValidityStateChange?: (validityState: CheckboxValidityState) => void;
  };

export type Props = Omit<
  MergeElementProps<"div", OwnProps>,
  | "defaultValue"
  | "children"
  | "onChange"
  | "onChangeCapture"
  | "onInvalid"
  | "onInvalidCapture"
>;

const CheckboxBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    id: idProp,
    instanceRef,
    className,
    label,
    name,
    value,
    checked,
    defaultChecked,
    feedbackMessage,
    onCheckedChange,
    onValidityStateChange,
    hasError = false,
    required = false,
    disabled = false,
    readOnly = false,
    fluid = false,
    autoFocus = false,
    size = "medium",
    ...otherProps
  } = props;

  const scopeId = useDeterministicId(idProp, "hui-checkbox-scope");
  const boxId = `${scopeId}__box`;
  const labelId = `${scopeId}__label`;

  if (disabled && readOnly) {
    Logger.devOnly.log(
      "You can't have both `disabled` and `readOnly` props set to `true`.",
      "error",
      "Checkbox",
    );
  }

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

  const validityChangeEmitter = useValidityChangeEmitter({
    conditions: { required },
    onStateChange: onCheckedChange,
    onValidityChange: onValidityStateChange,
    validator: validate,
  });

  React.useImperativeHandle(
    instanceRef,
    () => {
      const isChecked = () => {
        const node = document.getElementById(boxId);

        if (!node) return false;

        return node.getAttribute("data-checked") != null;
      };

      return {
        isChecked,
        checkValidity: () => validate(isChecked(), { required }),
      } satisfies CheckboxInstance;
    },
    [required, boxId],
  );

  return (
    <div
      {...otherProps}
      id={scopeId}
      ref={ref}
      data-slot={Slots.Root}
      className={cls(className, classes.root, classes[`root--${size}`], {
        [classes["root--fluid"]!]: fluid,
        [classes["root--error"]!]: hasError,
      })}
    >
      <div
        data-slot={Slots.Container}
        className={classes.container}
      >
        <StylelessCheckbox
          id={boxId}
          label={{ labelledBy: labelId }}
          disabled={!readOnly && disabled}
          readOnly={readOnly}
          onCheckedChange={validityChangeEmitter}
          checked={checked}
          autoFocus={autoFocus}
          defaultChecked={defaultChecked}
          value={value}
          name={name}
          data-size={size}
          data-fluid={fluid ? "" : undefined}
          data-error={hasError ? "" : undefined}
          data-value={value}
          className={({
            checked,
            disabled,
            indeterminated,
            focusedVisible,
            readOnly,
          }) =>
            cls(classes.input, {
              [classes["input--disabled"]!]: disabled,
              [classes["input--checked"]!]: checked,
              [classes["input--focus-visible"]!]: focusedVisible,
              [classes["input--indeterminated"]!]: indeterminated,
              [classes["input--readonly"]!]: readOnly,
            })
          }
        >
          <div
            aria-hidden="true"
            className={cls(classes["check-indicator"])}
            data-slot={Slots.CheckIndicator}
          ></div>
        </StylelessCheckbox>
        <Label
          id={labelId}
          targetId={boxId}
          className={classes.label}
          requiredIndication={required}
        >
          {label}
        </Label>
      </div>
      {renderFeedbackMessage()}
    </div>
  );
};

const Checkbox = componentWithForwardedRef(CheckboxBase, "Checkbox");

export default Checkbox;
