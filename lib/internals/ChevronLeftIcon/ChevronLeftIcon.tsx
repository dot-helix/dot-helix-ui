import type { MergeElementProps } from "@styleless-ui/react";
import { componentWithForwardedRef } from "@styleless-ui/react/utils";
import * as React from "react";
import Icon, { type IconProps } from "../../Icon";

type OwnProps = Pick<IconProps, "className" | "color" | "title" | "size">;

export type Props = Omit<MergeElementProps<"svg", OwnProps>, "children">;

const ChevronLeftIconBase = (props: Props, ref: React.Ref<SVGSVGElement>) => (
  <Icon
    {...props}
    ref={ref}
    pathData="M10.8125 11.9999L14.6865 8.12586C15.0785 7.73386 15.0785 7.09886 14.6865 6.70686C14.2935 6.31386 13.6595 6.31386 13.2665 6.70686L8.6825 11.2909C8.2915 11.6829 8.2915 12.3169 8.6825 12.7089L13.2665 17.2929C13.4625 17.4889 13.7195 17.5869 13.9765 17.5869C14.2335 17.5869 14.4905 17.4889 14.6865 17.2929C15.0785 16.9009 15.0785 16.2659 14.6865 15.8739L10.8125 11.9999Z"
  />
);

const ChevronLeftIcon = componentWithForwardedRef(
  ChevronLeftIconBase,
  "ChevronLeftIcon",
);

export default ChevronLeftIcon;
