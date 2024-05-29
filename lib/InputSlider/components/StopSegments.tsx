import type { InputSlider as StylelessInputSlider } from "@styleless-ui/react";
import { remap } from "@styleless-ui/react/utils";
import * as React from "react";
import { combineClasses as cls } from "../../utils";
import type { Props as LocalInputSliderProps } from "../InputSlider";
import classes from "../InputSlider.module.css";
import * as Slots from "../slots";
import { isInRange } from "../utils";

type Props = {
  currentValue: number | [number, number];
  min: number;
  max: number;
  orientation: StylelessInputSlider.RootProps["orientation"];
  segments: StylelessInputSlider.StopSegment[];
  goToSegmentIndex: (segmentsIdx: number) => void;
  setStopSegmentText?: LocalInputSliderProps["setStopSegmentText"];
};

const StopSegments = (props: Props) => {
  const {
    min,
    max,
    currentValue,
    orientation,
    segments,
    goToSegmentIndex,
    setStopSegmentText,
  } = props;

  const range = React.useMemo(() => {
    let range: [number, number];

    if (typeof currentValue === "number") {
      range = [0, remap(currentValue, min, max, 0, 100)];
    } else {
      range = [
        remap(currentValue[0], min, max, 0, 100),
        remap(currentValue[1], min, max, 0, 100),
      ];
    }

    return range;
  }, [currentValue, min, max]);

  if (segments.length === 0) return null;

  const renderSegmentTitle = (segment: StylelessInputSlider.StopSegment) => {
    const segmentTitle = setStopSegmentText?.(segment);

    if (!segmentTitle) return null;

    return (
      <span
        className={classes["stop-segment-title"]}
        data-slot={Slots.StopSegmentTitle}
        onClick={() => goToSegmentIndex(segment.index)}
      >
        {segmentTitle}
      </span>
    );
  };

  const renderSegment = (segment: StylelessInputSlider.StopSegment) => {
    const style: React.CSSProperties = {};

    const lengthInRange = isInRange(segment.length, range);

    if (orientation === "horizontal") {
      style.left = `${segment.length}%`;
    } else {
      style.bottom = `${segment.length}%`;
    }

    return (
      <div
        key={String(segment.index) + String(segment.length)}
        className={cls(classes["stop-segment"], {
          [classes["stop-segment--in-range"]!]: lengthInRange,
        })}
        data-slot={Slots.StopSegment}
        style={style}
      >
        <span
          className={classes["stop-segment-mark"]}
          data-slot={Slots.StopSegmentMark}
        ></span>
        {renderSegmentTitle(segment)}
      </div>
    );
  };

  return (
    <div
      aria-hidden="true"
      className={classes["stop-segments"]}
      data-slot={Slots.StopSegments}
    >
      {segments.map(renderSegment)}
    </div>
  );
};

export default StopSegments;
