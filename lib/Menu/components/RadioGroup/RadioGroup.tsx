import { Menu as StylelessMenu } from "@styleless-ui/react";
import { useDeterministicId } from "@styleless-ui/react/utils";
import classes from "../../Menu.module.css";
import { GroupTitle as GroupTitleSlot } from "../../slots";
import type { RadioGroupItem } from "../../types";
import Radio from "./components/Radio";

type Props = Omit<RadioGroupItem, "type"> & {
  scopeId: string;
};

const RadioGroup = (props: Props) => {
  const { title, scopeId, options, onValueChange, value } = props;

  const id = useDeterministicId(undefined, scopeId);
  const labelId = `${id}__label`;

  const renderOptions = () =>
    options.map(option => (
      <Radio
        key={option.title + option.value}
        scopeId={scopeId}
        {...option}
      />
    ));

  return (
    <StylelessMenu.RadioGroup
      id={id}
      value={value}
      onValueChange={onValueChange}
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
      {renderOptions()}
    </StylelessMenu.RadioGroup>
  );
};

export default RadioGroup;
