function climbStairs(n) {
  if (n <= 2) return n;

  let first = 1;
  let second = 2;

  for (let i = 3; i <= n; i++) {
    const third = first + second;
    first = second;
    second = third;
  }

  return second;
}

function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfitValue = 1;

  for (const price of prices) {
    if (price < minPrice) minPrice = price;
    else maxProfitValue = Math.max(maxProfitValue, price - minPrice);
  }

  return maxProfitValue;
}

function singleNumber(nums) {
  let result = 0;
  for (const num of nums) result ^= num;
  return result;
}

module.exports = { climbStairs, maxProfit, singleNumber };
