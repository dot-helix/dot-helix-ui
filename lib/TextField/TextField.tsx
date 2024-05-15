import type { MergeElementProps } from "@styleless-ui/react";
import {
  contains,
  useControlledProp,
  useDeterministicId,
  useEventCallback,
} from "@styleless-ui/react/utils";
import * as React from "react";
import IconButton from "../IconButton";
import {
  EyeIcon,
  EyeOffIcon,
  InputAddon,
  InputWrapper,
  Logger,
} from "../internals";
import { Container as InputWrapperContainerSlot } from "../internals/InputWrapper/slots";
import type { CommonProps } from "../types";
import {
  combineClasses as cls,
  componentWithForwardedRef,
  getFocusableDescendants,
  useValidityChangeEmitter,
  type FocusWithinPredicateCallback,
} from "../utils";
import classes from "./TextField.module.css";
import type { TextFieldInstance, TextFieldValidityState } from "./types";
import { validate } from "./utils";

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
   * Specifies the type of the input text.
   *
   * @default "text"
   */
  type?: "text" | "email" | "password" | "url";
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
   * Defines a regular expression that the input's value must match
   * in order for the value to pass constraint validation.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#pattern MDN Web Docs} for more information.
   */
  pattern?: string;
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
  instanceRef?: React.RefObject<TextFieldInstance>;
  /**
   * Callback is called when the value changes.
   */
  onValueChange?: (value: string) => void;
  /**
   * The callback is fired when the validity state changes.
   */
  onValidityStateChange?: (validityState: TextFieldValidityState) => void;
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
>;

const TextFieldBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
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
    pattern,
    value: valueProp,
    defaultValue,
    startAddon,
    endAddon,
    type = "text",
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

  const scopeId = useDeterministicId(idProp, "hui-textfield-scope");
  const controllerId = `${scopeId}__controller`;
  const labelId = `${scopeId}__label`;
  const descriptionId = `${scopeId}__description`;

  if (disabled && readOnly) {
    Logger.devOnly.log(
      "You can't have both `disabled` and `readOnly` props set to `true`.",
      "error",
      "TextField",
    );
  }

  const [showPassword, setShowPassword] = React.useState(false);

  const [value, setValue] = useControlledProp(valueProp, defaultValue, "");

  const validationConditions = {
    required,
    minLength,
    maxLength,
    pattern,
    type,
  };

  const validityChangeEmitter = useValidityChangeEmitter({
    conditions: validationConditions,
    onStateChange: onValueChange,
    onValidityChange: onValidityStateChange,
    validator: validate,
  });

  const handleChange = useEventCallback<React.ChangeEvent<HTMLInputElement>>(
    event => {
      const inputValue = event.target.value;

      setValue(inputValue);
      validityChangeEmitter(inputValue);
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
      }) satisfies TextFieldInstance,
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

  const renderEndAddons = () => {
    const addons: Addon[] = [];

    if (endAddon) addons.push(endAddon);
    if (type === "password") {
      addons.push({
        type: "node",
        content: (
          <IconButton
            variant="inlined"
            size={size}
            label={{ screenReaderLabel: "Show password" }}
            onClick={() => void setShowPassword(s => !s)}
            icon={showPassword ? <EyeOffIcon /> : <EyeIcon />}
          />
        ),
      });
    }

    return (
      <div className={classes["end-addons"]}>
        {addons.map((addon, idx) => (
          <InputAddon
            key={addon.type + String(idx)}
            variant={addon.type}
            size={size}
            disabled={disabled}
          >
            {addon.content}
          </InputAddon>
        ))}
      </div>
    );
  };

  return (
    <InputWrapper
      {...otherProps}
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
      <input
        id={controllerId}
        className={classes.input}
        value={value}
        type={showPassword ? "text" : type}
        name={name}
        dir={dir}
        placeholder={placeholder}
        onChange={handleChange}
        readOnly={readOnly}
        disabled={disabled}
        aria-label={hideLabel ? label : undefined}
        aria-describedby={description ? descriptionId : undefined}
      />
      {renderEndAddons()}
    </InputWrapper>
  );
};

const TextField = componentWithForwardedRef(TextFieldBase, "TextField");

export default TextField;
