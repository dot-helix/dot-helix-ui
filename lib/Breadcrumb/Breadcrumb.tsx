import { Breadcrumb as StylelessBreadcrumb } from "@styleless-ui/react";
import cls from "classnames";
import * as React from "react";
import classes from "./Breadcrumb.module.css";

type Item = {
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
   * Providing this option will prevent the default behavior of the event.
   */
  onClick?: (href: string) => void;
};

interface OwnProps {
  /**
   * The breadcrumb items.
   */
  items: Item[];
  /**
   * The custom separator of the items.
   * @default "/"
   */
  separator?: string | JSX.Element;
  /**
   * The size of the breadcrumb.
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
  ariaCurrentValue: Exclude<React.AriaAttributes["aria-current"], undefined>;
  /**
   * The label of the breadcrumb.
   */
  label:
    | {
        /**
         * Identifies the element (or elements) that labels the component.
         *
         * @see {@link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby MDN Web Docs} for more information.
         */
        labelledBy: string;
      }
    | {
        /**
         * The label to use as `aria-label` property.
         */
        screenReaderLabel: string;
      };
}

export type Props = Omit<
  React.ComponentPropsWithRef<"nav">,
  keyof OwnProps | "aria-current" | "children"
> &
  OwnProps;

const joinWithSeparator = (
  items: Props["items"],
  separator: Exclude<Props["separator"], undefined>,
  ariaCurrentValue: Props["ariaCurrentValue"]
): JSX.Element[] =>
  items
    .map((item, itemIdx) => {
      const { href, title, onClick } = item;

      const key = `${title}-${itemIdx}`;

      const isLastItem = itemIdx === items.length - 1;
      const itemElement = (
        <StylelessBreadcrumb.Item key={key} className={classes.item}>
          <a
            title={title}
            href={href}
            aria-current={isLastItem ? ariaCurrentValue : undefined}
            onClick={
              onClick
                ? e => void (e.preventDefault(), onClick(href))
                : undefined
            }
          >
            {title}
          </a>
        </StylelessBreadcrumb.Item>
      );

      const separatorItemElement = (
        <StylelessBreadcrumb.Separator
          key={`${key}-separator`}
          className={classes.separator}
          separatorSymbol={separator}
        />
      );

      return isLastItem ? [itemElement] : [itemElement, separatorItemElement];
    })
    .flat();

const BreadcrumbBase = (props: Props, ref: React.Ref<HTMLElement>) => {
  const {
    className,
    items: itemsProp,
    label,
    ariaCurrentValue,
    size = "medium",
    separator = "/",
    ...otherProps
  } = props;

  const items = joinWithSeparator(itemsProp, separator, ariaCurrentValue);

  return (
    <StylelessBreadcrumb.Root
      {...otherProps}
      ref={ref}
      label={label}
      classes={{
        root: cls(className, classes.root, classes[`root--${size}`]),
        list: classes.list
      }}
    >
      {items}
    </StylelessBreadcrumb.Root>
  );
};

const Breadcrumb = React.forwardRef(BreadcrumbBase) as typeof BreadcrumbBase;

export default Breadcrumb;
