import cls from "classnames";
import { useTheme } from "../configuration";
import classes from "./LoadingIndicator.module.css";

export interface Props {
  className?: string;
  color?: string;
  secondaryColor?: string;
  size?: number;
  label?: string;
}

const LoadingIndicator = (props: Props) => {
  const theme = useTheme();

  const {
    label,
    className,
    color = theme.colors.neutral.background.overlay,
    secondaryColor = theme.colors.neutral.surface.base,
    size = 16
  } = props;

  const sizing = {
    width: `${size / 16}rem`,
    height: `${size / 16}rem`,
    maxWidth: `${size / 16}rem`,
    maxHeight: `${size / 16}rem`
  };

  return (
    <div
      aria-busy={true}
      role="status"
      aria-label={label}
      className={cls(classes.root, className)}
      style={sizing}
    >
      <svg
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
