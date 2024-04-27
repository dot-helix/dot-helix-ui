/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Dialog as StylelessDialog,
  type MergeElementProps,
} from "@styleless-ui/react";
import { setRef, useEventCallback } from "@styleless-ui/react/utils";
import * as React from "react";
import Button, { type ButtonProps } from "../Button";
import IconButton from "../IconButton";
import { CloseIcon } from "../internals";
import type { CommonProps } from "../types";
import {
  combineClasses as cls,
  componentWithForwardedRef,
  useDeterministicId,
} from "../utils";
import classes from "./Dialog.module.css";

type Action = Pick<
  ButtonProps<"button">,
  "text" | "endIcon" | "startIcon" | "disabled" | "loading" | "onClick"
>;

type OwnProps = Pick<StylelessDialog.RootProps, "role" | "open" | "onClose"> &
  Pick<CommonProps, "className"> & {
    /**
     * The title of the dialog.
     */
    title: string;
    /**
     * The main content of the dialog.
     */
    content: React.ReactNode;
    /**
     * The cancel action button used in the dialog.
     */
    cancelAction: Action;
    /**
     * The ok action button used in the dialog.
     */
    okAction: Action;
  };

export type Props = Omit<MergeElementProps<"div", OwnProps>, "children">;

const DialogBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const {
    id: idProp,
    open,
    role,
    title,
    content,
    className,
    cancelAction,
    okAction,
    onClose,
    ...otherProps
  } = props;

  const scopeId = useDeterministicId(idProp, "hui-dialog-scope");
  const cancelBtnId = `${scopeId}__cancel-btn`;
  const okBtnId = `${scopeId}__ok-btn`;

  const [keepMounted, setKeepMounted] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  const renderBodyContent = () => {
    if (typeof content === "string") {
      return (
        <StylelessDialog.Description as="p">
          {content}
        </StylelessDialog.Description>
      );
    }

    return content;
  };

  const handleTransitionEnd = useEventCallback<
    React.TransitionEvent<HTMLDivElement>
  >(event => {
    if (event.propertyName !== "visibility") return;

    if (!open) setKeepMounted(false);
    else setKeepMounted(true);
  });

  const refCallback = React.useCallback(
    (node: HTMLDivElement | null) => {
      setRef(ref, node);

      if (!node) return;

      if (open) setIsVisible(true);
      else setIsVisible(false);
    },
    [open, ref],
  );

  return (
    <StylelessDialog.Root
      {...otherProps}
      keepMounted={keepMounted}
      id={scopeId}
      ref={refCallback}
      role={role}
      open={open}
      onClose={onClose}
      onTransitionEnd={handleTransitionEnd}
      className={cls(className, classes.root, {
        [classes["root--visible"]!]: isVisible,
      })}
    >
      <StylelessDialog.Backdrop className={classes.backdrop} />
      <StylelessDialog.Content className={classes.content}>
        <div className={classes.heading}>
          <StylelessDialog.Title
            className={classes.title}
            as="h2"
          >
            {title}
          </StylelessDialog.Title>
          <IconButton
            className={classes.xbtn}
            variant="inlined"
            as="button"
            label={{ labelledBy: cancelBtnId }}
            icon={<CloseIcon />}
            onClick={onClose}
          />
        </div>
        <div className={classes.body}>{renderBodyContent()}</div>
        <div
          className={classes.actions}
          data-slot="Dialog:Actions"
        >
          <Button
            {...okAction}
            id={okBtnId}
            as="button"
            color="primary"
          />
          <Button
            onClick={onClose}
            {...cancelAction}
            id={cancelBtnId}
            as="button"
            color="neutral"
            variant="inlined"
          />
        </div>
      </StylelessDialog.Content>
    </StylelessDialog.Root>
  );
};

const Dialog = componentWithForwardedRef(DialogBase, "Dialog");

export default Dialog;
