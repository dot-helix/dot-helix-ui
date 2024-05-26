import type { MergeElementProps } from "@styleless-ui/react";
import { componentWithForwardedRef } from "@styleless-ui/react/utils";
import * as React from "react";
import Icon, { type IconProps } from "../../Icon";

type OwnProps = Pick<IconProps, "className" | "color" | "title" | "size">;

export type Props = Omit<MergeElementProps<"svg", OwnProps>, "children">;

const ChevronDownIconBase = (props: Props, ref: React.Ref<SVGSVGElement>) => (
  <Icon
    {...props}
    ref={ref}
    pathData="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
  />
);

const ChevronDownIcon = componentWithForwardedRef(
  ChevronDownIconBase,
  "ChevronDownIcon",
);

export default ChevronDownIcon;
