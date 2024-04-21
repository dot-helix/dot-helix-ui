import type { MergeElementProps } from "@styleless-ui/react";
import { componentWithForwardedRef } from "@styleless-ui/react/utils";
import * as React from "react";
import Icon, { type IconProps } from "../../Icon";

type OwnProps = Pick<IconProps, "className" | "color" | "title" | "size">;

export type Props = Omit<MergeElementProps<"svg", OwnProps>, "children">;

const CloseIconBase = (props: Props, ref: React.Ref<SVGSVGElement>) => (
  <Icon
    {...props}
    ref={ref}
    pathData="M13.3945 12.0002L18.3435 7.05025C18.7345 6.66025 18.7345 6.02725 18.3435 5.63625C17.9535 5.24625 17.3205 5.24625 16.9295 5.63625L11.9805 10.5862L7.03049 5.63625C6.63949 5.24625 6.00649 5.24625 5.61649 5.63625C5.22549 6.02725 5.22549 6.66025 5.61649 7.05025L10.5665 12.0002L5.61649 16.9502C5.22549 17.3403 5.22549 17.9733 5.61649 18.3643C5.81149 18.5592 6.06749 18.6573 6.32349 18.6573C6.57949 18.6573 6.83449 18.5592 7.03049 18.3643L11.9805 13.4143L16.9295 18.3643C17.1245 18.5592 17.3805 18.6573 17.6365 18.6573C17.8925 18.6573 18.1485 18.5592 18.3435 18.3643C18.7345 17.9733 18.7345 17.3403 18.3435 16.9502L13.3945 12.0002Z"
  />
);

const CloseIcon = componentWithForwardedRef(CloseIconBase, "CloseIcon");

export default CloseIcon;
