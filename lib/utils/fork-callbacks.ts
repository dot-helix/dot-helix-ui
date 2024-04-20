import type { AnyVoidFunction } from "../types";

const forkCallbacks = <F extends AnyVoidFunction>(...callbacks: F[]): F => {
  const forked = (...args: Parameters<F>) => {
    callbacks.forEach(callback => callback.apply(callback, args));
  };

  return forked as F;
};

export default forkCallbacks;
