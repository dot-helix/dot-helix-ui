export type ToggleItem = {
  /**
   * The title of the item.
   */
  title: string;
  /**
   * The value of the item.
   */
  value: string;
  /**
   * If `true`, the item will be disabled.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * The icon component for the item.
   */
  icon?: React.ReactNode;
  /**
   * If `true`, the title will be hidden.
   *
   * @default false
   */
  hideTitle?: boolean;
};
