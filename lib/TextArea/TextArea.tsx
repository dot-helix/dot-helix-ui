import type { MergeElementProps } from "@styleless-ui/react";
import {
  contains,
  useControlledProp,
  useDeterministicId,
  useEventCallback,
} from "@styleless-ui/react/utils";
import * as React from "react";
import { InputAddon, InputWrapper, Logger } from "../internals";
import { Container as InputWrapperContainerSlot } from "../internals/InputWrapper/slots";
import type { CommonProps } from "../types";
import {
  combineClasses as cls,
  componentWithForwardedRef,
  getFocusableDescendants,
  useValidityChangeEmitter,
  type FocusWithinPredicateCallback,
} from "../utils";
import classes from "./TextArea.module.css";
import * as Slots from "./slots";
import type {
  SyncedHeightState,
  TextAreaInstance,
  TextAreaValidityState,
} from "./types";
import { syncHeights, validate } from "./utils";

type Addon =
  | {
      type: "text";
      content: string;
    }
  | {
      type: "icon";
      content: React.ReactElement;
    }
  | {
      type: "node";
      content: React.ReactNode;
    };

type OwnProps = Pick<
  CommonProps,
  | "className"
  | "description"
  | "feedbackMessage"
  | "label"
  | "size"
  | "disabled"
  | "hasError"
> & {
  /**
   * Sets the directionality of the text input.
   *
   * - `auto`: Isolates the content and sets the direction according
   * to the first strongly typed directional character.
   *
   * - `ltr`: Sets direction to LTR and isolates
   * the embedded content from the surrounding text.
   *
   * - `rtl`: Sets direction to RTL and isolates
   * the embedded content from the surrounding text.
   *
   * @default "auto"
   */
  dir?: "auto" | "ltr" | "rtl";
  /**
   * Provides a brief hint to the user as to
   * what kind of information is expected in the field.
   * It should be a word or short phrase that provides a hint
   * as to the expected type of data, rather than an explanation or prompt.
   */
  placeholder?: string;
  /**
   * Defines the minimum string length (measured in UTF-16 code units)
   * that the user can enter into the field.
   * This must be an integer value of 0 or higher.
   * This value must also be smaller than or equal to the value of `maxLength`.
   */
  minLength?: number;
  /**
   * Defines the maximum string length (measured in UTF-16 code units)
   * that the user can enter into the field.
   * This must be an integer value of 0 or higher.
   * This value must also be greater than or equal to the value of `minLength`.
   */
  maxLength?: number;
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
   * If `true`, the `value` state of the component must not be empty to be valid.
   * The component takes it into account when calculating validity state.
   *
   * @default false
   */
  required?: boolean;
  /**
   * If `true`, the input will be read-only.
   *
   * @default false
   */
  readOnly?: boolean;
  /**
   * The name of the form control when submitted.
   * Submitted with the form as part of a name/value pair.
   */
  name?: string;
  /**
   * The number of minimum visible text lines for the control.
   * If it is specified, it must be a positive integer and smaller than or equal to `maxRows`.
   *
   * @default 3
   */
  minRows?: number;
  /**
   * The number of maximum visible text lines for the control.
   * If it is specified, it must be a positive integer and greater than or equal to `minRows`.
   *
   * @default 6
   */
  maxRows?: number;
  /**
   * The value of the input.
   */
  value?: string;
  /**
   * The default value. Use when the component's `value` state is not controlled.
   */
  defaultValue?: string;
  /**
   * The addon component to put at the start of the input.
   */
  startAddon?: Addon;
  /**
   * The addon component to put at the end of the input.
   */
  endAddon?: Addon;
  /**
   * The instance ref of the component.
   */
  instanceRef?: React.RefObject<TextAreaInstance>;
  /**
   * Callback is called when the value changes.
   */
  onValueChange?: (value: string) => void;
  /**
   * The callback is fired when the validity state changes.
   */
  onValidityStateChange?: (validityState: TextAreaValidityState) => void;
};

export type Props = Omit<
  MergeElementProps<"div", OwnProps>,
  | "children"
  | "autoCapitalize"
  | "autoCorrect"
  | "autoSave"
  | "autoComplete"
  | "onChange"
  | "onChangeCapture"
  | "onInput"
  | "onInputCapture"
  | "onInvalid"
  | "onInvalidCapture"
  | "spellCheck"
  | "defaultChecked"
  | "cols"
  | "rows"
  | "wrap"
>;

const TextAreaBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    id: idProp,
    className,
    instanceRef,
    label,
    name,
    description,
    feedbackMessage,
    placeholder,
    minLength,
    maxLength,
    value: valueProp,
    defaultValue,
    startAddon,
    endAddon,
    minRows = 3,
    maxRows = 6,
    dir = "auto",
    size = "medium",
    variant = "outlined",
    hasError = false,
    hideLabel = false,
    readOnly = false,
    disabled = false,
    required = false,
    onValueChange,
    onValidityStateChange,
    ...otherProps
  } = props;

  const scopeId = useDeterministicId(idProp, "hui-textarea-scope");
  const controllerId = `${scopeId}__controller`;
  const labelId = `${scopeId}__label`;
  const descriptionId = `${scopeId}__description`;

  if (disabled && readOnly) {
    Logger.devOnly.log(
      "You can't have both `disabled` and `readOnly` props set to `true`.",
      "error",
      "TextArea",
    );
  }

  const [value, setValue] = useControlledProp(valueProp, defaultValue, "");

  const [syncedStyle, setSyncedStyle] =
    React.useState<SyncedHeightState | null>(null);

  const validationConditions = {
    required,
    minLength,
    maxLength,
  };

  const updateSyncedHeights = React.useCallback(
    (controller: HTMLTextAreaElement) => {
      const shadowInput =
        controller.nextElementSibling as HTMLTextAreaElement | null;

      if (!shadowInput) return;

      const newSyncedHeights = syncHeights(
        controller,
        shadowInput,
        minRows,
        maxRows,
        syncedStyle,
      );

      if (!newSyncedHeights) return;

      setSyncedStyle(newSyncedHeights);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maxRows, minRows, syncedStyle, size],
  );

  const validityChangeEmitter = useValidityChangeEmitter({
    conditions: validationConditions,
    onStateChange: onValueChange,
    onValidityChange: onValidityStateChange,
    validator: validate,
  });

  const handleChange = useEventCallback<React.ChangeEvent<HTMLTextAreaElement>>(
    event => {
      const inputValue = event.target.value;

      setValue(inputValue);
      validityChangeEmitter(inputValue);
      updateSyncedHeights(event.currentTarget);
    },
  );

  const handleRootFocus = useEventCallback<React.FocusEvent<HTMLDivElement>>(
    event => {
      const container = event.currentTarget.querySelector<HTMLElement>(
        `[data-slot="${InputWrapperContainerSlot}"]`,
      );

      if (!container) return;
      if (!contains(container, event.target)) return;

      const controller = document.getElementById(controllerId);

      if (!controller) return;
      if (event.target === controller) return;

      const focusables = getFocusableDescendants(container);

      const isValidFocusableFocused = focusables.some(element => {
        if (element === controller) return false;

        return event.target === element;
      });

      if (isValidFocusableFocused) return;

      controller.focus();
    },
  );

  const handleFocusWithinPredicate =
    React.useCallback<FocusWithinPredicateCallback>(
      event => {
        if (event.type === "blur") return null;

        const focusables = getFocusableDescendants(event.currentTarget).filter(
          element => element.getAttribute("id") !== controllerId,
        );

        const isValidFocusableFocused = focusables.some(
          element => event.target === element,
        );

        return !isValidFocusableFocused;
      },
      [controllerId],
    );

  React.useImperativeHandle(
    instanceRef,
    () =>
      ({
        getValue: () => value,
        checkValidity: () => validate(value, validationConditions),
      }) satisfies TextAreaInstance,
  );

  const renderStartAddon = () => {
    if (!startAddon) return null;

    return (
      <InputAddon
        variant={startAddon.type}
        size={size}
        disabled={disabled}
      >
        {startAddon.content}
      </InputAddon>
    );
  };

  const renderEndAddon = () => {
    if (!endAddon) return null;

    return (
      <InputAddon
        key={endAddon.type}
        variant={endAddon.type}
        size={size}
        disabled={disabled}
      >
        {endAddon.content}
      </InputAddon>
    );
  };

  const controllerRefCallback = React.useCallback(
    (node: HTMLTextAreaElement | null) => {
      if (!node) return;

      updateSyncedHeights(node);
    },
    [updateSyncedHeights],
  );

  const getControllerStyles = () => {
    const styles: React.CSSProperties = {
      height: syncedStyle?.outerHeight,

      // Need a large enough difference to allow scrolling.
      // This prevents infinite rendering loop.
      overflow: syncedStyle?.overflow ? "hidden" : undefined,
    };

    return styles;
  };

  return (
    <InputWrapper
      {...otherProps}
      resizableHeight
      id={scopeId}
      label={label}
      description={description}
      feedbackMessage={feedbackMessage}
      hideLabel={hideLabel}
      variant={variant}
      hasError={hasError}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      size={size}
      controllerId={controllerId}
      descriptionId={descriptionId}
      labelId={labelId}
      ref={ref}
      className={cls(className, classes.root)}
      onFocus={handleRootFocus}
      focusWithinPredicate={handleFocusWithinPredicate}
    >
      {renderStartAddon()}
      <textarea
        ref={controllerRefCallback}
        id={controllerId}
        className={classes.input}
        value={value}
        name={name}
        dir={dir}
        rows={minRows}
        placeholder={placeholder}
        onChange={handleChange}
        readOnly={readOnly}
        disabled={disabled}
        style={getControllerStyles()}
        aria-label={hideLabel ? label : undefined}
        aria-describedby={description ? descriptionId : undefined}
        data-slot={Slots.Input}
      />
      <textarea
        readOnly
        aria-hidden="true"
        tabIndex={-1}
        className={classes.shadow}
        data-slot={Slots.ShadowInput}
      />
      {renderEndAddon()}
    </InputWrapper>
  );
};

const TextArea = componentWithForwardedRef(TextAreaBase, "TextArea");

export default TextArea;
