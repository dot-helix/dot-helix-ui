import {
  InputSlider as StylelessInputSlider,
  type MergeElementProps,
} from "@styleless-ui/react";
import * as React from "react";
import { useTokensClient } from "../systems";
import type { CommonProps } from "../types";
import {
  combineClasses as cls,
  componentWithForwardedRef,
  useDeterministicId,
  useFocusWithin,
} from "../utils";
import classes from "./InputSlider.module.css";
import { StopSegments, ThumbValueText } from "./components";
import type { InputSliderInstance } from "./types";

type OwnProps = Pick<CommonProps, "className" | "size"> &
  Pick<
    StylelessInputSlider.RootProps,
    | "disabled"
    | "readOnly"
    | "orientation"
    | "min"
    | "max"
    | "step"
    | "stops"
    | "setThumbValueText"
  > & {
    /**
     * Indicates the mode of the slider.
     */
    sliderMode: "range" | "single";
    /**
     * The instance ref of the component.
     */
    instanceRef?: React.RefObject<InputSliderInstance>;
    /**
     * If `true`, the slider will fill the parent's width.
     *
     * @default false
     */
    fluid?: boolean;
    /**
     * A function which returns a string value that provides a user-friendly text
     * for stop segments of the slider.
     */
    setStopSegmentText?: (
      stopSegment: StylelessInputSlider.StopSegment,
    ) => string;
  };

export type Props = Omit<
  MergeElementProps<"div", OwnProps>,
  | "children"
  | "onChange"
  | "onChangeCapture"
  | "onInvalid"
  | "onInvalidCapture"
  | "checked"
  | "defaultChecked"
  | "value"
  | "defaultValue"
> &
  (
    | {
        sliderMode: "single";
        /**
         * The value of the slider. For range sliders, provide an array with two values.
         */
        value?: number;
        /**
         * The default value of the slider. Use when the component is not controlled.
         */
        defaultValue?: number;
        /**
         * The label of the thumbs for screen readers.
         *
         * For range sliders, provide an array with two values.
         */
        screenReaderLabel: string;
        /**
         * The name of the thumbs as form controls when submitted.
         * Submitted with the form as part of a name/value pair.
         *
         * For range sliders, provide an array with two values.
         */
        name?: string;
        /**
         * Callback fired when the slider's value changes.
         */
        onValueChange?: (value: number) => void;
      }
    | {
        sliderMode: "range";
        /**
         * The value of the slider. For range sliders, provide an array with two values.
         */
        value?: [number, number];
        /**
         * The default value of the slider. Use when the component is not controlled.
         */
        defaultValue?: [number, number];
        /**
         * The label of the thumbs for screen readers.
         *
         * For range sliders, provide an array with two values.
         */
        screenReaderLabel: [string, string];
        /**
         * The name of the thumbs as form controls when submitted.
         * Submitted with the form as part of a name/value pair.
         *
         * For range sliders, provide an array with two values.
         */
        name?: [string, string];
        /**
         * Callback fired when the slider's value changes.
         */
        onValueChange?: (value: [number, number]) => void;
      }
  );

const InputSliderBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    id: idProp,
    className,
    step,
    stops,
    sliderMode,
    name,
    min,
    max,
    screenReaderLabel,
    instanceRef,
    value,
    defaultValue,
    onValueChange,
    setStopSegmentText,
    orientation,
    fluid = false,
    size = "medium",
    ...otherProps
  } = props;

  const scopeId = useDeterministicId(idProp, "hui-inputslider-scope");

  const { direction } = useTokensClient();

  const supFocusWithin = useFocusWithin();
  const infFocusWithin = useFocusWithin();

  const supremumLabel =
    sliderMode === "range" ? screenReaderLabel[1] : screenReaderLabel;

  const infimumLabel =
    sliderMode === "range" ? screenReaderLabel[0] : "Infimum";

  const supremumName = sliderMode === "range" ? name?.[1] : name;
  const infimumName = sliderMode === "range" ? name?.[0] : undefined;

  React.useImperativeHandle(
    instanceRef,
    () => {
      const getSupremumValue: InputSliderInstance["getSupremumValue"] = () => {
        const root = document.getElementById(scopeId);

        if (!root) return NaN;

        const sup = root.querySelector<HTMLElement>(
          '[data-slot="InputSlider:Thumb:Supremum:Root""]',
        );

        if (!sup) return NaN;

        const value = sup.getAttribute("aria-valuenow");

        if (!value) return NaN;

        return parseInt(value, 10);
      };

      const getInfimumValue: InputSliderInstance["getInfimumValue"] = () => {
        const root = document.getElementById(scopeId);

        if (!root) return NaN;

        const inf = root.querySelector<HTMLElement>(
          '[data-slot="InputSlider:Thumb:Infimum:Root""]',
        );

        if (!inf) return NaN;

        const value = inf.getAttribute("aria-valuenow");

        if (!value) return NaN;

        return parseInt(value, 10);
      };

      const getValue: InputSliderInstance["getValue"] = () => {
        if (sliderMode === "single") return getSupremumValue();

        return [getSupremumValue(), getInfimumValue()];
      };

      return {
        getValue,
        getSupremumValue,
        getInfimumValue,
      } satisfies InputSliderInstance;
    },
    [scopeId, sliderMode],
  );

  return (
    <StylelessInputSlider.Root
      {...otherProps}
      id={scopeId}
      ref={ref}
      multiThumb={(sliderMode === "range") as false}
      value={value as number}
      defaultValue={defaultValue as number}
      onValueChange={onValueChange as (value: number) => void}
      step={step}
      min={min}
      max={max}
      stops={stops}
      orientation={orientation}
      data-slider-mode={sliderMode}
      data-size={size}
      className={({ disabled, dragging, orientation }) =>
        cls(
          classes.root,
          className,
          classes[`root--${orientation}`],
          classes[`root--${size}`],
          classes[`root--${direction}`],
          {
            [classes["root--disabled"]!]: disabled,
            [classes["root--dragging"]!]: dragging,
            [classes["root--fluid"]!]: fluid,
          },
        )
      }
    >
      {({ goToStopSegment, stopSegments, dragging, value }) => (
        <>
          <StylelessInputSlider.InfimumThumb
            name={infimumName}
            label={{ screenReaderLabel: infimumLabel }}
            onFocus={infFocusWithin.handleFocus}
            onBlur={infFocusWithin.handleBlur}
            className={({ focusedVisible }) =>
              cls(classes.thumb, {
                [classes["thumb--focus-visible"]!]: focusedVisible,
              })
            }
          >
            {({ valueText }) => (
              <ThumbValueText
                valueText={valueText}
                isVisible={dragging && infFocusWithin.isFocusWithin}
              />
            )}
          </StylelessInputSlider.InfimumThumb>
          <StylelessInputSlider.Track className={classes.track}>
            <StylelessInputSlider.Range className={classes.range} />
            <StopSegments
              min={min}
              max={max}
              currentValue={value}
              orientation={orientation}
              segments={stopSegments}
              goToSegmentIndex={goToStopSegment}
              setStopSegmentText={setStopSegmentText}
            />
          </StylelessInputSlider.Track>
          <StylelessInputSlider.SupremumThumb
            name={supremumName}
            label={{ screenReaderLabel: supremumLabel }}
            onFocus={supFocusWithin.handleFocus}
            onBlur={supFocusWithin.handleBlur}
            className={({ focusedVisible }) =>
              cls(classes.thumb, {
                [classes["thumb--focus-visible"]!]: focusedVisible,
              })
            }
          >
            {({ valueText }) => (
              <ThumbValueText
                valueText={valueText}
                isVisible={dragging && supFocusWithin.isFocusWithin}
              />
            )}
          </StylelessInputSlider.SupremumThumb>
        </>
      )}
    </StylelessInputSlider.Root>
  );
};

const InputSlider = componentWithForwardedRef(InputSliderBase, "InputSlider");

export default InputSlider;
