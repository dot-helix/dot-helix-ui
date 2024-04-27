/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Expandable as StylelessExpandable,
  type MergeElementProps,
} from "@styleless-ui/react";
import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "../internals";
import { useTokensClient } from "../systems";
import type { CommonProps } from "../types";
import { combineClasses as cls, componentWithForwardedRef } from "../utils";
import classes from "./Expandable.module.css";
import * as Slots from "./slots";

export type IconRenderProps = Pick<
  StylelessExpandable.RootRenderProps,
  "expanded"
>;

type OwnProps = Pick<
  StylelessExpandable.RootProps,
  "expanded" | "defaultExpanded" | "onExpandChange"
> &
  Pick<CommonProps, "className" | "size"> & {
    /**
     * The title of the component.
     */
    title: string;
    /**
     * If `true`, the component will be disabled.
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * The icon that indicates `expanded` state of the component.
     */
    icon?: ((renderProps: IconRenderProps) => React.ReactNode) | null;
    /**
     * The position of the icon.
     *
     * @default "start";
     */
    iconPosition?: "start" | "end";
    /**
     * The content of the component.
     */
    content: React.ReactNode;
  };

export type Props = Omit<
  MergeElementProps<"div", OwnProps>,
  "checked" | "defaultChecked" | "value" | "defaultValue"
>;

const ExpandableBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    className,
    expanded,
    defaultExpanded,
    content,
    title,
    icon,
    disabled = false,
    size = "medium",
    iconPosition = "start",
    ...otherProps
  } = props;

  const { useDirection } = useTokensClient();

  const direction = useDirection();

  const renderTriggerContent = (expanded: boolean) => {
    let iconComponent: React.ReactNode = null;

    if (typeof icon === "function") {
      iconComponent = icon({ expanded });
    } else if (direction === "ltr") {
      iconComponent = <ChevronRightIcon className={classes.icon} />;
    } else {
      iconComponent = <ChevronLeftIcon className={classes.icon} />;
    }

    return (
      <>
        {iconPosition === "start" && (
          <div
            className={classes["icon-wrapper"]}
            data-slot={Slots.TriggerIcon}
          >
            {iconComponent}
          </div>
        )}
        <span
          className={classes.title}
          data-slot={Slots.TriggerTitle}
        >
          {title}
        </span>
        {iconPosition === "end" && (
          <div
            className={classes["icon-wrapper"]}
            data-slot={Slots.TriggerIcon}
          >
            {iconComponent}
          </div>
        )}
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
            [classes["root--disabled"]!]: disabled,
          },
        )
      }
      expanded={expanded}
      defaultExpanded={defaultExpanded}
    >
      {({ expanded }) => (
        <>
          <StylelessExpandable.Trigger
            disabled={disabled}
            className={({ focusedVisible }) =>
              cls(classes.trigger, {
                [classes["trigger--focus-visible"]!]: focusedVisible,
              })
            }
          >
            {renderTriggerContent(expanded)}
          </StylelessExpandable.Trigger>
          <StylelessExpandable.Content className={classes["content-wrapper"]}>
            <div
              className={classes["content-container"]}
              data-slot={Slots.ContentContainer}
            >
              <div
                className={classes.content}
                data-slot={Slots.ContentContent}
              >
                {content}
              </div>
            </div>
          </StylelessExpandable.Content>
        </>
      )}
    </StylelessExpandable.Root>
  );
};

const Expandable = componentWithForwardedRef(ExpandableBase, "Expandable");

export default Expandable;
