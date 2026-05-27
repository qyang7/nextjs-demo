function quickSort(nums) {
  if (nums.length <= 1) return nums;

  const pivot = nums[0];
  const left = [];
  const right = [];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < pivot) left.push(nums[i]);
    else right.push(nums[i]);
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

function mergeSortedArray(nums1, nums2) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] <= nums2[j]) result.push(nums1[i++]);
    else result.push(nums2[j++]);
  }

  while (i < nums1.length) result.push(nums1[i++]);
  while (j < nums2.length) result.push(nums2[j++]);

  return result;
}

function palindromeCheck(str) {
  const normalized = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return normalized === normalized.split('').reverse().join('');
}

module.exports = { quickSort, mergeSortedArray, palindromeCheck };
