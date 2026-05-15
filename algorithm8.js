function removeDuplicates(arr) {
  return arr.filter((item, index) => arr.indexOf(item) === index);
}

function intersection(arr1, arr2) {
  return arr1.filter(item => arr2.includes(item));
}

function union(arr1, arr2) {
  return [...new Set([...arr1, ...arr2])];
}

function difference(arr1, arr2) {
  return arr1.filter(item => !arr2.includes(item));
}

function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { removeDuplicates, intersection, union, difference, range, randomInt };