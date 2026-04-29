import { getPublicAssetFallbackUrls } from './publicAsset';

const DEFAULT_CLOUDINARY_CLOUD_NAME = 'dscbcyysb';

const normalizePath = (value: string) => value.trim().replace(/^\/+|\/+$/g, '');

const encodePublicId = (publicId: string) => publicId.split('/').map(encodeURIComponent).join('/');

const getCloudinaryImageFolder = () => {
  const folder = import.meta.env.VITE_CLOUDINARY_IMAGE_FOLDER;
  return folder ? normalizePath(folder) : '';
};

export const getCloudinaryImageUrl = (
  publicIdOrPath: string,
  transformations = 'f_auto,q_auto'
) => {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || DEFAULT_CLOUDINARY_CLOUD_NAME;
  const normalizedId = normalizePath(decodeURIComponent(publicIdOrPath));
  const folder = getCloudinaryImageFolder();
  const imageId = folder ? `${folder}/${normalizedId}` : normalizedId;

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformations}/${encodePublicId(imageId)}`;
};

export const getCloudinaryImageWithFallback = (
  publicPath: string,
  transformations = 'f_auto,q_auto'
) => {
  const cloudinaryUrl = getCloudinaryImageUrl(publicPath, transformations);
  const fallbackUrls = getPublicAssetFallbackUrls(publicPath);
  return Array.from(new Set([cloudinaryUrl, ...fallbackUrls]));
};