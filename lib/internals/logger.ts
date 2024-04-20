/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */

type LogType = "info" | "error" | "warn";

type LogFn = (message: string, type: LogType, scope?: string) => void;

const log: LogFn = (message, type, scope) => {
  const scopeSegment = scope ? `[${scope}]` : "";
  const prefix = `[@dot-helix/ui]${scopeSegment}:`;

  const prefixedMessage = `${prefix}${message}`;

  const logFn = {
    info: console.log,
    error: console.error,
    warn: console.warn,
  }[type];

  logFn(prefixedMessage);
};

const withDevOnlyPrefix = (logFn: LogFn): LogFn => {
  return (...args: Parameters<LogFn>) => {
    if (process.env.NODE_ENV === "production") return;

    logFn.apply(logFn, args);
  };
};

const Logger = Object.seal({
  devOnly: { log: withDevOnlyPrefix(log) },
  log,
});

export default Logger;
