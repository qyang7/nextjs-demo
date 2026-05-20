function reverseString(str) {
  return str.split('').reverse().join('');
}

function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

function capitalize(str) {
  return str.replace(/\b\w/g, c => c.toUpperCase());
}

function truncate(str, maxLen) {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + '...';
}

function countWords(str) {
  return str.trim().split(/\s+/).length;
}

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = { reverseString, isPalindrome, capitalize, truncate, countWords, capitalizeFirst };