// I have to partition through an array of nums
/*
You are given a 0-indexed integer array nums. You have to partition the array into one or more contiguous subarrays.

We call a partition of the array valid if each of the obtained subarrays satisfies one of the following conditions:

The subarray consists of exactly 2 equal elements. For example, the subarray [2,2] is good.
The subarray consists of exactly 3 equal elements. For example, the subarray [4,4,4] is good.
The subarray consists of exactly 3 consecutive increasing elements, that is, the difference between adjacent elements is 1. For example, the subarray [3,4,5] is good, but the subarray [1,3,5] is not.
Return true if the array has at least one valid partition. Otherwise, return false.
*/
/**
 * @param {number[]} nums
 * @return {boolean}
 */

var validPartition = function (nums) {
  let freqMap = {}; // Created an empty frequency map

  // Below I am populating the empty freqMap above
  for (let num of nums) {
    freqMap[num] = (freqMap[num] || 0) + 1;
  }

  // Below I am checking for valid partitions
  for (let num in freqMap) {
    num = parseInt(num); // This line converts the string key back into an integer...

    while (freqMap[num] > 0) {
      if (freqMap[num] >= 3) {
        freqMap[num] -= 3;
      } else if (freqMap[num] >= 2) {
        freqMap[num] -= 2;
      } else if (freqMap[num + 1] > 0 && freqMap[num + 2] > 0) {
        freqMap[num]--;
        freqMap[num + 1]--;
        freqMap[num + 2]--;
      } else {
        return false;
      }
    }
  }
  return true;
};

// Below I test the results
/*
console.log(validPartition([4, 4, 4, 5, 6])); // should be true but it outputs false...
console.log(validPartition([1, 1, 1, 2])); // should be false and does put out false...
*/
//=================================================================================================================================================================

// A correct solution will be shown below..
var validPartition = function (nums, memo = {}, start = 0) {
  if (start >= nums.length) return true;
  if (start in memo) return memo[start];

  let isTwoEqual = nums[start] === nums[start + 1];

  let isThreeEqual =
    nums[start] === nums[start + 1] && nums[start] === nums[start + 2];

  let isIncreasing =
    nums[start] + 1 === nums[start + 1] &&
    nums[start + 1] + 1 === nums[start + 2];

  let isValid = false;

  if (isIncreasing) {
    isValid = validPartition(nums, memo, start + 3);
  } else if (isThreeEqual) {
    isValid =
      validPartition(nums, memo, start + 2) ||
      validPartition(nums, memo, start + 3);
  } else if (isTwoEqual) isValid = validPartition(nums, memo, start + 2);

  memo[start] = isValid;
  return isValid;
};

console.log(validPartition([4, 4, 4, 5, 6])); // should be true
console.log(validPartition([1, 1, 1, 2])); // should be false
