function isValidParentheses(str) {
  const stack = [];
  const pairs = {
    ')': '(',
    ']': '[',
    '}': '{',
  };

  for (const char of str) {
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
      continue;
    }

    if (pairs[char]) {
      if (stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

module.exports = isValidParentheses;
