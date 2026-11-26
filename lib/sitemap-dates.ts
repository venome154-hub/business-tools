export function lastModifiedFor(
  path: string,
  dates: Record<string, string>,
  warn: (message: string) => void = console.warn,
) {
  const date = dates[path];
  if (!date) {
    warn(`sitemap: no updatedAt for ${path}; omitting lastmod`);
    return undefined;
  }
  return date;
}
