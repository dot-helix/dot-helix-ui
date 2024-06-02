import type { MergeElementProps } from "@styleless-ui/react";
import { setRef } from "@styleless-ui/react/utils";
import * as React from "react";
import IconButton from "../../IconButton";
import type { CommonProps } from "../../types";
import { combineClasses as cls, componentWithForwardedRef } from "../../utils";
import classes from "../Card.module.css";
import { useCardContext } from "../Context";
import * as Slots from "../slots";
import type { CardHeaderAction } from "../types";

type OwnProps = Pick<CommonProps, "className"> & {
  /**
   * The main action to display in the header.
   */
  action?: CardHeaderAction;
  /**
   * The main title of the header.
   */
  title: string;
  /**
   * The sub-title of the header.
   */
  subtitle?: string;
};

export type Props = Omit<MergeElementProps<"div", OwnProps>, "children">;

const HeaderBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, action, title, subtitle, ...otherProps } = props;

  const { scopeId, titleId, subtitleId, smaller } = useCardContext();

  const renderSubTitle = () => {
    if (!subtitle) return null;

    return (
      <span
        id={subtitleId}
        data-slot={Slots.HeaderSubTitle}
        className={classes["header-subtitle"]}
      >
        {subtitle}
      </span>
    );
  };

  const renderAction = () => {
    if (!action) return null;

    const { icon, screenReaderLabel, disabled, loading, onClick } = action;

    return (
      <IconButton
        className={classes["header-action"]}
        size={smaller ? "small" : "medium"}
        variant="inlined"
        icon={icon}
        label={{ screenReaderLabel }}
        disabled={disabled}
        loading={loading}
        onClick={onClick}
      />
    );
  };

  const refCallback = (node: HTMLDivElement | null) => {
    setRef(ref, node);

    if (!node) return;

    const root = document.getElementById(scopeId);

    if (!root) return;

    let labelledBy = titleId;

    if (subtitle) labelledBy += ` ${subtitleId}`;

    root.setAttribute("aria-labelledby", labelledBy);
  };

  return (
    <div
      {...otherProps}
      ref={refCallback}
      data-slot={Slots.Header}
      className={cls(className, classes.header)}
    >
      <div
        data-slot={Slots.HeaderHeadings}
        className={classes["header-headings"]}
      >
        <strong
          id={titleId}
          data-slot={Slots.HeaderTitle}
          className={classes["header-title"]}
        >
          {title}
        </strong>
        {renderSubTitle()}
      </div>
      {renderAction()}
    </div>
  );
};

const Header = componentWithForwardedRef(HeaderBase, "Card.Header");

export default Header;
