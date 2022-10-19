export function buildURL(location: string, params?: Record<string, string>) {
  const url = new URL(location);

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const value = params[key];
      if (value) {
        url.searchParams.set(key, value);
      }
    }
  }

  return url.href;
}
