import { contains, useEventCallback } from "@styleless-ui/react/utils";
import * as React from "react";

export type FocusWithinPredicateCallback<E extends HTMLElement = HTMLElement> =
  (event: React.FocusEvent<E>) => boolean | null;

const useFocusWithin = <E extends HTMLElement = HTMLElement>(
  predicate?: FocusWithinPredicateCallback<E>,
) => {
  const [isFocusWithin, setIsFocusWithin] = React.useState(false);

  const handleFocus = useEventCallback<React.FocusEvent<E>>(event => {
    const predicateResult = predicate?.(event);

    if (predicateResult == null) setIsFocusWithin(true);
    else setIsFocusWithin(predicateResult);
  });

  const handleBlur = useEventCallback<React.FocusEvent<E>>(event => {
    const predicateResult = predicate?.(event);

    if (predicateResult != null) {
      setIsFocusWithin(predicateResult);

      return;
    }

    if (!event.relatedTarget) {
      setIsFocusWithin(false);

      return;
    }

    const isStillInside = contains(event.currentTarget, event.relatedTarget);

    setIsFocusWithin(isStillInside);
  });

  return { isFocusWithin, handleFocus, handleBlur };
};

export default useFocusWithin;
