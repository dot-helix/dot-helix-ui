type RGB = {
  r: number;
  g: number;
  b: number;
};

export const isValidHexColor = (hex: string): boolean =>
  Boolean(/^#([0-9a-f]{3}){1,2}$/i.exec(hex));

export const hexToRgb = (hex: string): RGB | null => {
  let sanitizedHex = hex.replaceAll("##", "#");
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

  sanitizedHex = sanitizedHex.replace(
    shorthandRegex,
    (_, r, g, b) =>
      String(r) + String(r) + String(g) + String(g) + String(b) + String(b)
  );

  const colorParts = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    sanitizedHex
  );

  if (!colorParts) return null;

  const [, r = "00", g = "00", b = "00"] = colorParts;

  return {
    r: parseInt(r, 16),
    g: parseInt(g, 16),
    b: parseInt(b, 16)
  } as RGB;
};

export const rgbToHex = ({ r, g, b }: RGB): string => {
  const toHex = (n: number) => `0${n.toString(16)}`.slice(-2);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

export const getForegroundColor = (
  background: string
): "#ffffff" | "#000000" => {
  const rgb = hexToRgb(background);

  if (!rgb) return "#000000";

  const { r, g, b } = rgb;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return lum < 120 ? "#ffffff" : "#000000";
};

export const lighten = (hex: string, intensity: number): string => {
  const rgb = hexToRgb(hex);

  if (!rgb) return hex;

  const { r, g, b } = rgb;

  const newRgb = {
    r: Math.round(r + (255 - r) * intensity),
    g: Math.round(g + (255 - g) * intensity),
    b: Math.round(b + (255 - b) * intensity)
  };

  return rgbToHex(newRgb);
};

export const darken = (hex: string, intensity: number): string => {
  const rgb = hexToRgb(hex);

  if (!rgb) return hex;

  const { r, g, b } = rgb;

  const newRgb = {
    r: Math.round(r * intensity),
    g: Math.round(g * intensity),
    b: Math.round(b * intensity)
  };

  return rgbToHex(newRgb);
};

export const generateColorSet = (originColor: string) => ({
  50: lighten(originColor, 0.95),
  100: lighten(originColor, 0.9),
  200: lighten(originColor, 0.75),
  300: lighten(originColor, 0.6),
  400: lighten(originColor, 0.3),
  500: originColor,
  600: darken(originColor, 0.9),
  700: darken(originColor, 0.75),
  800: darken(originColor, 0.6),
  900: darken(originColor, 0.49)
});
