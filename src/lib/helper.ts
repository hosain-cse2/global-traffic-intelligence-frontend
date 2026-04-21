export function formatNumber(value: number | undefined): string {
  if (!value) return "-";
  return new Intl.NumberFormat("en-US").format(value);
}
