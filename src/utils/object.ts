/**
 * Deeply compares two values for equality
 * @param a First value to compare
 * @param b Second value to compare
 * @returns True if values are deeply equal, false otherwise
 */
export function isEqual(a: unknown, b: unknown): boolean {
  // Primitive types and same reference
  if (a === b) return true;

  // Handle null/undefined
  if (a == null || b == null) return a === b;

  // Handle Date objects
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // Handle arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) return false;
    }
    return true;
  }

  // Handle objects
  if (typeof a === 'object' && typeof b === 'object') {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
      if (!isEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) {
        return false;
      }
    }
    return true;
  }

  // All other cases
  return false;
}

/**
 * Deeply clones a value
 * @param value The value to clone
 * @returns A deep clone of the value
 */
export function deepClone<T>(value: T, seen = new WeakMap()): T {
  // Handle primitives and null/undefined
  if (typeof value !== 'object' || value === null) {
    return value;
  }

  // Handle circular references
  if (seen.has(value)) {
    return seen.get(value);
  }

  // Handle Date objects
  if (value instanceof Date) {
    const copy = new Date(value.getTime());
    seen.set(value, copy);
    return copy as T;
  }

  // Handle arrays
  if (Array.isArray(value)) {
    const copy = value.map(item => deepClone(item, seen));
    seen.set(value, copy);
    return copy as T;
  }

  // Handle Maps
  if (value instanceof Map) {
    const copy = new Map();
    seen.set(value, copy);
    value.forEach((val, key) => {
      copy.set(deepClone(key, seen), deepClone(val, seen));
    });
    return copy as T;
  }

  // Handle Sets
  if (value instanceof Set) {
    const copy = new Set();
    seen.set(value, copy);
    value.forEach(val => {
      copy.add(deepClone(val, seen));
    });
    return copy as T;
  }

  // Handle regular objects
  const result: Record<string | symbol, unknown> = {};
  seen.set(value, result);

  // Handle symbol properties
  const symbolKeys = Object.getOwnPropertySymbols(value);
  const stringKeys = Object.keys(value);

  // Copy all properties
  for (const key of [...stringKeys, ...symbolKeys]) {
    result[key] = deepClone((value as Record<string | symbol, unknown>)[key], seen);
  }

  return result as T;
}

/**
 * Creates an object composed of the picked `object` properties
 * @param object The source object
 * @param keys The property keys to pick
 * @returns A new object with the picked properties
 */
export function pick<T extends object, K extends keyof T>(object: T, keys: K[]): Pick<T, K> {
  return keys.reduce(
    (acc, key) => {
      if (key in object) {
        acc[key] = object[key];
      }
      return acc;
    },
    {} as Pick<T, K>
  );
}
