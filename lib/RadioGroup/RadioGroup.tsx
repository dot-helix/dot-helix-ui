import {
  RadioGroup as StylelessRadioGroup,
  type MergeElementProps,
  type RadioGroupProps,
} from "@styleless-ui/react";
import * as React from "react";
import Label from "../Label";
import Radio from "../Radio";
import { Logger } from "../internals";
import type { CommonProps } from "../types";
import {
  combineClasses as cls,
  componentWithForwardedRef,
  useDeterministicId,
  useValidityChangeEmitter,
} from "../utils";
import classes from "./RadioGroup.module.css";
import * as Slots from "./slots";
import type { RadioGroupInstace, RadioGroupValidityState } from "./types";
import { validate } from "./utils";

type RadioItem = {
  /**
   * The label of the radio.
   */
  label: string;
  /**
   * The value of the radio.
   */
  value: string;
  /**
   * If `true`, the radio will be disabled.
   *
   * @default false
   */
  disabled?: boolean;
};

type OwnProps = Pick<
  RadioGroupProps,
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "orientation"
  | "name"
  | "readOnly"
  | "disabled"
> &
  Pick<
    CommonProps,
    | "className"
    | "size"
    | "label"
    | "hasError"
    | "description"
    | "feedbackMessage"
  > & {
    /**
     * The instance ref of the component.
     */
    instanceRef?: React.RefObject<RadioGroupInstace>;
    /**
     * The group items.
     */
    items: RadioItem[];
    /**
     * If `true`, the `value` state of the component must not be empty in order to be valid.
     * The component takes it into account when calculating validity state.
     *
     * @default false
     */
    required?: boolean;
    /**
     * The callback is fired when the validity state changes.
     */
    onValidityStateChange?: (validityState: RadioGroupValidityState) => void;
  };

export type Props = Omit<
  MergeElementProps<"div", OwnProps>,
  | "checked"
  | "defaultChecked"
  | "onChange"
  | "onChangeCapture"
  | "children"
  | "onInvalid"
  | "onInvalidCapture"
>;

const RadioGroupBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    items: itemsProp,
    id: idProp,
    className,
    instanceRef,
    name,
    label,
    value,
    defaultValue,
    description,
    feedbackMessage,
    onValueChange,
    onValidityStateChange,
    disabled = false,
    readOnly = false,
    hasError = false,
    required = false,
    orientation = "vertical",
    size = "medium",
    ...otherProps
  } = props;

  const scopeId = useDeterministicId(idProp, "hui-radiogroup-scope");
  const groupId = `${scopeId}__group`;
  const labelId = `${scopeId}__label`;
  const descriptionId = `${scopeId}__description`;

  if (disabled && readOnly) {
    Logger.devOnly.log(
      "You can't have both `disabled` and `readOnly` props set to `true`.",
      "error",
      "RadioGroup",
    );
  }

  const items = itemsProp.map(item => (
    <Radio
      key={item.label + item.value}
      label={item.label}
      value={item.value}
      hasError={hasError}
      disabled={item.disabled ?? disabled}
      readOnly={readOnly}
      size={size}
    />
  ));

  const validityChangeEmitter = useValidityChangeEmitter({
    conditions: { required },
    onStateChange: onValueChange,
    onValidityChange: onValidityStateChange,
    validator: validate,
  });

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

  React.useImperativeHandle(
    instanceRef,
    () => {
      const getValue = () => {
        const node = document.getElementById(groupId);

        if (!node) return "";

        const radios = Array.from(
          node.querySelectorAll<HTMLElement>("[role='radio']"),
        );

        const selectedRadio = radios.find(radio => {
          if (!radio.hasAttribute("data-checked")) return false;

          const value = radio.getAttribute("data-value");

          return Boolean(value);
        });

        return selectedRadio?.getAttribute("data-value") ?? "";
      };

      return {
        getValue,
        checkValidity: () => validate(getValue(), { required }),
      } satisfies RadioGroupInstace;
    },
    [required, groupId],
  );

  return (
    <div
      {...otherProps}
      id={scopeId}
      ref={ref}
      data-slot={Slots.Root}
      className={cls(className, classes.root, {
        [classes["root--error"]!]: hasError,
      })}
    >
      <Label
        id={labelId}
        targetId={groupId}
        className={classes.label}
        data-slot={Slots.Label}
        requiredIndication={required}
      >
        {label}
      </Label>
      {renderDescription()}
      <StylelessRadioGroup
        id={groupId}
        name={name}
        readOnly={readOnly}
        disabled={disabled}
        orientation={orientation}
        label={{ labelledBy: labelId }}
        onValueChange={validityChangeEmitter}
        value={value}
        defaultValue={defaultValue}
        aria-describedby={description ? descriptionId : undefined}
        data-size={size}
        className={cls(
          classes.group,
          classes[`group--${orientation}`],
          classes[`group--${size}`],
        )}
      >
        {items}
      </StylelessRadioGroup>
      {renderFeedbackMessage()}
    </div>
  );
};

const RadioGroup = componentWithForwardedRef(RadioGroupBase, "RadioGroup");

export default RadioGroup;
