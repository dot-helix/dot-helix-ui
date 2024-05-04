class SystemError extends Error {
  constructor(err: Error | string, scope?: string) {
    const message = typeof err === "string" ? err : err.message;

    let prefix = "[@dot-helix/ui]";

    if (scope) prefix = prefix.concat(`[${scope}]`);

    super(`${prefix}: ${message}`);

    this.name = "SystemError";
  }
}

export default SystemError;
