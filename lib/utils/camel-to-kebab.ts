const camelToKebab = (camelcase: string) =>
  camelcase.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? "-" : "") + $.toLowerCase(),
  );

export default camelToKebab;
