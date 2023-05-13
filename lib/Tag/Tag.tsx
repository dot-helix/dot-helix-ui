import cls from "classnames";
import * as React from "react";
import IconButton from "../IconButton";
import { CloseIcon } from "../internals";
import classes from "./Tag.module.css";

interface OwnProps {
  /**
   * The className applied to the component.
   */
  className?: string;
  /**
   * The color of the tag.
   * @default "neutral"
   */
  color?:
    | "neutral"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "warning"
    | "info";
  /**
   * The content of the tag.
   */
  text: string;
  /**
   * If provided, the tag will have a delete button.
   */
  remove?: { callback: React.MouseEventHandler; screenReaderLabel: string };
  /**
   * The leading icon element placed before the text.
   */
  icon?: React.ReactNode;
}

export type Props = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof OwnProps | "children"
> &
  OwnProps;

const TagBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    className,
    text,
    icon,
    remove,
    color = "neutral",
    ...otherProps
  } = props;

  return (
    <div
      {...otherProps}
      ref={ref}
      data-slot="Tag:Root"
      className={cls(className, classes.root, classes[`root--${color}`])}
    >
      {icon && (
        <div data-slot="Tag:Icon" className={classes.icon}>
          {icon}
        </div>
      )}
      <span data-slot="Tag:Text" className={classes.text}>
        {text}
      </span>
      {remove && (
        <IconButton
          data-slot="Tag:Delete"
          as="button"
          size="small"
          color={color}
          variant="inlined"
          className={classes.delete}
          label={{ screenReaderLabel: remove.screenReaderLabel }}
          onClick={remove.callback}
          icon={<CloseIcon />}
        />
      )}
    </div>
  );
};

const Tag = React.forwardRef(TagBase) as typeof TagBase;

export default Tag;
