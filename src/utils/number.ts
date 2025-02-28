/**
 * Format number with configurable options
 * @param value - The number to format
 * @param decimalPlaces - Number of decimal places, defaults to no decimal
 * @param trimTrailingZeros - Whether to trim trailing zeros, defaults to true
 * @param useGrouping - Whether to use thousand separators, defaults to true
 * @returns Formatted string
 */
export function formatNumber(
  value: number,
  decimalPlaces?: number,
  trimTrailingZeros = true,
  useGrouping = true
): string {
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimalPlaces ?? 20,
    minimumFractionDigits: trimTrailingZeros ? 0 : (decimalPlaces ?? 0),
    useGrouping,
  });
  return formatter.format(value);
}
