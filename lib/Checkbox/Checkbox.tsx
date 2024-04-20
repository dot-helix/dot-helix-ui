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
  useHandleInstanceRef,
} from "../utils";
import classes from "./Checkbox.module.css";
import type { Instance } from "./instance";
import * as Slots from "./slots";

type OwnProps = Pick<CommonProps, "className" | "required" | "label" | "size"> &
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
    instanceRef?: React.RefObject<Instance>;
    /**
     * The feedback message of the component.
     * Opt-in this prop when you want to provide feedback on user input.
     */
    feedbackMessage?: string;
    /**
     * If `true`, the checkbox will fill the parent's width.
     *
     * @default false
     */
    fluid?: boolean;
    /**
     * If `true`, the component will indicate an error state.
     *
     * @default false
     */
    hasError?: boolean;
  };

export type Props = Omit<
  MergeElementProps<"div", OwnProps>,
  "defaultValue" | "children" | "onChange" | "onChangeCapture"
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

  const checkboxRef = React.useRef<HTMLButtonElement>(null);

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

  const getCheckboxNode = React.useCallback(() => checkboxRef.current, []);

  const isChecked = React.useCallback(() => {
    const node = checkboxRef.current;

    if (!node) return false;

    return node.getAttribute("data-checked") != null;
  }, []);

  useHandleInstanceRef(instanceRef, () => ({
    getCheckboxNode,
    isChecked,
  }));

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
          ref={checkboxRef}
          id={boxId}
          label={{ labelledBy: labelId }}
          disabled={!readOnly && disabled}
          readOnly={readOnly}
          onCheckedChange={onCheckedChange}
          checked={checked}
          autoFocus={autoFocus}
          defaultChecked={defaultChecked}
          value={value}
          name={name}
          data-size={size}
          data-fluid={fluid ? "" : undefined}
          data-error={hasError ? "" : undefined}
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
