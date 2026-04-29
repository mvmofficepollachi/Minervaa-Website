export const getPublicAssetUrl = (path: string): string => {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const normalizedPath = path.replace(/^\/+/, '');

  return `${normalizedBase}${normalizedPath}`;
};

export const getPublicAssetFallbackUrls = (path: string): string[] => {
  const normalizedPath = path.replace(/^\/+/, '');
  const primary = getPublicAssetUrl(path);
  const rootRelative = `/${normalizedPath}`;

  return primary === rootRelative ? [primary] : [primary, rootRelative];
};
