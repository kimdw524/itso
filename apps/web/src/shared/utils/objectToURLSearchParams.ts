type SearchParamPrimitive = string | number | boolean;

type SearchParamValue =
  | SearchParamPrimitive
  | SearchParamPrimitive[]
  | null
  | undefined;

export const objectToURLSearchParams = (
  source: Record<string, SearchParamValue>,
) => {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(source)) {
    if (value === null || value === undefined) {
      continue;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        searchParams.append(key, String(item));
      }
      continue;
    }

    searchParams.append(key, String(value));
  }

  return searchParams;
};
