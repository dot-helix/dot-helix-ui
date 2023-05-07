/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Toast as StylelessToast } from "@styleless-ui/react";
import cls from "classnames";
import * as React from "react";
import Button, { type ButtonProps } from "../Button";
import classes from "./Toast.module.css";

type Action = Pick<
  ButtonProps<"button">,
  | "text"
  | "leadingIcon"
  | "trailingIcon"
  | "className"
  | "color"
  | "variant"
  | "onClick"
>;

type OwnProps = Pick<
  StylelessToast.RootProps,
  "open" | "focusAfterClosed" | "role" | "duration" | "onDurationEnd"
> & {
  /**
   * The className applied to the toast.
   */
  className?: string;
  /**
   * The text content of the toast.
   */
  text: string;
  /**
   * The action buttons used in the snackbar.
   */
  actions?: Action[];
  /**
   * The placement of the toast.
   * @default "bottom-center"
   */
  placement?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
};

export type Props = Omit<
  React.ComponentPropsWithRef<"div">,
  | keyof OwnProps
  | "children"
  | "onDurationChange"
  | "onDurationChangeCapture"
  | "placeholder"
  | "defaultValue"
  | "defaultChecked"
> &
  OwnProps;

const createActions = (actions: Action[]) =>
  actions.map((action, idx) => (
    <StylelessToast.Action
      {...{ size: "small" }}
      {...action}
      as={Button}
      key={`${action.text}/${idx}`}
    />
  ));

const ToastBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    className,
    actions,
    text,
    placement = "bottom-center",
    ...otherProps
  } = props;

  return (
    <StylelessToast.Root
      {...otherProps}
      ref={ref}
      className={({ openState }) =>
        cls(className, classes.root, classes[`root--${placement}`], {
          [classes[`root--open`]!]: openState,
        })
      }
    >
      <StylelessToast.Content className={classes.content}>
        <span className={classes.text}>{text}</span>
        {typeof actions !== "undefined" && actions.length > 0 && (
          <div data-slot="Toast:Actions" className={classes.actions}>
            {createActions(actions)}
          </div>
        )}
      </StylelessToast.Content>
    </StylelessToast.Root>
  );
};

const Toast = React.forwardRef(ToastBase) as typeof ToastBase;

export default Toast;
