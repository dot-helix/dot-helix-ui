import { defaultThemeTokens, type ZIndexeTokens } from "../../theming";

const generateClasses = () => {
  const zIndexKeys = Object.keys(
    defaultThemeTokens.zIndexes,
  ) as Array<`${keyof ZIndexeTokens}`>;

  const generateForKey = (key: `${keyof ZIndexeTokens}`) => `
  .hui-z-${key} {
    z-index: var(--z-${key})
  }`;

  return zIndexKeys.map(generateForKey).join("\n");
};

const zIndexUtilityClasses = generateClasses();

export default zIndexUtilityClasses;
