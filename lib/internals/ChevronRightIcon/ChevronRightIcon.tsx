import * as React from "react";
import Icon, { type IconProps } from "../../Icon";

type OwnProps = Pick<
  IconProps,
  "className" | "color" | "title" | "color" | "size"
>;

export type Props = Omit<
  React.ComponentPropsWithRef<"svg">,
  keyof OwnProps | "children"
> &
  OwnProps;

const ChevronRightIconBase = (props: Props, ref: React.Ref<SVGSVGElement>) => (
  <Icon
    {...props}
    ref={ref}
    pathData="M15.3037 11.2912L10.7237 6.71122C10.3317 6.32022 9.6977 6.32022 9.3057 6.71122C8.9137 7.10422 8.9137 7.73822 9.3057 8.13022L13.1767 12.0002L9.3057 15.8702C8.9137 16.2622 8.9137 16.8962 9.3057 17.2892C9.5017 17.4842 9.7587 17.5822 10.0147 17.5822C10.2717 17.5822 10.5287 17.4842 10.7237 17.2892L15.3037 12.7092C15.6957 12.3172 15.6957 11.6832 15.3037 11.2912Z"
  />
);

const ChevronRightIcon = React.forwardRef(
  ChevronRightIconBase,
) as typeof ChevronRightIconBase;

export default ChevronRightIcon;
