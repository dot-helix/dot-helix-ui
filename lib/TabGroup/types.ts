export type TabType = {
  /**
   * The title of the tab.
   */
  title: string;
  /**
   * The value of the tab.
   * Works as an unique identifier for the tab.
   */
  value: string;
  /**
   * The panel content of the tab.
   */
  panel: React.ReactNode;
  /**
   * If `true`, the tab will be disabled.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the title will be hidden.
   *
   * @default false
   */
  hideTitle?: boolean;
  /**
   * The icon component for the tab.
   */
  icon?: React.ReactNode;
};
