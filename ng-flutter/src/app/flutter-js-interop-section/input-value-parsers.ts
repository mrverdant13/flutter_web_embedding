/**
 * Pure functions to parse and transform values from form input events.
 * Extracted from components to keep presentation logic separate.
 */

/**
 * Parses an integer from a number input's change event.
 * Returns 0 for invalid or empty input.
 */
export function parseCounterValueFromInput(event: Event): number {
  const value = (event.target as HTMLInputElement).value;
  return parseInt(value, 10) || 0;
}

/**
 * Extracts the string value from a text input's change event.
 * Returns empty string for null/undefined.
 */
export function parseTextValueFromInput(event: Event): string {
  return (event.target as HTMLInputElement).value || '';
}
