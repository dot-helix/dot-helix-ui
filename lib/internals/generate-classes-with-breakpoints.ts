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
      const baseModifierClass = `${modifierBaseName}-${String(value)}`;

      if ((propKey as PropValueType) === "fallback") {
        return classes[`${selfName}--${baseModifierClass}`];
      }

      return classes[`${selfName}--${propKey}-${baseModifierClass}`];
    });
  }

  return classes[
    `${selfName}--${modifierBaseName}-${String(propWithBreakpoints)}`
  ];
};

export default generateClassesWithBreakpoints;
