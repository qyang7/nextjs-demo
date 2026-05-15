function generateMatrix(rows, cols, fill = 0) {
  return Array.from({ length: rows }, () => Array(cols).fill(fill));
}

function transpose(matrix) {
  return matrix[0].map((_, i) => matrix.map(row => row[i]));
}

function rotate90(matrix) {
  return matrix[0].map((_, i) => matrix.map(row => row[i]).reverse());
}

function spiralOrder(matrix) {
  const result = [];
  while (matrix.length) {
    result.push(...matrix.shift());
    matrix = transpose(matrix).reverse();
  }
  return result;
}

function maxProfit(prices) {
  let minPrice = Infinity, maxProfit = 0;
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
}

function longestCommonPrefix(strs) {
  if (!strs.length) return '';
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
    }
  }
  return prefix;
}

module.exports = { generateMatrix, transpose, rotate90, spiralOrder, maxProfit, longestCommonPrefix };