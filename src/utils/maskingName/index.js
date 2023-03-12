export function maskingName(name) {
  return name.substring(0, 2) + '*'.repeat(name.length - 2);
}
