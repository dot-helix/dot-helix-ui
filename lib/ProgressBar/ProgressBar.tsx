import {
  ProgressBar as StylelessProgressBar,
  type MergeElementProps,
  type ProgressBarRenderProps,
} from "@styleless-ui/react";
import { remap } from "@styleless-ui/react/utils";
import cls from "classnames";
import * as React from "react";
import { useTokensClient } from "../systems";
import type { CommonProps } from "../types";
import { componentWithForwardedRef, useDeterministicId } from "../utils";
import classes from "./ProgressBar.module.css";
import * as Slots from "./slots";

type OwnProps = Pick<CommonProps, "className"> & {
  /**
   * The title of the progressbar.
   */
  title: string;
  /**
   * If `true`, the component will fill the parent's width.
   *
   * @default false
   */
  fluid?: boolean;
  /**
   * The semantic color variant of the progressbar.
   *
   * @default "info"
   */
  color?: Exclude<CommonProps["color"], "neutral" | "primary" | "secondary">;
};

export type Props = Omit<
  MergeElementProps<"div", OwnProps>,
  "defaultValue" | "checked" | "defaultChecked" | "children" | "content"
> &
  (
    | {
        /**
         * The current value of the progress bar.
         */
        value: number;
        /**
         * The minimum allowed value of the progress bar.
         * Should not be greater than or equal to `max`.
         */
        min: number;
        /**
         * The maximum allowed value of the progress bar.
         * Should not be less than or equal to `min`.
         */
        max: number;
        /**
         * A function to return a string value that provides a user-friendly name
         * for the current value of the progressbar. This is important for screen reader users.
         */
        setValueText: (
          renderCtx: Omit<
            ProgressBarRenderProps,
            "valueText" | "indeterminate"
          >,
        ) => string;
        /**
         * A function to render the current value of the progressbar.
         */
        renderValue?: (
          renderCtx: Omit<ProgressBarRenderProps, "indeterminate">,
        ) => React.ReactNode;
      }
    | {
        /**
         * The current value of the progress bar.
         */
        value: "indeterminate";
      }
  );

const ProgressBarBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    id: idProp,
    className,
    title,
    value,
    color = "info",
    fluid = false,
    ...otherProps
  } = props;

  const { useDirection } = useTokensClient();

  const direction = useDirection();

  const id = useDeterministicId(idProp, "hui-progressbar-scope");
  const labelId = `${id}__label`;

  const isIndeterministic = value === "indeterminate";

  const numericValue = isIndeterministic ? 0 : value;

  const percentageValue = isIndeterministic
    ? 0
    : remap(numericValue, props.min, props.max, 0, 100);

  const valueText = isIndeterministic
    ? ""
    : props.setValueText({
        value: numericValue,
        percentageValue,
      });

  const renderValueContent = () => {
    if (isIndeterministic) return null;
    if (!props.renderValue) return null;

    return (
      <div
        className={classes.value}
        data-slot={Slots.Value}
      >
        {props.renderValue({ value: numericValue, percentageValue, valueText })}
      </div>
    );
  };

  const getFillStyle = () => {
    if (isIndeterministic) return undefined;

    return { width: `${percentageValue}%` } as React.CSSProperties;
  };

  /* eslint-disable @typescript-eslint/no-unused-vars */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error Some ugly hack
  const { min, max, setValueText, renderValue, ...rest } = otherProps;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  return (
    <StylelessProgressBar
      {...rest}
      ref={ref}
      id={id}
      max={isIndeterministic ? 100 : props.max}
      min={isIndeterministic ? 0 : props.min}
      value={value}
      valueText={valueText}
      className={cls(
        className,
        classes.root,
        classes[`root--${color}`],
        classes[`root--${direction}`],
        {
          [classes["root--fluid"]!]: fluid,
          [classes["root--indeterminate"]!]: isIndeterministic,
        },
      )}
      label={{ labelledBy: labelId }}
      data-color={color}
      data-fluid={fluid ? "" : undefined}
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
        {renderValueContent()}
      </div>
      <div
        aria-hidden="true"
        className={classes.track}
        data-slot={Slots.Track}
      >
        <div
          className={classes.fill}
          style={getFillStyle()}
          data-slot={Slots.Fill}
        ></div>
      </div>
    </StylelessProgressBar>
  );
};

const ProgressBar = componentWithForwardedRef(ProgressBarBase, "ProgressBar");

export default ProgressBar;
