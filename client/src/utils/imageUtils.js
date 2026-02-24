/**
 * Converts a potentially relative image URL to a full URL
 * @param {string} imageUrl - The image URL (can be relative or absolute)
 * @returns {string} - The full image URL
 */
export const getFullImageUrl = (imageUrl) => {
  if (!imageUrl || !imageUrl.trim()) {
    return "";
  }

  const trimmedUrl = imageUrl.trim();

  // If it's already a full URL (starts with http:// or https://), use as is
  if (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")) {
    return trimmedUrl;
  }

  // If it's a relative path starting with /uploads/, prepend the backend URL
  if (trimmedUrl.startsWith("/uploads/")) {
    const baseUrl =
      import.meta.env.VITE_API_URL?.replace("/api/v1", "") ||
      "http://localhost:8000";
    return `${baseUrl}${trimmedUrl}`;
  }

  // For any other relative paths, try to construct the full URL
  if (!trimmedUrl.startsWith("http")) {
    const baseUrl =
      import.meta.env.VITE_API_URL?.replace("/api/v1", "") ||
      "http://localhost:8000";
    return `${baseUrl}${trimmedUrl.startsWith("/") ? trimmedUrl : "/" + trimmedUrl}`;
  }

  return trimmedUrl;
};
