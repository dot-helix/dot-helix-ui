import { type Select } from "@styleless-ui/react";
import Tag from "../../Tag";
import classes from "../Select.module.css";
import type { OptionItem } from "../types";

type Props = {
  selectedValue: string | string[];
  getItemFromValue: (value: string) => Omit<OptionItem, "type"> | undefined;
  makeRemoveValue: Select.RootRenderProps["makeRemoveOption"];
};

const SelectedValues = (props: Props) => {
  const { makeRemoveValue, getItemFromValue, selectedValue } = props;

  if (selectedValue.length === 0) return null;

  const renderSelectedValues = () => {
    if (typeof selectedValue === "string") {
      const item = getItemFromValue(selectedValue);

      if (!item) return "Unknown";

      return item.title;
    }

    return selectedValue.map(v => {
      const item = getItemFromValue(v);

      if (!item) return null;

      const removeValue = makeRemoveValue(v);

      return (
        <Tag
          key={item.title + item.value}
          color="primary"
          className={classes["input-value"]}
          text={item.title}
          remove={{
            onClick: removeValue,
            screenReaderLabel: `Remove ${item.title} selected option.`,
          }}
          data-entity={v}
        />
      );
    });
  };

  return <>{renderSelectedValues()}</>;
};

export default SelectedValues;
