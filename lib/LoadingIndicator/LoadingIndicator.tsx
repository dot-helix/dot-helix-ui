import { useTokensClient } from "../systems";
import type { CommonProps } from "../types";
import { combineClasses as cls } from "../utils";
import classes from "./LoadingIndicator.module.css";

export type Props = Pick<CommonProps, "className"> & {
  /**
   * The main color used for the component.
   *
   * @default `colors.neutral.background.overlay`
   */
  color?: string;
  /**
   * The secondary color used for the component.
   *
   * @default `colors.neutral.surface.base`
   */
  secondaryColor?: string;
  /**
   * The size of the component in pixels.
   *
   * @default 16
   */
  size?: number;
  /**
   * The label of the component.
   */
  label:
    | {
        /**
         * The label to use as `aria-label` property.
         */
        screenReaderLabel: string;
      }
    | {
        /**
         * Identifies the element (or elements) that labels the component.
         *
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby MDN Web Docs} for more information.
         */
        labelledBy: string;
      };
};

const LoadingIndicator = (props: Props) => {
  const { tokens } = useTokensClient();
  const { colors } = tokens;

  const {
    label,
    className,
    color = colors.neutral.background.overlay,
    secondaryColor = colors.neutral.surface.base,
    size = 16,
  } = props;

  const sizing = {
    width: `${size / 16}rem`,
    height: `${size / 16}rem`,
    maxWidth: `${size / 16}rem`,
    maxHeight: `${size / 16}rem`,
  };

  return (
    <div
      aria-busy={true}
      role="status"
      aria-label={
        "screenReaderLabel" in label ? label.screenReaderLabel : undefined
      }
      aria-labelledby={"labelledBy" in label ? label.labelledBy : undefined}
      className={cls(classes.root, className)}
      style={sizing}
    >
      <svg
        aria-hidden="true"
        focusable="false"
        className={classes.svg}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
      >
        <path
          fill={secondaryColor}
          className={classes.base}
          d="M8,16a8,8,0,1,1,8-8A8,8,0,0,1,8,16ZM8,2a6,6,0,1,0,6,6A6,6,0,0,0,8,2Z"
        ></path>
        <circle
          stroke={color}
          className={classes.moving}
          cx="8"
          cy="8"
          r="7"
        ></circle>
      </svg>
    </div>
  );
};

export default LoadingIndicator;
