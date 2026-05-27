function longestCommonPrefix(strs) {
  if (!strs.length) return '';

  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (!strs[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (!prefix) return '';
    }
  }

  return prefix;
}

function moveZeroes(nums) {
  let insertPos = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) nums[insertPos++] = nums[i];
  }

  while (insertPos < nums.length) nums[insertPos++] = 0;
  return nums;
}

function romanToInt(s) {
  const map = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
  };

  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const current = map[s[i]];
    const next = map[s[i + 1]];
    if (next > current) total -= current;
    else total += current;
  }

  return total;
}

module.exports = { longestCommonPrefix, moveZeroes, romanToInt };
