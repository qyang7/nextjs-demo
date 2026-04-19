function fibonacci(n) {
  if (n < 0) {
    throw new Error('n must be a non-negative integer');
  }

  if (n === 0) {
    return 0;
  }

  if (n === 1) {
    return 1;
  }

  let prev = 0;
  let curr = 1;

  for (let i = 2; i <= n; i += 1) {
    const next = prev + curr;
    prev = curr;
    curr = next;
  }

  return curr;
}

module.exports = fibonacci;
