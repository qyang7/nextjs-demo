function compose(...fns) {
  return x => fns.reduceRight((v, f) => f(v), x);
}

function pipe(...fns) {
  return x => fns.reduce((v, f) => f(v), x);
}

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...args2) {
      return curried.apply(this, args.concat(args2));
    };
  };
}

function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    return cache[key] = fn.apply(this, args);
  };
}

function once(fn) {
  let called = false;
  let result;
  return function(...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

module.exports = { compose, pipe, curry, memoize, once };