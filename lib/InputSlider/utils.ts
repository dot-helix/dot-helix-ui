export const isInRange = (value: number, range: [number, number]) => {
  const [min, max] = range;

  return min < value && value < max;
};
