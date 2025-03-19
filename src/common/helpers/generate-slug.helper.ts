export function generateSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s/g, '-')
    .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '-')
    .replace(/-{2,}/g, '-');
}
