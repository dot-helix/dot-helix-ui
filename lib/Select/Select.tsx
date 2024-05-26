import {
  Select as StylelessSelect,
  type MergeElementProps,
  type SelectRootProps,
} from "@styleless-ui/react";
import {
  contains,
  useControlledProp,
  useDeterministicId,
  useEventCallback,
} from "@styleless-ui/react/utils";
import * as React from "react";
import IconButton from "../IconButton";
import {
  ChevronDownIcon,
  CloseIcon,
  InputAddon,
  InputWrapper,
  Logger,
} from "../internals";
import type { CommonProps } from "../types";
import {
  combineClasses as cls,
  componentWithForwardedRef,
  useValidityChangeEmitter,
} from "../utils";
import classes from "./Select.module.css";
import { Group, Item, SelectedValues } from "./components";
import * as Slots from "./slots";
import type { SelectInstance, SelectItem, SelectValidityState } from "./types";
import { makeGetItemFromValue, validate } from "./utils";

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
  SelectRootProps,
  "searchable" | "open" | "defaultOpen" | "onOpen" | "onClose"
> &
  Pick<
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
     * Provides a brief hint to the user as to
     * what kind of information is expected in the field.
     * It should be a word or short phrase that provides a hint
     * as to the expected type of data, rather than an explanation or prompt.
     */
    placeholder?: string;
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
     * If `true`, the component will be focused automatically.
     *
     * @default false
     */
    autoFocus?: boolean;
    /**
     * The name of the form control when submitted.
     * Submitted with the form as part of a name/value pair.
     */
    name?: string;
    /**
     * The select mode of the items.
     *
     * @default "single"
     */
    selectMode?: "multiple" | "single";
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
    instanceRef?: React.RefObject<SelectInstance>;
    /**
     * The items to be selected.
     */
    items: SelectItem[];
    /**
     * The statement message displayed when no search results are found.
     */
    emptyStatement?: string;
    /**
     * The callback is fired when the validity state changes.
     */
    onValidityStateChange?: (validityState: SelectValidityState) => void;
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
  | "defaultValue"
> &
  (
    | {
        selectMode: "single";
        /**
         * The default value. Use when the component's `value` state is not controlled.
         */
        defaultValue?: string;
        /**
         * The value of the select.
         */
        value?: string;
        /**
         * Callback is called when the value changes.
         */
        onValueChange?: (currentValue: string) => void;
      }
    | {
        selectMode: "multiple";
        defaultValue?: string[];
        value?: string[];
        onValueChange?: (currentValue: string[]) => void;
      }
  );

const SelectBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    id: idProp,
    className,
    instanceRef,
    label,
    name,
    description,
    feedbackMessage,
    items: itemsProp,
    placeholder,
    value: valueProp,
    defaultValue,
    open,
    defaultOpen,
    startAddon,
    endAddon,
    emptyStatement = "No results found.",
    selectMode = "single",
    size = "medium",
    variant = "outlined",
    autoFocus = false,
    searchable = false,
    hasError = false,
    hideLabel = false,
    readOnly = false,
    disabled = false,
    required = false,
    onOpen,
    onClose,
    onValueChange,
    onValidityStateChange,
    ...otherProps
  } = props;

  const scopeId = useDeterministicId(idProp, "hui-select-scope");
  const controllerId = `${scopeId}__controller`;
  const labelId = `${scopeId}__label`;
  const descriptionId = `${scopeId}__description`;

  const triggerRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  if (disabled && readOnly) {
    Logger.devOnly.log(
      "You can't have both `disabled` and `readOnly` props set to `true`.",
      "error",
      "Select",
    );
  }

  const items = itemsProp.map(item => {
    switch (item.type) {
      case "option": {
        return (
          <Item
            key={item.title + item.value}
            title={item.title}
            value={item.value}
            disabled={item.disabled}
          />
        );
      }

      case "group": {
        return (
          <Group
            key={item.title + item.type}
            title={item.title}
            items={item.items}
            scopeId={scopeId}
          />
        );
      }

      default:
        return null;
    }
  });

  const [value, setValue] = useControlledProp(valueProp, defaultValue, []);

  const validityChangeEmitter = useValidityChangeEmitter({
    conditions: { required },
    onStateChange: onValueChange as (value: string | string[]) => void,
    onValidityChange: onValidityStateChange,
    validator: validate,
  });

  const handleValueChange = React.useCallback(
    (value: string | string[]) => {
      setValue(value);
      validityChangeEmitter(value);
    },
    [setValue, validityChangeEmitter],
  );

  React.useImperativeHandle(
    instanceRef,
    () =>
      ({
        getValue: () => value,
        checkValidity: () => validate(value, { required }),
      }) satisfies SelectInstance,
  );

  const getItemFromValue = makeGetItemFromValue(itemsProp);

  const renderPlaceholder = (hasSelectedValues: boolean) => {
    if (hasSelectedValues) return null;
    if (!placeholder) return null;
    if (searchable) return null;

    return (
      <span
        className={classes["input-placeholder"]}
        data-slot={Slots.Placeholder}
      >
        {placeholder}
      </span>
    );
  };

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
        variant={endAddon.type}
        size={size}
        disabled={disabled}
      >
        {endAddon.content}
      </InputAddon>
    );
  };

  const renderClearValuesAddon = (
    clearValues: StylelessSelect.RootRenderProps["clearValues"],
  ) => {
    if (disabled || readOnly) return null;
    if (value.length === 0) return null;

    return (
      <InputAddon
        variant="node"
        size={size}
      >
        <IconButton
          variant="inlined"
          tabIndex={-1}
          size={size}
          label={{ screenReaderLabel: "Clear values" }}
          onClick={clearValues}
          icon={<CloseIcon />}
        />
      </InputAddon>
    );
  };

  const renderChevronAddon = (open: boolean) => {
    return (
      <InputAddon
        className={cls(classes.chevron, {
          [classes["chevron--open"]!]: open,
        })}
        variant="icon"
        size={size}
      >
        <ChevronDownIcon />
      </InputAddon>
    );
  };

  const handleContainerClick = useEventCallback<
    React.MouseEvent<HTMLDivElement>
  >(event => {
    if (!triggerRef.current) return;
    if (event.target === triggerRef.current) return;
    if (contains(triggerRef.current, event.target as HTMLElement)) return;

    if (
      listRef.current &&
      (event.target === listRef.current ||
        contains(listRef.current, event.target as HTMLElement))
    ) {
      return;
    }

    triggerRef.current.click();
  });

  return (
    <InputWrapper
      {...otherProps}
      id={scopeId}
      label={label}
      resizableHeight={selectMode === "multiple"}
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
      className={cls(className, classes.root, classes[`root--${selectMode}`], {
        [classes["root--searchable"]!]: searchable,
      })}
      onContainerClick={handleContainerClick}
      data-select-mode={selectMode}
      data-searchable={searchable ? "" : undefined}
    >
      <StylelessSelect.Root
        className={classes.input}
        multiple={(selectMode === "multiple") as false}
        searchable={searchable}
        disabled={disabled}
        readOnly={readOnly}
        name={name}
        label={
          hideLabel ? { screenReaderLabel: label } : { labelledBy: labelId }
        }
        value={value as string}
        open={open}
        defaultOpen={defaultOpen}
        onValueChange={handleValueChange}
        onOpen={onOpen}
        onClose={onClose}
      >
        {({ hasSelectedValues, makeRemoveOption, clearValues, open }) => (
          <>
            {renderStartAddon()}
            <StylelessSelect.Trigger
              ref={triggerRef}
              className={classes["input-trigger"]}
            >
              {renderPlaceholder(hasSelectedValues)}
              <SelectedValues
                getItemFromValue={getItemFromValue}
                makeRemoveValue={makeRemoveOption}
                selectedValue={value}
              />
              <StylelessSelect.Controller
                id={controllerId}
                autoFocus={autoFocus}
                className={classes["input-controller"]}
                placeholder={placeholder}
                dir="auto"
              />
            </StylelessSelect.Trigger>
            <StylelessSelect.List
              ref={listRef}
              className={({ open }) =>
                cls(classes["input-list"], {
                  [classes["input-list--open"]!]: open,
                })
              }
            >
              <StylelessSelect.EmptyStatement
                className={classes["input-empty-statement"]}
              >
                {emptyStatement}
              </StylelessSelect.EmptyStatement>
              {items}
            </StylelessSelect.List>
            <div className={classes["end-addons"]}>
              {renderClearValuesAddon(clearValues)}
              {renderEndAddon()}
              {renderChevronAddon(open)}
            </div>
          </>
        )}
      </StylelessSelect.Root>
    </InputWrapper>
  );
};

const Select = componentWithForwardedRef(SelectBase, "Select");

export default Select;
