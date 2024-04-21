import type { MergeElementProps } from "@styleless-ui/react";
import cls from "classnames";
import * as React from "react";
import IconButton from "../IconButton";
import { CopyIcon } from "../internals";
import type { CommonProps } from "../types";
import { componentWithForwardedRef, useCopyToClipboard } from "../utils";
import classes from "./CodeSnippet.module.css";
import * as Slots from "./slots";

type OwnProps = Pick<CommonProps, "className"> & {
  /**
   * The text content of the component.
   */
  text: string;
  /**
   * The variant of the code snippet.
   *
   * If `variant="block"`, the component will be rendered as a `<pre>` element.
   * otherwise, the component will be rendered as a `<code>` element.
   *
   * @default "inline"
   */
  variant?: "inline" | "block";
  /**
   * If `true`, the copy to clipboard action will be rendered on hover.
   *
   * @default false
   */
  displayCopyAction?: boolean;
};

export type Props = Omit<
  MergeElementProps<"pre", OwnProps>,
  "children" | "value" | "defaultValue" | "checked" | "defaultChecked"
>;

const CodeSnippetBase = (props: Props, ref: React.Ref<HTMLPreElement>) => {
  const {
    className,
    text,
    variant = "inline",
    displayCopyAction = false,
    ...otherProps
  } = props;

  const copyToClipboard = useCopyToClipboard();

  const RootNode: "pre" | "code" = variant === "inline" ? "code" : "pre";

  const renderCopyAction = () => {
    if (!displayCopyAction) return null;

    return (
      <IconButton
        className={classes["copy-btn"]}
        size="small"
        data-slot={Slots.CopyBtn}
        onClick={() => void copyToClipboard(text)}
        label={{ screenReaderLabel: "Copy to clipboard" }}
        icon={<CopyIcon />}
      />
    );
  };

  return (
    <RootNode
      {...otherProps}
      ref={ref}
      data-slot={Slots.Root}
      className={cls(className, classes.root, {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        [classes[`root--block`]!]: variant === "block",
      })}
    >
      {text}
      {renderCopyAction()}
    </RootNode>
  );
};

const CodeSnippet = componentWithForwardedRef(CodeSnippetBase, "CodeSnipper");

export default CodeSnippet;
