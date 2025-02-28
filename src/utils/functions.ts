interface DebounceOptions {
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

/**
 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * @param func The function to debounce
 * @param wait The number of milliseconds to delay
 * @param options Options object
 * @returns Returns the new debounced function with cancel and flush methods
 */
export function debounce<T extends (...args: never[]) => ReturnType<T>>(
  func: T,
  wait: number,
  options: DebounceOptions = {}
): {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel(): void;
  flush(): ReturnType<T> | undefined;
} {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastCallTime: number | null = null;
  let result: ReturnType<T> | undefined;
  let lastArgs: Parameters<T> | null = null;

  const { leading = false, trailing = true, maxWait } = options;
  const maxing = typeof maxWait === 'number';

  function invokeFunc(this: ThisParameterType<T> | void) {
    const args = lastArgs!;
    lastArgs = null;
    result = func.apply(this, args);
    return result;
  }

  function leadingEdge(time: number) {
    if (leading) {
      invokeFunc.call(undefined);
    }
    lastCallTime = time;
    timeout = setTimeout(timerExpired, wait);
  }

  function remainingWait(time: number) {
    const timeSinceLastCall = time - (lastCallTime || 0);
    const timeWaiting = wait - timeSinceLastCall;

    return maxing ? Math.min(timeWaiting, (maxWait || 0) - timeSinceLastCall) : timeWaiting;
  }

  function shouldInvoke(time: number) {
    const timeSinceLastCall = time - (lastCallTime || 0);
    return lastCallTime === null || timeSinceLastCall >= wait || (maxing && timeSinceLastCall >= (maxWait || 0));
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge();
    }
    timeout = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge() {
    timeout = null;
    if (trailing && lastArgs) {
      return invokeFunc.call(undefined);
    }
    lastArgs = null;
    return result;
  }

  function cancel() {
    if (timeout) {
      clearTimeout(timeout);
    }
    lastCallTime = null;
    lastArgs = null;
    timeout = null;
  }

  function flush() {
    return timeout ? trailingEdge() : result;
  }

  function debounced(this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T> | undefined {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;

    if (isInvoking) {
      if (timeout === null) {
        leadingEdge(time);
      } else if (maxing) {
        clearTimeout(timeout);
        timeout = setTimeout(timerExpired, wait);
        return invokeFunc.call(this);
      }
    }
    if (timeout === null) {
      timeout = setTimeout(timerExpired, wait);
    }
    return result;
  }

  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per every `wait` milliseconds.
 *
 * @param func The function to throttle
 * @param wait The number of milliseconds to throttle invocations to
 * @param options Options object
 * @returns Returns the new throttled function with cancel and flush methods
 */
export function throttle<T extends (...args: never[]) => ReturnType<T>>(
  func: T,
  wait: number,
  options: ThrottleOptions = {}
): {
  (...args: Parameters<T>): ReturnType<T> | undefined;
  cancel(): void;
  flush(): ReturnType<T> | undefined;
} {
  const { leading = true, trailing = true } = options;
  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait,
  });
}
