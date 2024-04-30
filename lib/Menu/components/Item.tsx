import { Menu as StylelessMenu } from "@styleless-ui/react";
import { useDeterministicId } from "@styleless-ui/react/utils";
import { combineClasses as cls } from "../../utils";
import classes from "../Menu.module.css";
import {
  ItemEndContent as ItemEndContentSlot,
  ItemExpandIcon as ItemExpandIconSlot,
  ItemIcon as ItemIconSlot,
  ItemTitle as ItemTitleSlot,
} from "../slots";
import type { NormalItem } from "../types";

type Props = Omit<NormalItem, "type" | "subMenu"> & {
  scopeId: string;
  subMenuContent?: React.ReactNode;
  expandIcon: React.ReactElement;
};

const Item = (props: Props) => {
  const {
    scopeId,
    title,
    disabled,
    endContent,
    expandIcon,
    icon,
    subMenuContent,
    onSelect,
  } = props;

  const id = useDeterministicId(undefined, scopeId);
  const labelId = `${id}__label`;

  const renderSubMenu = () => {
    if (!subMenuContent) return undefined;

    return (
      <StylelessMenu.SubMenu
        className={({ open }) =>
          cls(classes.submenu, { [classes["submenu--open"]!]: open })
        }
      >
        {subMenuContent}
      </StylelessMenu.SubMenu>
    );
  };

  const renderIcon = () => {
    if (!icon) return null;

    return (
      <div
        aria-hidden="true"
        className={classes["item-icon"]}
        data-slot={ItemIconSlot}
      >
        {icon}
      </div>
    );
  };

  const renderEndContent = () => {
    if (!endContent) return null;

    return (
      <div
        className={classes["item-end"]}
        data-slot={ItemEndContentSlot}
      >
        {endContent}
      </div>
    );
  };

  const renderExpandIcon = (expandable: boolean) => {
    if (!expandable) return null;

    return (
      <div
        aria-hidden="true"
        className={classes["item-expand-icon"]}
        data-slot={ItemExpandIconSlot}
      >
        {expandIcon}
      </div>
    );
  };

  return (
    <StylelessMenu.Item
      id={id}
      className={({ active, disabled, expandable, expanded }) =>
        cls(classes.item, {
          [classes["item--active"]!]: active,
          [classes["item--disabled"]!]: disabled,
          [classes["item--expandable"]!]: expandable,
          [classes["item--expanded"]!]: expanded,
        })
      }
      aria-labelledby={labelId}
      subMenu={renderSubMenu()}
      disabled={disabled}
      onSelect={onSelect}
    >
      {({ expandable }) => (
        <>
          {renderIcon()}
          <span
            id={labelId}
            className={classes["item-title"]}
            data-slot={ItemTitleSlot}
          >
            {title}
          </span>
          {renderEndContent()}
          {renderExpandIcon(expandable)}
        </>
      )}
    </StylelessMenu.Item>
  );
};

export default Item;
