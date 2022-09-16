"use strict";

/**
   * a set of array helper functions
* @param {array} arr - array for operation to be executed on
   */
const alibarray = (arr) => {
  //match engine
  const engine = (compareItem, compareMode, mode) => {
    let pos = null;
    let arrMatches = [];
    let countMatches = 0;

    if (!Array.isArray(arr)){
      if (mode === 'match' || mode === 'exclude') {
        return arrMatches;
      }
      if (mode === 'position') {
        return pos;
      }
      if (mode === 'count') {
        return countMatches;
      }
    }

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
          if (!Array.isArray(arr[i][keys[j]]) && arr[i][keys[j]] === values[j]) {
            //inc matches
            matches++;
          }
          if (Array.isArray(arr[i][keys[j]]) && JSON.stringify(arr[i][keys[j]]) === JSON.stringify(values[j])) {
            //inc matches
            matches++;
          }
        }

        let exclude = false;
        if ((nCompareMode === 'all' && matches === keys.length) || (nCompareMode === 'any' && matches > 0) || (nCompareMode === 'exact' && matches === keys.length)) {
          let sucMatch = true;
          if (nCompareMode === 'exact') {
            //now check prop count
            let pcount = 0;
            for (let prop in arr[i]) {
              if (arr[i].hasOwnProperty(prop)) {
                pcount++;
              }
            }
            sucMatch = pcount === keys.length;
          }
          
          if (mode === 'match' && sucMatch) {
            arrMatches.push(arr[i]);
          }
          if (mode === 'exclude' && sucMatch) {
            exclude = true;
          }
          if (mode === 'position' && sucMatch) {
            pos = i;
            break;
          }
          if (mode === 'count' && sucMatch) {
            countMatches++;
          }
        }
        if (mode === 'exclude' && exclude === false) {
          arrMatches.push(arr[i]);
        }
      }
    }
    else {
      //compare primative
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== compareItem) {
          if (mode === 'exclude') {
            arrMatches.push(arr[i]);
          }
        }
        if (arr[i] === compareItem) {
          if (mode === 'match') {
            arrMatches.push(arr[i]);
          }
          if (mode === 'position') {
            pos = i;
            break;
          }
          if (mode === 'count') {
            countMatches++;
          }
        }
      }
    }

    if (mode === 'match' || mode === 'exclude') {
      return arrMatches;
    }
    if (mode === 'position') {
      return pos;
    }
    if (mode === 'count') {
      return countMatches;
    }
  };

  /**
     * moves an item in an array, mutates the array passed to it
     * @param {int} fromIndex - index of item to move
     * @param {int} toIndex - position in array to move item to - if value is bigger than length of array, item will be placed at the end
     */
  const move = (fromIndex, toIndex) => {
    let item = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, item);
  };

  /**
     * swaps the position of 2 items in an array, mutates the array passed to it
     * @param {int} indexA - index of item A to swap
     * @param {int} toIndex - index of item B to swap
     */
  const swap = (indexA, indexB) => {
    if (indexA < arr.length && indexB < arr.length) {
      let temp = arr[indexA];
      arr[indexA] = arr[indexB];
      arr[indexB] = temp;
    }
  };

  /**
     * inserts an item into an array, mutates the array passed to it
     * @param {object/string/int} item - item to insert
     * @param {int} index - position in array to insert item - if value is bigger than length of array, item will be placed at the end
     * @example 
     * // mutates array data to insert: { color: 'gold', size: 15 } at index 3 
     * alibarray(data).insert({ color: 'gold', size: 15 }, 3);
     */
  const insert = (item, index) => {
    arr.splice(index, 0, item);
  };

  /**
     * returns position of first item in array containing an object with props and values matching that of passed compareItem - if nothing is found, null is returned 
     * @param {object} compareItem - item to compare
     * @param {string} [compareMode="all"] - compare mode 'all' matches all props on passed object 'any' any props match, 'exact' - exact match
     * @return {int}  - positon if array contains item, otherwise null 
     * @example 
     * // should return 1 as item is at index pos 1 in the array
     * let result = alibarray(data).position({ color: 'green', size: 12 });
     */
  const position = (compareItem, compareMode) => engine(compareItem, compareMode, 'position');

  /**
     * returns first item in array containing an object with props and values matching that of passed compareItem - if nothing is found, null is returned 
     * @param {object} compareItem - item to compare
     * @param {string} [compareMode="all"] - compare mode 'all' matches all props on passed object 'any' any props match, 'exact' - exact match
     * @return {int}  - positon if array contains item, otherwise null 
     * @example 
     * // should return 1 as item is at index pos 1 in the array
     * let result = alibarray(data).position({ color: 'green', size: 12 });
     */
  const find = (compareItem, compareMode) => {
    let position = engine(compareItem, compareMode, 'position');
    return position !== null ? arr[position] : null;
  };

  /**
     * update first item in array containing an object with props and values matching that of passed compareItem with passed in update item, mutates the array passed to it
     * @param {object} compareItem - item to compare
     * @param {object} updateItem - item to update found item with
     * @param {string} [compareMode="all"] - compare mode 'all' matches all props on passed object 'any' any props match, 'exact' - exact match
     * @return {int}  - positon if array contains item, otherwise null 
     * @example 
     * // should update first item in array found using { color: 'green' } that is { color: 'green', size: 12 } to { color: 'green', size: 12, name: 'paris' }
     * let result = alibarray(data).update({ color: 'green' }, { name: 'paris' });
     */
  const update = (compareItem, updateItem, compareMode) => {
    let position = engine(compareItem, compareMode, 'position');
    if (position !== null) {
      arr[position] = {
        ...arr[position],
        ...updateItem
      };
    }
  };

  /**
     * replace first item in array containing an object with props and values matching that of passed compareItem with passed in update item, mutates the array passed to it
     * @param {object} compareItem - item to compare
     * @param {object} replaceItem - item to replace found item with
     * @param {string} [compareMode="all"] - compare mode 'all' matches all props on passed object 'any' any props match, 'exact' - exact match
     * @return {int}  - positon if array contains item, otherwise null 
     * @example 
     * // should replace first item in array found using { color: 'green' } that is { color: 'green', size: 12 } to { name: 'paris' }
     * let result = alibarray(data).replace({ color: 'green' }, { name: 'paris' });
     */
  const replace = (compareItem, replaceItem, compareMode) => {
    let position = engine(compareItem, compareMode, 'position');
    if (position !== null) {
      arr[position] = replaceItem;
    }
  };

  /**
     * checks if an array contains an object with props and values matching that of passed compareItem
     * @param {object} compareItem - item to compare
     * @param {string} [compareMode="all"] - compare mode 'all' matches all props on passed object 'any' any props match, 'exact' - exact match
     * @return {boolean}  - true if array contains item match
     * @example 
     * // check if array data contains object like: { color: 'green', size: 12 }
     * let result = alibarray(data).contains({ color: 'green', size: 12 });
     */
  const contains = (compareItem, compareMode) => position(compareItem, compareMode) !== null;

  /**
     * returns array of items from array containing an object with props and values matching that of passed compareItem 
     * @param {object} compareItem - item to compare
     * @param {string} [compareMode="all"] - compare mode 'all' matches all props on passed object 'any' any props match, 'exact' - exact match
     * @return {int}  - positon if array contains item, otherwise null 
     * @example 
     * // should return [  { color: 'blue', size: 44 }, { color: 'blue', size: 9 }, { color: 'blue', size: 4 }, { color: 'blue', size: 12 }] as item match object with passed props
     * let result = alibarray(data).match({ color: 'blue' });
     */
  const match = (compareItem, compareMode) => engine(compareItem, compareMode, 'match');

  /**
     * returns array of items from array containing an object with props and values not matching that of passed compareItem 
     * @param {object} compareItem - item to compare
     * @param {string} [compareMode="all"] - compare mode 'all' matches all props on passed object 'any' any props match, 'exact' - exact match
     * @return {int}  - positon if array contains item, otherwise null 
     * @example 
     * // should return [{ color: 'blue', size: 44 }, { color: 'blue', size: 9 }, { color: 'blue', size: 4 }, { color: 'blue', size: 12 }] as item match object with passed props
     * let result = alibarray(data).exclude({ color: 'blue' });
     */
  const exclude = (compareItem, compareMode) => engine(compareItem, compareMode, 'exclude');

  /**
   * returns number of items in array containing an object with props and values matching that of passed compareItem
   * @param {object} compareItem - item to compare
   * @param {string} [compareMode="all"] - compare mode 'all' matches all props on passed object 'any' any props match, 'exact' - exact match
   * @return {int}  - number of matching items 
   * @example 
   * // should return 3 as there are 3 items matching compareItem in the array
   * let result = alibarray(data).count({ color: 'green'});
   */
  const count = (compareItem, compareMode) => engine(compareItem, compareMode, 'count');

  /**
     * returns last item in array. if the array is empty, undefined is returned
     * @example 
     * // should return { color: 'black', size: 12 } as this is last item in array
     * let result = alibarray(data).last();
     */
  const last = () => {
    return arr.length > 0 ? arr[arr.length - 1] : undefined;
  };

  /**
     * returns first item in array. if the array is empty, undefined is returned
     * @example 
     * // should return { color: 'blue', size: 44 } as this is first item in array
     * let result = alibarray(data).first();
     */
  const first = () => {
    return arr.length > 0 ? arr[0] : undefined;
  };

  /**
     * returns items where prop of propName has a unique value
     * @param {string} propName - name of prop to do compare on
     * @example 
     * // should return [{ color: 'blue', size: 44 }, { color: 'green', size: 12 }, { color: 'red', size: 18 }, { color: 'gold', size: 15 }, { color: 'black', size: 12 }] as these are the first found unique value of 'color' for all objects in passed array
     * let result = alibarray(data).unique('color');
     */
  const unique = (propName) => {
    return arr.filter((item, pos, self) => self.findIndex(v => v[propName] === item[propName]) === pos)
  };


  return {
    move,
    swap,
    insert,
    contains,
    position,
    match,
    exclude,
    find,
    update,
    replace,
    count,
    last,
    first,
    unique
  };
};

module.exports = alibarray;