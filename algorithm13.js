function debounce(fn, delay, immediate = false) {
  let timer;
  return function(...args) {
    const callNow = immediate && !timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      if (!immediate) fn.apply(this, args);
    }, delay);
    if (callNow) fn.apply(this, args);
  };
}

function throttle(fn, limit, options = {}) {
  let inThrottle, lastFunc, lastRan;
  const { leading = true, trailing = true } = options;
  return function(...args) {
    if (!inThrottle) {
      if (leading) fn.apply(this, args);
      inThrottle = true;
      lastRan = Date.now();
      setTimeout(() => {
        inThrottle = false;
        if (trailing && lastFunc) {
          lastFunc();
          lastFunc = null;
        }
      }, limit);
    } else {
      lastFunc = () => fn.apply(this, args);
    }
  };
}

function createCounter(initial = 0, step = 1) {
  let count = initial;
  return {
    increment: () => count += step,
    decrement: () => count -= step,
    reset: () => count = initial,
    getCount: () => count
  };
}

function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

module.exports = { debounce, throttle, createCounter, memoize };