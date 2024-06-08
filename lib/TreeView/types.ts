export type TreeViewItem = {
  /**
   * The title of the item.
   */
  title: string;
  /**
   * The value of the item when selected or expanded.
   * Works as an unique identifier for the item.
   */
  value: string;
  /**
   * The icon element placed before title.
   */
  icon?: React.ReactNode;
  /**
   * If `true`, the item will be disabled.
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * The children of the item.
   */
  children?: TreeViewItem[];
};
