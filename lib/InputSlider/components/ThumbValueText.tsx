import { combineClasses as cls } from "../../utils";
import classes from "../InputSlider.module.css";
import * as Slots from "../slots";

type Props = {
  valueText: string;
  isVisible: boolean;
};

const ThumbValueText = (props: Props) => {
  const { valueText, isVisible } = props;

  return (
    <div
      className={cls(classes["thumb-value-text"], {
        [classes["thumb-value-text--visible"]!]: isVisible,
      })}
      data-slot={Slots.ThumbValueText}
    >
      {valueText}
    </div>
  );
};

export default ThumbValueText;
