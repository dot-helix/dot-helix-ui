import { defaultThemeTokens, type SpacingTokens } from "../../theming";

const generateClasses = () => {
  const spacingKeys = Object.keys(
    defaultThemeTokens.spacing,
  ) as Array<`${keyof SpacingTokens}`>;

  const generateForKey = (key: `${keyof SpacingTokens}`) => `.hui-p-${key} {
    padding: var(--space-${key});
  }
  .hui-px-${key} {
    padding-left: var(--space-${key});
    padding-right: var(--space-${key});
  }
  .hui-py-${key} {
    padding-top: var(--space-${key});
    padding-bottom: var(--space-${key});
  }
  .hui-pt-${key} {
    padding-top: var(--space-${key});
  }
  .hui-pr-${key} {
    padding-right: var(--space-${key});
  }
  .hui-pb-${key} {
    padding-bottom: var(--space-${key});
  }
  .hui-pl-${key} {
    padding-left: var(--space-${key});
  }
  .hui-m-${key} {
    margin: var(--space-${key});
  }
  .hui-mx-${key} {
    margin-left: var(--space-${key});
    margin-right: var(--space-${key});
  }
  .hui-my-${key} {
    margin-top: var(--space-${key});
    margin-bottom: var(--space-${key});
  }
  .hui-mt-${key} {
    margin-top: var(--space-${key});
  }
  .hui-mr-${key} {
    margin-right: var(--space-${key});
  }
  .hui-mb-${key} {
    margin-bottom: var(--space-${key});
  }
  .hui-ml-${key} {
    margin-left: var(--space-${key});
  }`;

  return spacingKeys.map(generateForKey).join("\n");
};

const spacingUtilityClasses = generateClasses();

export default spacingUtilityClasses;
