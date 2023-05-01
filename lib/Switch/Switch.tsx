/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Switch as StylelessSwitch,
  type SwitchProps,
} from "@styleless-ui/react";
import cls from "classnames";
import * as React from "react";
import classes from "./Switch.module.css";

type OwnProps = Pick<
  SwitchProps,
  "label" | "onChange" | "checked" | "defaultChecked" | "disabled" | "autoFocus"
> & {
  /**
   * The className applied to the component.
   */
  className?: string;
  /**
   * The size of the switch.
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
  /**
   * If `true`, the switch will fill the parent's width.
   * @default false
   */
  fluid?: boolean;
};

export type Props = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof OwnProps | "value" | "defaultValue" | "children"
> &
  OwnProps;

const Thumb = () => (
  <div data-slot="Switch:ThumbElement" className={classes.thumb}></div>
);

const Track = () => (
  <div data-slot="Switch:TrackElement" className={classes.track}></div>
);

const SwitchBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    className,
    label,
    checked,
    defaultChecked,
    disabled,
    onChange,
    fluid = false,
    autoFocus = false,
    size = "medium",
    ...otherProps
  } = props;

  return (
    <div
      {...otherProps}
      className={cls(className, classes.root, classes[`root--${size}`], {
        [classes["root--fluid"]!]: fluid,
        [classes["root--disabled"]!]: disabled,
      })}
      ref={ref}
    >
      <StylelessSwitch
        label={label}
        disabled={disabled}
        onChange={onChange}
        checked={checked}
        autoFocus={autoFocus}
        defaultChecked={defaultChecked}
        thumbComponent={<Thumb />}
        trackComponent={<Track />}
        classes={({ checked, focusedVisible }) => ({
          root: cls(classes.input, {
            [classes["input--checked"]!]: checked,
            [classes["input--focus-visible"]!]: focusedVisible,
          }),
          label: classes.label,
          thumb: classes["thumb-wrapper"],
          track: classes["track-wrapper"],
        })}
      />
    </div>
  );
};

const Switch = React.forwardRef(SwitchBase) as typeof SwitchBase;

export default Switch;
