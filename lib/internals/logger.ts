/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

const withDevOnlyPrefix = <F extends (...args: any) => any>(logFn: F) => {
  return (...args: Parameters<F>) => {
    if (process.env.NODE_ENV === "production") return;

    logFn.apply("[@dot-helix/ui]<DEVONLY_MESSAGE>:", args);
  };
};

const withPrefix = <F extends (...args: any) => any>(logFn: F) => {
  return (...args: Parameters<F>) => {
    if (process.env.NODE_ENV === "production") return;

    logFn.apply("[@dot-helix/ui]:", args);
  };
};

const Logger = {
  devOnly: {
    info: withDevOnlyPrefix(console.log),
    error: withDevOnlyPrefix(console.error),
    warn: withDevOnlyPrefix(console.warn),
  },
  info: withPrefix(console.log),
  error: withPrefix(console.error),
  warn: withPrefix(console.warn),
};

export default Logger;
