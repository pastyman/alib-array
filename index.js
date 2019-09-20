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
  }

  /**
     * inserts an item into an array, mutates the array passed to it
     * @param {array} arr - array for operation to be executed on
     * @param {object/string/int} item - item to insert
     * @param {int} index - position in array to insert item - if value is bigger than length of array, item will be placed at the end
     */
  var insert = function (arr, item, index) {
    arr.splice(index, 0, item)
  }

  /**
     * checks if an array contains an object with props and values matching that of passed compareObject 
     * @param {array} arr - array for operation to be executed on
     * @param {object} compareItem - item to compare
     * @return {boolean}  - true if array contains 
     */
  var contains = function (arr, compareItem) {
    if (position(arr, compareItem) !== null) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
     * returns position of first item in array containing an object with props and values matching that of passed compareObject - if nothing is found, null is returned 
     * @param {array} arr - array for operation to be executed on
     * @param {object} compareItem - item to compare
     * @return {boolean}  - true if array contains 
     */  
  var position = function (arr, compareItem) {
    var pos = null;

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
          pos = i;
          break;
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
  }

  return {
    move: move,
    insert: insert,
    contains: contains
  };
};
