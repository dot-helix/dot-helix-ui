import {
  TabGroup as StylelessTabGroup,
  type MergeElementProps,
} from "@styleless-ui/react";
import * as React from "react";
import { useTokensClient } from "../systems";
import type { CommonProps } from "../types";
import { combineClasses as cls, componentWithForwardedRef } from "../utils";
import classes from "./TabGroup.module.css";
import { Tab } from "./components";
import type { TabType } from "./types";

export type RenderProps = {
  /**
   * The content of the tablist.
   */
  tabs: React.ReactNode;
  /**
   * The panel content of the active tab.
   */
  activePanel: React.ReactNode;
};

type OwnProps = Pick<
  StylelessTabGroup.RootProps,
  | "activeTab"
  | "defaultActiveTab"
  | "onActiveTabChange"
  | "orientation"
  | "keyboardActivationBehavior"
> &
  Pick<StylelessTabGroup.ListProps, "label"> &
  Pick<CommonProps, "className" | "size"> & {
    /**
     * The tab items to be rendered.
     */
    tabs: TabType[];
    /**
     * The content of the component.
     * You can manage the composition of the tabs and panels.
     *
     * Omit it, if you want standalone tabgroup.
     */
    children?: (renderProps: RenderProps) => React.ReactNode;
    /**
     * If `true`, the component will fill the parent.
     *
     * @default false
     */
    fluid?: boolean;
    /**
     * If `true`, the group will be disabled.
     *
     * @default false
     */
    disabled?: boolean;
  };

export type Props = Omit<
  MergeElementProps<"div", OwnProps>,
  | "checked"
  | "defaultChecked"
  | "value"
  | "defaultValue"
  | "onChange"
  | "onChangeCapture"
  | "content"
  | "color"
>;

const TabGroupBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    tabs: tabsProp,
    label,
    className,
    children,
    orientation = "horizontal",
    size = "medium",
    disabled = false,
    fluid = false,
    ...otherProps
  } = props;

  const { useDirection } = useTokensClient();

  const direction = useDirection();

  const { tabs, panels } = tabsProp.reduce(
    (result, tab) => {
      result.tabs.push(
        <Tab
          {...tab}
          key={tab.title + tab.value}
          disabled={tab.disabled ?? disabled}
        />,
      );

      result.panels.push(
        <StylelessTabGroup.Panel
          key={tab.title + tab.value}
          className={classes.panel}
          value={tab.value}
        >
          {tab.panel}
        </StylelessTabGroup.Panel>,
      );

      return result;
    },
    {
      tabs: [] as JSX.Element[],
      panels: [] as JSX.Element[],
    },
  );

  const renderTabs = () => (
    <StylelessTabGroup.List
      label={label}
      className={classes.list}
    >
      {tabs}
    </StylelessTabGroup.List>
  );

  const renderPanels = () => <>{panels}</>;

  const renderContent = () => {
    const tabs = renderTabs();
    const panels = renderPanels();

    if (children) return children({ tabs, activePanel: panels });

    return (
      <>
        {tabs}
        {panels}
      </>
    );
  };

  return (
    <StylelessTabGroup.Root
      {...otherProps}
      ref={ref}
      orientation={orientation}
      aria-disabled={disabled}
      data-disabled={disabled ? "" : undefined}
      data-fluid={fluid ? "" : undefined}
      className={cls(
        className,
        classes.root,
        classes[`root--${orientation}`],
        classes[`root--${direction}`],
        classes[`root--${size}`],
        {
          [classes["root--fluid"]!]: fluid,
          [classes["root--disabled"]!]: disabled,
        },
      )}
    >
      {renderContent()}
    </StylelessTabGroup.Root>
  );
};

const TabGroup = componentWithForwardedRef(TabGroupBase, "TabGroup");

export default TabGroup;
