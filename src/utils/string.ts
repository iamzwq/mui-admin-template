/**
 * Convert strings of different naming conventions into an array of words.
 * Supported formats: camelCase, PascalCase, snake_case, kebab-case, SCREAMING_SNAKE_CASE
 * @param input Input string
 * @returns Array of words
 * @example
 * splitCaseToWords('camelCase') // ['camel', 'case']
 * splitCaseToWords('PascalCase') // ['pascal', 'case']
 * splitCaseToWords('snake_case') // ['snake', 'case']
 * splitCaseToWords('kebab-case') // ['kebab', 'case']
 * splitCaseToWords('SCREAMING_SNAKE_CASE') // ['screaming', 'snake', 'case']
 */
export function splitCaseToWords(input: string): string[] {
  const regex = /([A-Z]+(?![a-z])|[A-Z][a-z]+|[0-9]+|[a-z]+)/g;
  const matches = input.match(regex);
  return matches ? matches.map(match => match.toLowerCase()) : [];
}
