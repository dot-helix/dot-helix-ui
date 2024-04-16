import overflowUtilityClasses from "./overflow-classes";
import overscrollUtilityClasses from "./overscroll-classes";
import sizeUtilityClasses from "./size-classes";
import spacingUtilityClasses from "./spacing-classes";
import userSelectUtilityClasses from "./user-select-classes";
import zIndexUtilityClasses from "./zindex-classes";

export type Props = {
  enable: boolean;
};

const UtilityClasses = (props: Props) => {
  const { enable } = props;

  if (!enable) return null;

  return (
    <style data-name="HelixUtilityClasses">
      {spacingUtilityClasses}
      {zIndexUtilityClasses}
      {overflowUtilityClasses}
      {overscrollUtilityClasses}
      {sizeUtilityClasses}
      {userSelectUtilityClasses}
    </style>
  );
};

export default UtilityClasses;
