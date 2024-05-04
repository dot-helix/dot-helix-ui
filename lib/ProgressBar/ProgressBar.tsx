import {
  ProgressBar as StylelessProgressBar,
  type MergeElementProps,
  type MeterRenderProps,
  type ProgressBarProps,
} from "@styleless-ui/react";
import { remap } from "@styleless-ui/react/utils";
import cls from "classnames";
import * as React from "react";
import type { CommonProps } from "../types";
import { componentWithForwardedRef, useDeterministicId } from "../utils";
import classes from "./ProgressBar.module.css";
import * as Slots from "./slots";

type OwnProps = Pick<ProgressBarProps, "value" | "min" | "max"> &
  Pick<CommonProps, "className"> & {
    /**
     * The title of the meter.
     */
    title: string;
    /**
     * If `true`, the component will fill the parent's width.
     *
     * @default false
     */
    fluid?: boolean;
    /**
     * The semantic color variant of the meter.
     *
     * @default "info"
     */
    color?: Exclude<CommonProps["color"], "neutral" | "primary" | "secondary">;
    /**
     * A function to return a string value that provides a user-friendly name
     * for the current value of the meter. This is important for screen reader users.
     */
    setValueText: (renderCtx: Omit<MeterRenderProps, "valueText">) => string;
    /**
     * A function to render the current value of the meter.
     */
    renderValue?: (renderCtx: MeterRenderProps) => React.ReactNode;
  };

export type Props = Omit<
  MergeElementProps<"div", OwnProps>,
  "defaultValue" | "checked" | "defaultChecked" | "children" | "content"
>;

const ProgressBarBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    id: idProp,
    className,
    title,
    max,
    min,
    value,
    color = "info",
    fluid = false,
    setValueText,
    renderValue: renderValueProp,
    ...otherProps
  } = props;

  const id = useDeterministicId(idProp, "hui-progressbar-scope");
  const labelId = `${id}__label`;

  const percentageValue = remap(value, min, max, 0, 100);

  const valueText = setValueText({
    value,
    percentageValue,
  });

  const renderValue = () => {
    if (!renderValueProp) return null;

    return (
      <div
        className={classes.value}
        data-slot={Slots.Value}
      >
        {renderValueProp({ value, percentageValue, valueText })}
      </div>
    );
  };

  return (
    <StylelessProgressBar
      {...otherProps}
      ref={ref}
      id={id}
      max={max}
      min={min}
      value={value}
      valueText={valueText}
      className={cls(className, classes.root, classes[`root--${color}`], {
        [classes["root--fluid"]!]: fluid,
      })}
      label={{ labelledBy: labelId }}
      data-color={color}
    >
      <div
        className={classes.heading}
        data-slot={Slots.Heading}
      >
        <span
          id={labelId}
          className={classes.title}
          data-slot={Slots.Title}
        >
          {title}
        </span>
        {renderValue()}
      </div>
      <div
        aria-hidden="true"
        className={classes.track}
        data-slot={Slots.Track}
      >
        <div
          className={classes.fill}
          style={{ width: `${percentageValue}%` }}
          data-slot={Slots.Fill}
        ></div>
      </div>
    </StylelessProgressBar>
  );
};

const ProgressBar = componentWithForwardedRef(ProgressBarBase, "ProgressBar");

export default ProgressBar;
