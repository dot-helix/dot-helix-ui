import { TabGroup as StylelessTabGroup } from "@styleless-ui/react";
import { combineClasses as cls } from "../../utils";
import classes from "../TabGroup.module.css";
import * as Slots from "../slots";
import type { TabType } from "../types";

type Props = TabType;

const Tab = (props: Props) => {
  const { icon, title, value, disabled = false, hideTitle = false } = props;

  const renderIcon = () => {
    if (!icon) return null;

    return (
      <div
        aria-hidden="true"
        className={classes["tab-icon"]}
        data-slot={Slots.TabIcon}
      >
        {icon}
      </div>
    );
  };

  const renderTitle = () => {
    if (hideTitle) return null;

    return (
      <span
        className={classes["tab-title"]}
        data-slot={Slots.TabTitle}
      >
        {title}
      </span>
    );
  };

  return (
    <StylelessTabGroup.Tab
      aria-label={title}
      value={value}
      disabled={disabled}
      className={({ disabled, focusedVisible, selected }) =>
        cls(classes.tab, {
          [classes["tab--disabled"]!]: disabled,
          [classes["tab--selected"]!]: selected,
          [classes["tab--focus-visible"]!]: focusedVisible,
        })
      }
    >
      {renderIcon()}
      {renderTitle()}
    </StylelessTabGroup.Tab>
  );
};

export default Tab;
