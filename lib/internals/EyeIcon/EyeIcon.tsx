import type { MergeElementProps } from "@styleless-ui/react";
import { componentWithForwardedRef } from "@styleless-ui/react/utils";
import * as React from "react";
import Icon, { type IconProps } from "../../Icon";

type OwnProps = Pick<IconProps, "className" | "color" | "title" | "size">;

export type Props = Omit<MergeElementProps<"svg", OwnProps>, "children">;

const EyeIconBase = (props: Props, ref: React.Ref<SVGSVGElement>) => (
  <Icon
    {...props}
    ref={ref}
    pathData="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z"
  />
);

const EyeIcon = componentWithForwardedRef(EyeIconBase, "EyeIcon");

export default EyeIcon;
