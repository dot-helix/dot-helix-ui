import cls from "classnames";
import * as React from "react";
import classes from "./CodeSnippet.module.css";

interface OwnProps {
  /**
   * The className applied to the component.
   */
  className?: string;
  /**
   * The content of the component.
   */
  text: string;
  /**
   * The variant of the code snippet.
   *
   * If `variant="block"`, the component will be rendered as a `<pre>` element.
   * otherwise, the component will be rendered as a `<code>` element.
   * @default "inline"
   */
  variant?: "inline" | "block";
}

export type Props = Omit<
  React.ComponentPropsWithRef<"pre">,
  keyof OwnProps | "children" | "defaultValue" | "defaultChecked"
> &
  OwnProps;

const CodeSnippetBase = (props: Props, ref: React.Ref<HTMLPreElement>) => {
  const { className, text, variant = "inline", ...otherProps } = props;

  const RootNode: "pre" | "code" = variant === "inline" ? "code" : "pre";

  return (
    <RootNode
      {...otherProps}
      data-slot="CodeSnippet:Root"
      ref={ref}
      className={cls(className, classes.root, {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        [classes[`root--block`]!]: variant === "block",
      })}
    >
      {text}
    </RootNode>
  );
};

const CodeSnippet = React.forwardRef(CodeSnippetBase) as typeof CodeSnippetBase;

export default CodeSnippet;
