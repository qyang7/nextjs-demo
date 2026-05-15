function chunkArray(arr, size) {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, (i + 1) * size)
  );
}

function flattenDeep(arr) {
  return arr.reduce((acc, val) =>
    Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []
  );
}

function differenceBy(arr1, arr2, iteratee) {
  const set = new Set(arr2.map(item => typeof iteratee === 'function' ? iteratee(item) : item[iteratee]));
  return arr1.filter(item => !set.has(typeof iteratee === 'function' ? iteratee(item) : item[iteratee]));
}

function zip(...arrays) {
  const maxLen = Math.max(...arrays.map(arr => arr.length));
  return Array.from({ length: maxLen }, (_, i) =>
    arrays.map(arr => arr[i])
  );
}

function unzip(arr) {
  return arr[0].map((_, i) => arr.map(item => item[i]));
}

function compact(arr) {
  return arr.filter(Boolean);
}

module.exports = { chunkArray, flattenDeep, differenceBy, zip, unzip, compact };