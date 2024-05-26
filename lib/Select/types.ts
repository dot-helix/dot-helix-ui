import type ValidityReason from "../ValidityReason";

export type SelectValidityState =
  | { valid: true }
  | { valid: false; reason: ValidityReason.VALUE_MISSING };

export type SelectInstance = {
  getValue: () => string | string[];
  checkValidity: () => SelectValidityState;
};

export type OptionItem = {
  /**
   * The type of the item.
   */
  type: "option";
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
};

export type OptionGroupItem = {
  type: "group";
  /**
   * The title of the group.
   */
  title: string;
  /**
   * The items of the group.
   */
  items: Array<Omit<OptionItem, "type">>;
};

export type SelectItem = OptionItem | OptionGroupItem;
