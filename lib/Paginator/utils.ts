import { clamp } from "@styleless-ui/react/utils";

export const generatePages = (params: { page: number; pagesCount: number }) => {
  const { page, pagesCount: n } = params;

  if (n <= 7) {
    return Array<number>(n)
      .fill(0)
      .map((_, idx) => idx + 1);
  }

  if (page - 2 <= 1) {
    return [1, 2, 3, 4, 5, -clamp(3 + 5, 1, n), n];
  } else if (page + 2 >= n) {
    return [1, -clamp(n - 2 - 5, 1, n), n - 4, n - 3, n - 2, n - 1, n];
  } else {
    const result = [1];

    if (page - 3 >= 2) {
      result.push(-clamp(page - 5, 1, n));
    }

    result.push(page - 2, page - 1, page, page + 1, page + 2);

    if (page + 3 <= n - 1) {
      result.push(-clamp(page + 5, 1, n));
    }

    result.push(n);

    return result;
  }
};
