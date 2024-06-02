import type { IconButtonProps } from "../IconButton";

export type CardHeaderAction = Pick<
  IconButtonProps<"button">,
  "icon" | "disabled" | "loading" | "onClick"
> & {
  /**
   * The label to use as `aria-label` property.
   */
  screenReaderLabel: string;
};
