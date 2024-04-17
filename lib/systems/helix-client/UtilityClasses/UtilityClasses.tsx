import overflowUtilityClasses from "./overflow-classes";
import overscrollUtilityClasses from "./overscroll-classes";
import sizeUtilityClasses from "./size-classes";
import spacingUtilityClasses from "./spacing-classes";
import userSelectUtilityClasses from "./user-select-classes";
import zIndexUtilityClasses from "./zindex-classes";

export type Props = {
  enable: boolean;
};

const classes = [
  spacingUtilityClasses,
  zIndexUtilityClasses,
  overflowUtilityClasses,
  overscrollUtilityClasses,
  sizeUtilityClasses,
  userSelectUtilityClasses,
]
  .join("\n")
  .replaceAll("\n", "");

const UtilityClasses = (props: Props) => {
  const { enable } = props;

  if (!enable) return null;

  return (
    <style
      data-name="HelixUtilityClasses"
      dangerouslySetInnerHTML={{ __html: classes }}
    />
  );
};

export default UtilityClasses;
