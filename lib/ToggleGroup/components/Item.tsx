import { Toggle } from "@styleless-ui/react";
import * as React from "react";
import { combineClasses as cls } from "../../utils";
import classes from "../ToggleGroup.module.css";
import * as Slots from "../slots";
import type { ToggleItem } from "../types";

type Props = ToggleItem;

const Item = (props: Props) => {
  const { title, value, disabled, hideTitle, icon } = props;

  const [isNextSiblingPressed, setIsNextSiblingPressed] = React.useState(false);

  const renderTitle = () => {
    if (hideTitle) return null;

    return (
      <span
        className={classes["item-title"]}
        data-slot={Slots.ToggleTitle}
      >
        {title}
      </span>
    );
  };

  const renderIcon = () => {
    if (!icon) return null;

    return (
      <div
        aria-hidden="true"
        className={classes["item-icon"]}
        data-slot={Slots.ToggleIcon}
      >
        {icon}
      </div>
    );
  };

  const refCallback = React.useCallback((node: HTMLButtonElement | null) => {
    if (!node) return;

    const isPressed = node.hasAttribute("data-pressed");

    if (!isPressed) {
      setIsNextSiblingPressed(false);

      return;
    }

    const nextSibling = node.nextElementSibling as HTMLElement | null;

    if (!nextSibling) {
      setIsNextSiblingPressed(false);

      return;
    }

    setIsNextSiblingPressed(nextSibling.hasAttribute("data-pressed"));
  }, []);

  return (
    <Toggle
      ref={refCallback}
      aria-label={title}
      disabled={disabled}
      value={value}
      className={({ disabled, focusedVisible, pressed }) =>
        cls(classes.item, {
          [classes["item--has-pressed-sibling"]!]: isNextSiblingPressed,
          [classes["item--disabled"]!]: disabled,
          [classes["item--focus-visible"]!]: focusedVisible,
          [classes["item--pressed"]!]: pressed,
        })
      }
    >
      {renderIcon()}
      {renderTitle()}
    </Toggle>
  );
};

export default Item;
