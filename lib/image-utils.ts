/**
 * Ensures image paths are properly formatted
 * @param path The image path
 * @returns A properly formatted image path
 */
export function getImagePath(path: string): string {
  // If the path is already a URL, return it as is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }

  // If the path starts with a slash, it's already a root-relative path
  if (path.startsWith("/")) {
    return path
  }

  // Otherwise, make it a root-relative path
  return `/${path}`
}

/**
 * Creates a placeholder image URL
 * @param width The width of the placeholder
 * @param height The height of the placeholder
 * @param query The query to generate the placeholder
 * @returns A placeholder image URL
 */
export function createPlaceholder(width: number, height: number, query: string): string {
  return `/placeholder.svg?height=${height}&width=${width}&query=${encodeURIComponent(query)}`
}
