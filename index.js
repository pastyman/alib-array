"use strict";

//a set of array helper functions
const alibarray = () => {

  /**
     * moves an item in an array, mutates the array passed to it
     * @param {array} arr - array for operation to be executed on
     * @param {int} fromIndex - index of item to move
     * @param {int} toIndex - position in array to move item to - if value is bigger than length of array, item will be placed at the end
     */
  const move = (arr, fromIndex, toIndex) => {
    let item = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, item);
  };

  /**
     * swaps the position of 2 items in an array, mutates the array passed to it
     * @param {array} arr - array for operation to be executed on
     * @param {int} indexA - index of item A to swap
     * @param {int} toIndex - index of item B to swap
     */
  const swap = (arr, indexA, indexB) => {
    if (indexA < arr.length && indexB < arr.length) {
      let temp = arr[indexA];
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
  const insert = (arr, item, index) => {
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
     * let result = alibarray().contains(data, { color: 'green', size: 12 });
     */
  const contains = (arr, compareItem, compareMode) => {
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
     * let result = alibarray().position(data, { color: 'green', size: 12 });
     */
  const position = (arr, compareItem, compareMode) => {
    let pos = null;

    //normalise compare mode
    let nCompareMode = 'all';
    if (compareMode && (compareMode === 'any' || compareMode === 'exact')) {
      nCompareMode = compareMode;
    }

    //first enumerate obj props and values
    if (typeof (compareItem) === 'object') {
      let keys = [];
      let values = [];
      for (let prop in compareItem) {
        if (compareItem.hasOwnProperty(prop)) {
          //The current property is a direct property
          keys.push(prop);
          values.push(compareItem[prop]);
        }
      }

      //iterate through and match
      for (let i = 0; i < arr.length; i++) {
        let matches = 0;
        for (let j = 0; j < keys.length; j++) {
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
          let pcount = 0;
          for (let prop in arr[i]) {
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
      for (let i = 0; i < arr.length; i++) {
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
   * let result = alibarray().count(data, { color: 'green'});
   */
  const count = (arr, compareItem) => {
    let countMatches = 0;

    //first enumerate obj props and values
    if (typeof (compareItem) === 'object') {
      let keys = [];
      let values = [];
      for (let prop in compareItem) {
        if (compareItem.hasOwnProperty(prop)) {
          //The current property is a direct property
          keys.push(prop);
          values.push(compareItem[prop]);
        }
      }

      //iterate through and match
      for (let i = 0; i < arr.length; i++) {
        let matches = 0;
        for (let j = 0; j < keys.length; j++) {
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
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === compareItem) {
          countMatches++;
        }
      }
    }

    return countMatches;
  };

  /**
     * returns last item in array. if the array is empty, undefined is returned
     * @param {array} arr - array for operation to be executed on
     * @example 
     * // should return { color: 'black', size: 12 } as this is last item in array
     * let result = alibarray().last(data);
     */
  const last = (arr) => {
    return arr.length > 0 ? arr[arr.length - 1] : undefined;
  };

  /**
     * returns first item in array. if the array is empty, undefined is returned
     * @param {array} arr - array for operation to be executed on
     * @example 
     * // should return { color: 'blue', size: 44 } as this is first item in array
     * let result = alibarray().first(data);
     */
  const first = (arr) => {
    return arr.length > 0 ? arr[0] : undefined;
  };

  /**
     * returns items where prop of propName has a unique value
     * @param {array} arr - array for operation to be executed on
     * @param {string} propName - name of prop to do compare on
     * @example 
     * // should return [{ color: 'blue', size: 44 }, { color: 'green', size: 12 }, { color: 'red', size: 18 }, { color: 'gold', size: 15 }, { color: 'black', size: 12 }] as these are the first found unique value of 'color' for all objects in passed array
     * let result = alibarray().unique(data, 'color');
     */
  const unique = (arr, propName) => {
    return arr.filter((item, pos, self) => self.findIndex(v => v[propName] === item[propName]) === pos)
  };


  return {
    move,
    swap,
    insert,
    contains,
    position,
    count,
    last,
    first,
    unique
  };
};


module.exports = alibarray;