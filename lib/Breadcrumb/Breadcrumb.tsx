import { Breadcrumb as StylelessBreadcrumb } from "@styleless-ui/react";
import * as React from "react";
import type { CommonProps } from "../types";
import { combineClasses as cls, componentWithForwardedRef } from "../utils";
import classes from "./Breadcrumb.module.css";

export type Item = {
  /**
   * The title of the breadcrumb item.
   */
  title: string;
  /**
   * The href of the breadcrumb item.
   */
  href: string;
  /**
   * The click event handler.
   */
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type OwnProps = Pick<CommonProps, "className"> &
  Pick<StylelessBreadcrumb.RootProps, "label"> & {
    /**
     * The breadcrumb items.
     */
    items: Item[];
    /**
     * The custom separator of the items.
     *
     * @default "/"
     */
    separator?: string | JSX.Element;
    /**
     * The size of the breadcrumb.
     *
     * @default "medium"
     */
    size?: "large" | "medium" | "small";
    /**
     * This value indicates that the last breadcrumb item represents the current item within a container or set of related elements.
     *
     * `page`: Represents the current page within a set of pages such as the link to the current document in a breadcrumb.\
     * `step`: Represents the current step within a process such as the current step in an enumerated multi step checkout flow.\
     * `location`: Represents the current location within an environment or context such as the image that is visually highlighted as the current component of a flow chart.\
     * `date`: Represents the current date within a collection of dates such as the current date within a calendar.\
     * `time`: Represents the current time within a set of times such as the current time within a timetable.\
     * `true`: Represents the current item within a set.\
     * `false`: Does not represent the current item within a set.
     *
     * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current MDN Web Docs} for more information.
     */
    currentValue: Exclude<React.AriaAttributes["aria-current"], undefined>;
  };

export type Props = Omit<
  React.ComponentPropsWithRef<"nav">,
  keyof OwnProps | "aria-current" | "children"
> &
  OwnProps;

const BreadcrumbBase = (props: Props, ref: React.Ref<HTMLElement>) => {
  const {
    className,
    items,
    label,
    currentValue,
    size = "medium",
    separator = "/",
    ...otherProps
  } = props;

  const renderItems = () => {
    return items.reduce((result, item, itemIdx) => {
      const { href, title, onClick } = item;

      const key = `${title}-${itemIdx}`;

      const isLastItem = itemIdx === items.length - 1;

      const handleClick: React.MouseEventHandler<HTMLAnchorElement> = event => {
        onClick?.(event);

        if (isLastItem) event.preventDefault();
      };

      const itemElement = (
        <StylelessBreadcrumb.Item
          key={key}
          className={classes.item}
        >
          <a
            title={title}
            href={href}
            aria-current={isLastItem ? currentValue : undefined}
            onClick={handleClick}
          >
            {title}
          </a>
        </StylelessBreadcrumb.Item>
      );

      if (isLastItem) {
        result.push(itemElement);

        return result;
      }

      result.push(
        itemElement,
        <StylelessBreadcrumb.SeparatorItem
          key={`${key}-separator`}
          className={classes.separator}
          separatorSymbol={separator}
        />,
      );

      return result;
    }, [] as JSX.Element[]);
  };

  return (
    <StylelessBreadcrumb.Root
      {...otherProps}
      ref={ref}
      label={label}
      data-size={size}
      className={cls(className, classes.root, classes[`root--${size}`])}
    >
      <StylelessBreadcrumb.List className={classes.list}>
        {renderItems()}
      </StylelessBreadcrumb.List>
    </StylelessBreadcrumb.Root>
  );
};

const Breadcrumb = componentWithForwardedRef(BreadcrumbBase, "Breadcrumb");

export default Breadcrumb;
