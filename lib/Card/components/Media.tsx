import {
  PreserveAspectRatio,
  type MergeElementProps,
} from "@styleless-ui/react";
import * as React from "react";
import type { CommonProps } from "../../types";
import { combineClasses as cls, componentWithForwardedRef } from "../../utils";
import classes from "../Card.module.css";
import * as Slots from "../slots";

type OwnProps = Pick<CommonProps, "children" | "className"> & {
  /**
   * The ratio which needs to be preserved.
   */
  preserveAspectRatio?: number;
};

export type Props = MergeElementProps<"div", OwnProps>;

const MediaBase = (props: Props, ref: React.Ref<HTMLDivElement>) => {
  const { className, children, preserveAspectRatio, ...otherProps } = props;

  const renderContent = () => {
    if (preserveAspectRatio) {
      return (
        <PreserveAspectRatio ratio={preserveAspectRatio}>
          {children}
        </PreserveAspectRatio>
      );
    }

    return <>{children}</>;
  };

  return (
    <div
      {...otherProps}
      ref={ref}
      data-slot={Slots.Media}
      className={cls(className, classes.media)}
    >
      {renderContent()}
    </div>
  );
};

const Media = componentWithForwardedRef(MediaBase, "Card.Media");

export default Media;
