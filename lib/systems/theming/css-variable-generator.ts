import {
  defaultCSSVariableGenerator,
  type CSSVariableGenerator,
} from "react-design-tokens";

const cssVariableGenerator: CSSVariableGenerator = ctx => {
  switch (ctx.tokenFamilyKey) {
    case "breakpoints": {
      return defaultCSSVariableGenerator({
        ...ctx,
        tokenFamilyKey: "breakpoint",
      });
    }

    case "direction": {
      return defaultCSSVariableGenerator({
        ...ctx,
        tokenFamilyKey: "direction",
      });
    }

    case "borderRadius": {
      if (typeof ctx.tokenValue === "number") {
        const pathSegments = ctx.tokenPath.split(".");
        const lastSegment = pathSegments[pathSegments.length - 1];

        if (lastSegment !== "full") {
          return defaultCSSVariableGenerator({
            ...ctx,
            tokenFamilyKey: "rounded",
            tokenValue: `${ctx.tokenValue / 16}rem`,
          });
        }
      }

      return defaultCSSVariableGenerator({
        ...ctx,
        tokenFamilyKey: "rounded",
      });
    }

    case "colors": {
      return defaultCSSVariableGenerator({
        ...ctx,
        tokenFamilyKey: "color",
      });
    }

    case "shadows": {
      return defaultCSSVariableGenerator({
        ...ctx,
        tokenFamilyKey: "shadow",
      });
    }

    case "spacing": {
      let value = ctx.tokenValue;

      if (typeof value === "number") value = `${value / 16}rem`;

      if (ctx.tokenKey === "0.5") {
        return { variableName: `space-half`, variableValue: value as string };
      }

      if (ctx.tokenKey === "1.5") {
        return {
          variableName: `space-1-n-half`,
          variableValue: value as string,
        };
      }

      if (ctx.tokenKey === "2.5") {
        return {
          variableName: `space-2-n-half`,
          variableValue: value as string,
        };
      }

      if (ctx.tokenKey === "3.5") {
        return {
          variableName: `space-3-n-half`,
          variableValue: value as string,
        };
      }

      return defaultCSSVariableGenerator({
        ...ctx,
        tokenFamilyKey: "space",
      });
    }

    case "zIndexes": {
      return defaultCSSVariableGenerator({
        ...ctx,
        tokenValue: String(ctx.tokenValue),
        tokenFamilyKey: "z",
      });
    }

    case "typography": {
      const path = ctx.tokenPath.replace("typefaces", "typeface");

      if (typeof ctx.tokenValue === "number") {
        const pathSegments = path.split(".");
        const lastSegment = pathSegments[pathSegments.length - 1] ?? "";

        if (["weight", "leading"].includes(lastSegment)) {
          return defaultCSSVariableGenerator({
            ...ctx,
            tokenPath: path,
            tokenValue: String(ctx.tokenValue),
          });
        }

        return defaultCSSVariableGenerator({
          ...ctx,
          tokenPath: path,
          tokenValue: `${ctx.tokenValue / 16}rem`,
        });
      }

      return defaultCSSVariableGenerator({ ...ctx, tokenPath: path });
    }

    default:
      return null;
  }
};

export default cssVariableGenerator;
