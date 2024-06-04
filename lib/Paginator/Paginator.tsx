import type { MergeElementProps } from "@styleless-ui/react";
import type { PickAsMandatory } from "@styleless-ui/react/types";
import { clamp, useControlledProp } from "@styleless-ui/react/utils";
import * as React from "react";
import IconButton, { type IconButtonProps } from "../IconButton";
import { ChevronLeftIcon, ChevronRightIcon } from "../internals";
import type { CommonProps } from "../types";
import { combineClasses as cls, componentWithForwardedRef } from "../utils";
import classes from "./Paginator.module.css";
import * as Slots from "./slots";
import { generatePages } from "./utils";

export type ActionTypes =
  | "go-next"
  | "go-previous"
  | "next-5-items"
  | "previous-5-items";

type OwnProps = Pick<CommonProps, "className" | "size" | "disabled"> & {
  /**
   * The total number of entries.
   */
  entriesCount: number;
  /**
   * The number of entries per page.
   */
  pageSize: number;
  /**
   * The page selected by default when the component's `page` prop is uncontrolled.
   */
  defaultPage?: number;
  /**
   * The current page.
   */
  page?: number;
  /**
   * The label of the paginator.
   */
  label:
    | {
        /**
         * The label to use as `aria-label` property.
         */
        screenReaderLabel: string;
      }
    | {
        /**
         * Identifies the element (or elements) that labels the paginator.
         *
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby MDN Web Docs} for more information.
         */
        labelledBy: string;
      };
  /**
   * Determines the visibility of `go-next` button.
   *
   * @default "visible"
   */
  nextButtonVisibility?: "visible" | "hidden";
  /**
   * Determines the visibility of `go-previous` button.
   *
   * @default "visible"
   */
  previousButtonVisibility?: "visible" | "hidden";
  /**
   * A function which returns a string value that provides a user-friendly
   * name for the page action. This is important for screen reader users.
   */
  overridePageLabel?: (page: number, selected: boolean) => string;
  /**
   * A function which returns a string value that provides a user-friendly
   * name for the action. This is important for screen reader users.
   */
  overrideActionLabel?: (type: ActionTypes) => string;
  /**
   * Callback fired when the page is changed.
   */
  onPageChange?: (page: number) => void;
};

export type Props = Omit<
  MergeElementProps<"nav", OwnProps>,
  | "children"
  | "value"
  | "defaultValue"
  | "checked"
  | "defaultChecked"
  | "onChange"
  | "onChangeCapture"
>;

const PaginatorBase = (props: Props, ref: React.Ref<HTMLElement>) => {
  const {
    className,
    entriesCount,
    pageSize,
    page: pageProp,
    defaultPage,
    label,
    size = "medium",
    nextButtonVisibility = "visible",
    previousButtonVisibility = "visible",
    disabled = false,
    overridePageLabel,
    overrideActionLabel,
    onPageChange,
    ...otherProps
  } = props;

  const [page, setPage] = useControlledProp(pageProp, defaultPage, 1);

  const pagesCount = Math.ceil(entriesCount / pageSize);

  const labelProps: Partial<Record<"aria-label" | "aria-labelledby", string>> =
    {};

  if ("screenReaderLabel" in label) {
    labelProps["aria-label"] = label.screenReaderLabel;
  } else {
    labelProps["aria-labelledby"] = label.labelledBy;
  }

  const isPageSelected = (targetPage: number) => page === targetPage;

  const selectedButtonProps = React.useMemo(
    () =>
      ({
        variant: "filled",
        color: "primary",
      }) satisfies PickAsMandatory<IconButtonProps, "variant" | "color">,
    [],
  );

  const unselectedButtonProps = React.useMemo(
    () =>
      ({
        variant: "inlined",
        color: "neutral",
      }) satisfies PickAsMandatory<IconButtonProps, "variant" | "color">,
    [],
  );

  const updatePage = (page: number) => {
    if (disabled) return;

    const newPage = clamp(page, 1, pagesCount);

    setPage(newPage);
    onPageChange?.(newPage);
  };

  const renderGoNext = () => {
    if (nextButtonVisibility === "hidden") return null;

    const label = overrideActionLabel?.("go-next") ?? "Go to the next page";

    const isDisabled = disabled || page === pagesCount;

    return (
      <IconButton
        variant={isDisabled ? "outlined" : "inlined"}
        disabled={isDisabled}
        size={size}
        icon={<ChevronRightIcon />}
        label={{ screenReaderLabel: label }}
        onClick={() => updatePage(page + 1)}
      />
    );
  };

  const renderGoPrevious = () => {
    if (previousButtonVisibility === "hidden") return null;

    const label =
      overrideActionLabel?.("go-previous") ?? "Go to the previous page";

    const isDisabled = disabled || page === 1;

    return (
      <IconButton
        variant={isDisabled ? "outlined" : "inlined"}
        disabled={isDisabled}
        size={size}
        icon={<ChevronLeftIcon />}
        label={{ screenReaderLabel: label }}
        onClick={() => updatePage(page - 1)}
      />
    );
  };

  const renderPages = () => {
    const next5Label = overrideActionLabel?.("next-5-items") ?? "Next 5 pages";
    const prev5Label =
      overrideActionLabel?.("previous-5-items") ?? "Previous 5 pages";

    const pages = generatePages({ page, pagesCount });

    return pages.map((pageInfo, idx) => {
      const pageNumber = Math.abs(pageInfo);
      const isDots = pageInfo < 0;

      if (isDots) {
        const isPrevDots = idx === 2;

        return (
          <IconButton
            key={String(pageInfo) + String(idx)}
            variant="inlined"
            disabled={disabled}
            size={size}
            icon={"•••"}
            label={{ screenReaderLabel: isPrevDots ? prev5Label : next5Label }}
            onClick={() => updatePage(pageNumber)}
          />
        );
      }

      const isSelected = isPageSelected(pageNumber);

      const pageLabel =
        overridePageLabel?.(pageNumber, isSelected) ?? `Go to page ${pageInfo}`;

      return (
        <IconButton
          {...(isSelected ? selectedButtonProps : unselectedButtonProps)}
          className={classes.page}
          key={String(pageInfo) + String(idx)}
          aria-current={isSelected ? "true" : undefined}
          disabled={disabled}
          size={size}
          icon={pageNumber}
          label={{ screenReaderLabel: pageLabel }}
          onClick={() => updatePage(pageNumber)}
        />
      );
    });
  };

  return (
    <nav
      {...otherProps}
      {...labelProps}
      ref={ref}
      aria-disabled={disabled}
      data-size={size}
      data-entries={entriesCount}
      data-page-size={pageSize}
      data-current-page={page}
      data-slot={Slots.Root}
      data-disabled={disabled ? "" : undefined}
      data-has-next={nextButtonVisibility === "visible" ? "" : undefined}
      data-has-prev={previousButtonVisibility === "visible" ? "" : undefined}
      className={cls(className, classes.root, {
        [classes["root--disabled"]!]: disabled,
      })}
    >
      {renderGoPrevious()}
      {renderPages()}
      {renderGoNext()}
    </nav>
  );
};

const Paginator = componentWithForwardedRef(PaginatorBase, "Paginator");

export default Paginator;
