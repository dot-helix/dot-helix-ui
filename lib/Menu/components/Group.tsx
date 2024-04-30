import { Menu as StylelessMenu } from "@styleless-ui/react";
import { useDeterministicId } from "@styleless-ui/react/utils";
import type * as React from "react";
import classes from "../Menu.module.css";
import { GroupTitle as GroupTitleSlot } from "../slots";

type Props = {
  title: string;
  scopeId: string;
  content: React.ReactNode;
};

const Group = (props: Props) => {
  const { title, scopeId, content } = props;

  const id = useDeterministicId(undefined, scopeId);
  const labelId = `${id}__label`;

  return (
    <StylelessMenu.Group
      id={id}
      className={classes.group}
      label={{ labelledBy: labelId }}
    >
      <span
        id={labelId}
        className={classes["group-title"]}
        data-slot={GroupTitleSlot}
      >
        {title}
      </span>
      {content}
    </StylelessMenu.Group>
  );
};

export default Group;
