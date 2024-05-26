import { Select } from "@styleless-ui/react";
import { combineClasses as cls, useDeterministicId } from "../../utils";
import classes from "../Select.module.css";
import * as Slots from "../slots";
import type { OptionGroupItem } from "../types";
import Item from "./Item";

type Props = Omit<OptionGroupItem, "type"> & { scopeId: string };

const Group = (props: Props) => {
  const { title, items: itemsProp, scopeId } = props;

  const groupId = useDeterministicId(undefined, `${scopeId}__group`);
  const titleId = `${groupId}__title`;

  const items = itemsProp.map(item => (
    <Item
      key={item.title + item.value}
      title={item.title}
      value={item.value}
      disabled={item.disabled}
    />
  ));

  return (
    <Select.Group
      id={groupId}
      label={{ labelledBy: titleId }}
      className={({ hidden }) =>
        cls(classes.group, {
          [classes["group--hidden"]!]: hidden,
        })
      }
    >
      <span
        id={titleId}
        className={classes["group-title"]}
        data-slot={Slots.GroupTitle}
      >
        {title}
      </span>
      {items}
    </Select.Group>
  );
};

export default Group;
