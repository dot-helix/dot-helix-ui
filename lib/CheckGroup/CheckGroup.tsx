import {
  CheckGroup as StylelessCheckGroup,
  type CheckGroupProps,
  type MergeElementProps,
} from "@styleless-ui/react";
import * as React from "react";
import Checkbox from "../Checkbox";
import Label from "../Label";
import type { CommonProps } from "../types";
import {
  combineClasses as cls,
  componentWithForwardedRef,
  useDeterministicId,
  useValidityChangeEmitter,
} from "../utils";
import classes from "./CheckGroup.module.css";
import * as Slots from "./slots";
import type { CheckGroupInstace, CheckGroupValidityState } from "./types";
import { validate } from "./utils";

type CheckItem = {
  /**
   * The label of the checkbox.
   */
  label: string;
  /**
   * The value of the checkbox.
   */
  value: string;
  /**
   * If `true`, the checkbox will be disabled.
   *
   * @default false
   */
  disabled?: boolean;
};

type OwnProps = Pick<
  CheckGroupProps,
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
    instanceRef?: React.RefObject<CheckGroupInstace>;
    /**
     * The group items.
     */
    items: CheckItem[];
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
    onValidityStateChange?: (validityState: CheckGroupValidityState) => void;
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

const CheckGroupBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
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

  const scopeId = useDeterministicId(idProp, "hui-checkgroup-scope");
  const groupId = `${scopeId}__group`;
  const labelId = `${scopeId}__label`;
  const descriptionId = `${scopeId}__description`;

  const items = itemsProp.map(item => (
    <Checkbox
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

        if (!node) return [];

        const checkboxes = Array.from(
          node.querySelectorAll<HTMLElement>("[role='checkbox']"),
        );

        return checkboxes.reduce((result, checkbox) => {
          if (!checkbox.hasAttribute("data-checked")) return result;

          const value = checkbox.getAttribute("data-value");

          if (!value) return result;

          result.push(value);

          return result;
        }, [] as string[]);
      };

      return {
        getValue,
        checkValidity: () => validate(getValue(), { required }),
      } satisfies CheckGroupInstace;
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
      <StylelessCheckGroup
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
      </StylelessCheckGroup>
      {renderFeedbackMessage()}
    </div>
  );
};

const CheckGroup = componentWithForwardedRef(CheckGroupBase, "CheckGroup");

export default CheckGroup;
