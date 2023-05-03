/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Expandable as StylelessExpandable } from "@styleless-ui/react";
import cls from "classnames";
import * as React from "react";
import { useTheme } from "../configuration";
import { ChevronLeftIcon, ChevronRightIcon } from "../internals";
import classes from "./Expandable.module.css";

type OwnProps = Pick<
  StylelessExpandable.RootProps,
  "expanded" | "defaultExpanded" | "onExpandChange"
> & {
  /**
   * The className applied to the component.
   */
  className?: string;
  /**
   * The title of the component.
   */
  title: string;
  /**
   * The className applied to the title component.
   */
  titleClassName?: string;
  /**
   * The icon that indicates `expanded` state of the component.
   */
  icon?: ((ctx: { expanded: boolean }) => React.ReactNode) | null;
  /**
   * The position of the icon.
   * @default "start";
   */
  iconPosition?: "start" | "end";
  /**
   * The className applied to the icon component.
   */
  iconClassName?: string;
  /**
   * The content of the component.
   */
  content: React.ReactNode;
  /**
   * The className applied to the content component.
   */
  contentClassName?: string;
  /**
   * The size of the component.
   * @default "medium"
   */
  size?: "large" | "medium" | "small";
};

export type Props = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof OwnProps | "defaultChecked" | "defaultValue"
> &
  OwnProps;

const ExpandableBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    className,
    expanded,
    defaultExpanded,
    titleClassName,
    iconClassName,
    contentClassName,
    content,
    title,
    icon,
    size = "medium",
    iconPosition = "start",
    ...otherProps
  } = props;

  const direction = useTheme().direction;

  const renderChildren = (expanded: boolean): React.ReactNode => {
    const iconComponent =
      icon === undefined ? (
        direction === "ltr" ? (
          <ChevronRightIcon className={classes.icon} />
        ) : (
          <ChevronLeftIcon className={classes.icon} />
        )
      ) : (
        icon?.({ expanded })
      );

    const titleComponent = (
      <StylelessExpandable.Trigger
        as="button"
        className={({ focusedVisible }) =>
          cls(titleClassName, classes.trigger, {
            [classes["trigger--focus-visible"]!]: focusedVisible,
          })
        }
      >
        {iconComponent && iconPosition === "start" && (
          <div className={cls(iconClassName, classes["icon-wrapper"])}>
            {iconComponent}
          </div>
        )}
        <span className={classes.title}>{title}</span>
        {iconComponent && iconPosition === "end" && (
          <div className={cls(iconClassName, classes["icon-wrapper"])}>
            {iconComponent}
          </div>
        )}
      </StylelessExpandable.Trigger>
    );

    const contentComponent = (
      <StylelessExpandable.Content
        className={cls(contentClassName, classes["content-wrapper"])}
      >
        <div className={classes["content-container"]}>
          <div className={classes.content}>{content}</div>
        </div>
      </StylelessExpandable.Content>
    );

    return (
      <>
        {titleComponent}
        {contentComponent}
      </>
    );
  };

  return (
    <StylelessExpandable.Root
      {...otherProps}
      ref={ref}
      className={({ expanded }) =>
        cls(
          className,
          classes.root,
          classes[`root--${direction}`],
          classes[`root--${size}`],
          {
            [classes["root--expanded"]!]: expanded,
          },
        )
      }
      expanded={expanded}
      defaultExpanded={defaultExpanded}
    >
      {({ expanded }) => renderChildren(expanded)}
    </StylelessExpandable.Root>
  );
};

const Expandable = React.forwardRef(ExpandableBase) as typeof ExpandableBase;

export default Expandable;
