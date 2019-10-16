"use strict";

//a set of array helper functions
module.exports = function alibarray() {

  /**
     * moves an item in an array, mutates the array passed to it
     * @param {array} arr - array for operation to be executed on
     * @param {int} fromIndex - index of item to move
     * @param {int} toIndex - position in array to move item to - if value is bigger than length of array, item will be placed at the end
     */
  var move = function (arr, fromIndex, toIndex) {
    var item = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, item);
  };

  /**
     * swaps the position of 2 items in an array, mutates the array passed to it
     * @param {array} arr - array for operation to be executed on
     * @param {int} indexA - index of item A to swap
     * @param {int} toIndex - index of item B to swap
     */
  var swap = function (arr, indexA, indexB) {
    if (indexA < arr.length && indexB < arr.length) {
      var temp = arr[indexA];
      arr[indexA] = arr[indexB];
      arr[indexB] = temp;
    }
  };

  /**
     * inserts an item into an array, mutates the array passed to it
     * @param {array} arr - array for operation to be executed on
     * @param {object/string/int} item - item to insert
     * @param {int} index - position in array to insert item - if value is bigger than length of array, item will be placed at the end
     * @example 
     * // mutates array data to insert: { color: 'gold', size: 15 } at index 3 
     * alibarray().insert(data, { color: 'gold', size: 15 }, 3);
     */
  var insert = function (arr, item, index) {
    arr.splice(index, 0, item);
  };

  /**
     * checks if an array contains an object with props and values matching that of passed compareItem 
     * @param {array} arr - array for operation to be executed on
     * @param {object} compareItem - item to compare
     * @param {string} [compareMode="all"] - compare mode 'all' matches all props on passed object 'any' any props match, 'exact' - exact match
     * @return {boolean}  - true if array contains item match
     * @example 
     * // check if array data contains object like: { color: 'green', size: 12 }
     * var result = alibarray().contains(data, { color: 'green', size: 12 });
     */
  var contains = function (arr, compareItem, compareMode) {
    if (position(arr, compareItem, compareMode) !== null) {
      return true;
    }
    else {
      return false;
    }
  };

  /**
     * returns position of first item in array containing an object with props and values matching that of passed compareItem - if nothing is found, null is returned 
     * @param {array} arr - array for operation to be executed on
     * @param {object} compareItem - item to compare
     * @param {string} [compareMode="all"] - compare mode 'all' matches all props on passed object 'any' any props match, 'exact' - exact match
     * @return {int}  - positon if array contains item, otherwise null 
     * @example 
     * // should return 1 as item is at index pos 1 in the array
     * var result = alibarray().position(data, { color: 'green', size: 12 });
     */
  var position = function (arr, compareItem, compareMode) {
    var pos = null;

    //normalise compare mode
    var nCompareMode = 'all';
    if (compareMode && (compareMode === 'any' || compareMode === 'exact')) {
      nCompareMode = compareMode;
    }

    //first enumerate obj props and values
    if (typeof (compareItem) === 'object') {
      var keys = [];
      var values = [];
      for (var prop in compareItem) {
        if (compareItem.hasOwnProperty(prop)) {
          //The current property is a direct property
          keys.push(prop);
          values.push(compareItem[prop]);
        }
      }

      //iterate through and match
      for (var i = 0; i < arr.length; i++) {
        var matches = 0;
        for (var j = 0; j < keys.length; j++) {
          if (arr[i][keys[j]] === values[j]) {
            //inc matches
            matches++;
          }
        }

        if (nCompareMode === 'all' && matches === keys.length) {
          pos = i;
          break;
        }
        if (nCompareMode === 'any' && matches > 0) {
          pos = i;
          break;
        }
        if (nCompareMode === 'exact' && matches === keys.length) {
          //now check prop count
          var pcount = 0;
          for (var prop in arr[i]) {
            if (arr[i].hasOwnProperty(prop)) {
              pcount++;
            }
          }

          if (pcount === keys.length) {
            pos = i;
            break;
          }
        }
      }
    }
    else {
      //compare primative
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === compareItem) {
          pos = i;
          break;
        }
      }
    }

    return pos;
  };

  /**
   * returns number of items in array containing an object with props and values matching that of passed compareItem 
   * @param {array} arr - array for operation to be executed on
   * @param {object} compareItem - item to compare
   * @return {int}  - number of matching items 
   * @example 
   * // should return 3 as there are 3 items matching compareItem in the array
   * var result = alibarray().count(data, { color: 'green'});
   */
  var count = function (arr, compareItem) {
    var countMatches = 0;

    //first enumerate obj props and values
    if (typeof (compareItem) === 'object') {
      var keys = [];
      var values = [];
      for (var prop in compareItem) {
        if (compareItem.hasOwnProperty(prop)) {
          //The current property is a direct property
          keys.push(prop);
          values.push(compareItem[prop]);
        }
      }

      //iterate through and match
      for (var i = 0; i < arr.length; i++) {
        var matches = 0;
        for (var j = 0; j < keys.length; j++) {
          if (arr[i][keys[j]] === values[j]) {
            //inc matches
            matches++;
          }
        }

        if (matches === keys.length) {
          countMatches++;
        }
      }
    }
    else {
      //compare primative
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === compareItem) {
          countMatches++;
        }
      }
    }

    return countMatches;
  };

  return {
    move: move,
    swap: swap,
    insert: insert,
    contains: contains,
    position: position,
    count: count
  };
};
