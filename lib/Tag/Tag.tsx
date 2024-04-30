import type { MergeElementProps } from "@styleless-ui/react";
import * as React from "react";
import IconButton from "../IconButton";
import { CloseIcon } from "../internals";
import type { CommonProps } from "../types";
import { combineClasses as cls, componentWithForwardedRef } from "../utils";
import classes from "./Tag.module.css";
import * as Slots from "./slots";

type OwnProps = Pick<CommonProps, "className" | "color"> & {
  /**
   * The content of the tag.
   */
  text: string;
  /**
   * If provided, the tag will have a delete button.
   */
  remove?: { onClick: React.MouseEventHandler; screenReaderLabel: string };
  /**
   * The leading icon element placed before the text.
   */
  icon?: React.ReactNode;
};

export type Props = Omit<
  MergeElementProps<"div", OwnProps>,
  "children" | "defaultValue" | "value" | "checked" | "defaultChecked"
>;

const TagBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    className,
    text,
    icon,
    remove,
    color = "neutral",
    ...otherProps
  } = props;

  const renderIcon = () => {
    if (!icon) return null;

    return (
      <div
        aria-hidden="true"
        data-slot={Slots.Icon}
        className={classes.icon}
      >
        {icon}
      </div>
    );
  };

  const renderRemove = () => {
    if (!remove) return null;

    return (
      <IconButton
        as="button"
        size="small"
        color={color}
        variant="inlined"
        className={classes.delete}
        label={{ screenReaderLabel: remove.screenReaderLabel }}
        onClick={remove.onClick}
        icon={<CloseIcon />}
        data-slot={Slots.Delete}
      />
    );
  };

  return (
    <div
      {...otherProps}
      ref={ref}
      data-slot={Slots.Root}
      className={cls(className, classes.root, classes[`root--${color}`])}
    >
      {renderIcon()}
      <span
        data-slot={Slots.Text}
        className={classes.text}
      >
        {text}
      </span>
      {renderRemove()}
    </div>
  );
};

const Tag = componentWithForwardedRef(TagBase, "Tag");

export default Tag;
