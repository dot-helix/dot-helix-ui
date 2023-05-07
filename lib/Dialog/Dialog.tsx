/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Dialog as StylelessDialog } from "@styleless-ui/react";
import cls from "classnames";
import * as React from "react";
import Button, { type ButtonProps } from "../Button";
import IconButton from "../IconButton";
import { CloseIcon } from "../internals";
import classes from "./Dialog.module.css";

type Action = Pick<
  ButtonProps<"button">,
  | "text"
  | "leadingIcon"
  | "trailingIcon"
  | "disabled"
  | "className"
  | "loading"
  | "color"
  | "variant"
  | "onClick"
>;

type OwnProps = Pick<
  StylelessDialog.RootProps,
  "role" | "open" | "focusAfterClosed" | "onBackdropClick"
> & {
  /**
   * The className applied to the component.
   */
  className?: string;
  /**
   * The title of the dialog.
   */
  title: string;
  /**
   * The body of the dialog.
   */
  body: string | JSX.Element;
  /**
   * The action buttons used in the dialog.
   */
  actions?: Action[];
  /**
   * The callback is fired when X-button is clicked.
   * Providing this callback will render an X-button on the corner of the dialog.
   */
  onXButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * The label of the X-button.
   */
  xButtonScreenReaderLabel?: string;
};

export type Props = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof OwnProps | "children"
> &
  OwnProps;

const createActions = (actions: Action[]) =>
  actions.map((action, idx) => (
    <Button {...action} as="button" key={`${action.text}/${idx}`} />
  ));

const DialogBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    className,
    role,
    title,
    body,
    actions,
    open,
    focusAfterClosed,
    onBackdropClick,
    onXButtonClick,
    xButtonScreenReaderLabel = "Close dialog",
    ...otherProps
  } = props;

  return (
    <StylelessDialog.Root
      {...otherProps}
      ref={ref}
      role={role}
      open={open}
      focusAfterClosed={focusAfterClosed}
      onBackdropClick={onBackdropClick}
      classes={{
        root: cls(className, classes.root),
        backdrop: classes.backdrop,
      }}
    >
      <StylelessDialog.Content className={classes.content}>
        <StylelessDialog.Title className={classes.title} as="h2">
          {title}
          {onXButtonClick && (
            <IconButton
              className={classes.xbtn}
              variant="inlined"
              as="button"
              label={{ screenReaderLabel: xButtonScreenReaderLabel }}
              icon={<CloseIcon />}
              onClick={onXButtonClick}
            />
          )}
        </StylelessDialog.Title>
        <StylelessDialog.Description className={classes.description} as="p">
          {body}
        </StylelessDialog.Description>
        {typeof actions !== "undefined" && actions.length > 0 && (
          <div className={classes.actions} data-slot="Dialog:Actions">
            {createActions(actions)}
          </div>
        )}
      </StylelessDialog.Content>
    </StylelessDialog.Root>
  );
};

const Dialog = React.forwardRef(DialogBase) as typeof DialogBase;

export default Dialog;
