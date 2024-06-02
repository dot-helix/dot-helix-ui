import type { PropWithBreakpoints } from "../types";

const generateClassesWithBreakpoints = <T>(
  classes: Record<string, string>,
  selfName: string,
  modifierBaseName: string,
  propWithBreakpoints: PropWithBreakpoints<T> | undefined,
) => {
  if (propWithBreakpoints == null) return undefined;

  if (typeof propWithBreakpoints === "object") {
    return Object.keys(propWithBreakpoints).map(propKey => {
      type PropValueType = keyof typeof propWithBreakpoints;

      const value = propWithBreakpoints[propKey as PropValueType];

      let baseModifierClass: string;

      if (typeof value === "boolean") {
        if (value) baseModifierClass = modifierBaseName;
        else baseModifierClass = `${modifierBaseName}-unset`;
      } else {
        baseModifierClass = `${modifierBaseName}-${String(value)}`;
      }

      return classes[`${selfName}--${propKey}-${baseModifierClass}`];
    });
  }

  const className = `${selfName}--${modifierBaseName}`;

  if (typeof propWithBreakpoints === "boolean") {
    if (propWithBreakpoints) return classes[className];
    else return undefined;
  } else {
    return classes[`${className}-${String(propWithBreakpoints)}`];
  }
};

export default generateClassesWithBreakpoints;
