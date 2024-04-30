import type { MergeElementProps } from "@styleless-ui/react";
import { componentWithForwardedRef } from "@styleless-ui/react/utils";
import * as React from "react";
import Icon, { type IconProps } from "../../Icon";

type OwnProps = Pick<IconProps, "className" | "color" | "title" | "size">;

export type Props = Omit<MergeElementProps<"svg", OwnProps>, "children">;

const DotIconBase = (props: Props, ref: React.Ref<SVGSVGElement>) => (
  <Icon
    {...props}
    ref={ref}
    pathData="M12,10A2,2 0 0,0 10,12C10,13.11 10.9,14 12,14C13.11,14 14,13.11 14,12A2,2 0 0,0 12,10Z"
  />
);

const DotIcon = componentWithForwardedRef(DotIconBase, "DotIcon");

export default DotIcon;
