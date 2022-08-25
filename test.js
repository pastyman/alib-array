'use strict';

/* deps:mocha */
var assert = require('assert');

//init
var alibarray = require('./');

//vars
var data = [
  { color: 'blue', size: 44 },
  { color: 'green', size: 12 },
  { color: 'red', size: 18 },
  { color: 'blue', size: 9 },
  { color: 'blue', size: 4 },
  { color: 'blue', size: 12 },
  { color: 'black', size: 12 },
];
var datat1 = [
  { color: 'blue', size: 44 },
  { color: 'green', size: 12 },
  { color: 'red', size: 18 },
  { color: 'gold', size: 15 },
  { color: 'blue', size: 9 },
  { color: 'blue', size: 4 },
  { color: 'blue', size: 12 },
  { color: 'black', size: 12 },
];
var datat2 = { color: 'blue', size: 44 };
var datat3 = { color: 'black', size: 12 };
var datat4 = [{ color: 'blue', size: 44 }, { color: 'green', size: 12 }, { color: 'red', size: 18 }, { color: 'gold', size: 15 }, { color: 'black', size: 12 }];
var datat5 = [{ color: 'blue', size: 44 }, { color: 'blue', size: 9 }, { color: 'blue', size: 4 }, { color: 'blue', size: 12 }];
var datat6 = [{ color: 'green', size: 12 }, { color: 'red', size: 18 }, { color: 'gold', size: 15 }, { color: 'black', size: 12 }];

var data2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var data3 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var data3t1 = [0, 1, 2, 3, 5, 6, 7, 8, 4, 9, 10];

var data4 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var data4t1 = [0, 1, 2, 3, 99, 4, 5, 6, 7, 8, 9, 10];

var data5 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var data5t1 = [0, 1, 2, 3, 8, 5, 6, 7, 4, 9, 10];

var data6 = [
  { color: 'blue', size: 44, postIds: [] },
  { color: 'green', size: 12, postIds: [7, 12, 15, 18] },
  { color: 'red', size: 18, postIds: [7, 12, 15, 18] },
  { color: 'blue', size: 9, postIds: [] },
  { color: 'blue', size: 4, postIds: [] },
  { color: 'blue', size: 12, postIds: [9, 10, 15, 18] },
  { color: 'black', size: 12, postIds: [9, 10, 15, 18] },
];
var data6t1 = [
  { color: 'blue', size: 44, postIds: [] },
  { color: 'blue', size: 9, postIds: [] },
  { color: 'blue', size: 4, postIds: [] },
];
var data6t2 = [
  { color: 'green', size: 12, postIds: [7, 12, 15, 18] },
  { color: 'red', size: 18, postIds: [7, 12, 15, 18] }
];
var data6t3 = [
  { color: 'green', size: 12, postIds: [7, 12, 15, 18] },
  { color: 'red', size: 18, postIds: [7, 12, 15, 18] },
  { color: 'blue', size: 12, postIds: [9, 10, 15, 18] },
  { color: 'black', size: 12, postIds: [9, 10, 15, 18] },
];
var data6t4 = [
  { color: 'blue', size: 44, postIds: [] },
  { color: 'blue', size: 9, postIds: [] },
  { color: 'blue', size: 4, postIds: [] },
  { color: 'blue', size: 12, postIds: [9, 10, 15, 18] },
  { color: 'black', size: 12, postIds: [9, 10, 15, 18] },
];

var dataUpdate = [
  { color: 'blue', size: 44 },
  { color: 'green', size: 12 },
  { color: 'red', size: 18 },
  { color: 'blue', size: 9 },
  { color: 'blue', size: 4 },
  { color: 'blue', size: 12 },
  { color: 'black', size: 12 },
];
var dataUpdatet1 = [
  { color: 'blue', size: 44 },
  { color: 'green', name: 'paris', size: 12 },
  { color: 'red', size: 18 },
  { color: 'blue', size: 9 },
  { color: 'blue', size: 4 },
  { color: 'blue', size: 12 },
  { color: 'black', size: 12 },
];

var dataReplace = [
  { color: 'blue', size: 44 },
  { color: 'green', size: 12 },
  { color: 'red', size: 18 },
  { color: 'blue', size: 9 },
  { color: 'blue', size: 4 },
  { color: 'blue', size: 12 },
  { color: 'black', size: 12 },
];
var dataReplacet1 = [
  { color: 'blue', size: 44 },
  { name: 'paris' },
  { color: 'red', size: 18 },
  { color: 'blue', size: 9 },
  { color: 'blue', size: 4 },
  { color: 'blue', size: 12 },
  { color: 'black', size: 12 },
];

describe('alibarray', function () {
  describe('#contains()', function () {
    it('should return true as item is contained in the array', function () {
      var result = alibarray(data).contains({ color: 'green', size: 12 });
      assert.equal(result, true);
    });

    it('should return true as item is contained in the array', function () {
      var result = alibarray(data).contains({ color: 'green' });
      assert.equal(result, true);
    });

    it('should return true as item is contained in the array', function () {
      var result = alibarray(data).contains({});
      assert.equal(result, true);
    });

    it('should return false as item is not contained in the array', function () {
      var result = alibarray(data).contains({ color: 'green', size: 12, details: { shape: 'round', name: 'circle' } });
      assert.equal(result, false);
    });

    it('should return false as item is not contained in the array', function () {
      var result = alibarray(data).contains({ color: 'green', size: 25 });
      assert.equal(result, false);
    });

    it('should return false as item is not contained in the array', function () {
      var result = alibarray(data).contains({ color: 'green', size: 25, type: 'jumper' });
      assert.equal(result, false);
    });

    it('should return false as item is not contained in the array', function () {
      var result = alibarray(data).contains({ mega: true });
      assert.equal(result, false);
    });

    it('should return false as exact item is not contained in the array', function () {
      var result = alibarray(data).contains({ color: 'green' }, 'exact');
      assert.equal(result, false);
    });

    it('should return true as one item with matching prop contained in the array', function () {
      var result = alibarray(data).contains({ color: 'green', size: 12, details: { shape: 'round', name: 'circle' } }, 'any');
      assert.equal(result, true);
    });

    it('should return false as primative is not contained in the array', function () {
      var result = alibarray(data).contains(7);
      assert.equal(result, false);
    });

    it('should return true as primative is contained in the array', function () {
      var result = alibarray(data2).contains(7);
      assert.equal(result, true);
    });

    it('should return false as primative is not contained in the array', function () {
      var result = alibarray(data2).contains(41);
      assert.equal(result, false);
    });



  });

  describe('#position()', function () {
    it('should return 1 as item is at index pos 1 in the array', function () {
      var result = alibarray(data).position({ color: 'green', size: 12 });
      assert.equal(result, 1);
    });

    it('should return 1 as item is at index pos 1 in the array', function () {
      var result = alibarray(data).position({ color: 'green' });
      assert.equal(result, 1);
    });

    it('should return 0 as item is at index pos 0 in the array', function () {
      var result = alibarray(data).position({});
      assert.equal(result, 0);
    });

    it('should return null as item is not contained in the array', function () {
      var result = alibarray(data).position({ color: 'green', size: 12, details: { shape: 'round', name: 'circle' } });
      assert.equal(result, null);
    });

    it('should return null as item is not contained in the array', function () {
      var result = alibarray(data).position({ color: 'green', size: 25 });
      assert.equal(result, null);
    });

    it('should return null as item is not contained in the array', function () {
      var result = alibarray(data).position({ color: 'green', size: 25, type: 'jumper' });
      assert.equal(result, null);
    });

    it('should return null as item is not contained in the array', function () {
      var result = alibarray(data).position({ mega: true });
      assert.equal(result, null);
    });

    it('should return null as primative is not contained in the array', function () {
      var result = alibarray(data).position(7);
      assert.equal(result, null);
    });

    it('should return 6 as primative is at index pos 6 in the array', function () {
      var result = alibarray(data2).position(7);
      assert.equal(result, 6);
    });

    it('should return null as primative is not contained in the array', function () {
      var result = alibarray(data2).position(41);
      assert.equal(result, null);
    });
  });


  describe('#find()', function () {
    it('should return item at index pos 1 in the array', function () {
      var result = alibarray(data).find({ color: 'green', size: 12 });
      assert.deepEqual(result, { color: 'green', size: 12 });
    });

    it('should return item at index pos 1 in the array', function () {
      var result = alibarray(data).find({ color: 'green' });
      assert.deepEqual(result, { color: 'green', size: 12 });
    });

    it('should return 0 as item is at index pos 0 in the array', function () {
      var result = alibarray(data).find({});
      assert.deepEqual(result, { color: 'blue', size: 44 });
    });

    it('should return null as item is not contained in the array', function () {
      var result = alibarray(data).find({ color: 'green', size: 12, details: { shape: 'round', name: 'circle' } });
      assert.equal(result, null);
    });

    it('should return null as item is not contained in the array', function () {
      var result = alibarray(data).find({ color: 'green', size: 25 });
      assert.equal(result, null);
    });

    it('should return null as item is not contained in the array', function () {
      var result = alibarray(data).find({ color: 'green', size: 25, type: 'jumper' });
      assert.equal(result, null);
    });

    it('should return null as item is not contained in the array', function () {
      var result = alibarray(data).find({ mega: true });
      assert.equal(result, null);
    });

    it('should return null as primative is not contained in the array', function () {
      var result = alibarray(data).find(7);
      assert.equal(result, null);
    });

    it('should return 7 as 7 in the array', function () {
      var result = alibarray(data2).find(7);
      assert.equal(result, 7);
    });

    it('should return null as primative is not contained in the array', function () {
      var result = alibarray(data2).find(41);
      assert.equal(result, null);
    });

    it('should return null as non array passed in', function () {
      var result = alibarray(undefined).find({ color: 'green', size: 12 });
      assert.deepEqual(result, null);
    });    
  });  

  describe('#count()', function () {
    it('should return 1 as 1 item matches in the array', function () {
      var result = alibarray(data).count( { color: 'green', size: 12 });
      assert.equal(result, 1);
    });

    it('should return 4 as 4 item matches in the array', function () {
      var result = alibarray(data).count( { color: 'blue' });
      assert.equal(result, 4);
    });

    it('should return 3 as 3 item matches in the array', function () {
      var result = alibarray(data).count( { size: 12 });
      assert.equal(result, 3);
    });

    it('should return 0 as 0 item matches in the array', function () {
      var result = alibarray(data).count( { color: 'green', size: 55 });
      assert.equal(result, 0);
    });
  });

  describe('#insert()', function () {
    it('should insert item at index position 3', function () {
      alibarray(data).insert({ color: 'gold', size: 15 }, 3);
      assert.deepEqual(data, datat1);
    });
  });

  describe('#move()', function () {
    it('should move item from index 4 to index 8', function () {
      alibarray(data3).move(4, 8);
      assert.deepEqual(data3, data3t1);
    });
  });

  describe('#insert()', function () {
    it('should insert item at index 4', function () {
      alibarray(data4).insert(99, 4);
      assert.deepEqual(data4, data4t1);
    });
  });

  describe('#swap()', function () {
    it('should swap items at index 4 and 8', function () {
      alibarray(data5).swap(4, 8);
      assert.deepEqual(data5, data5t1);
    });
  });

  describe('#first()', function () {
    it('should return first item in array', function () {
      var result = alibarray(data).first();
      assert.deepEqual(result, datat2);
    });
    it('should return undefined as array empty', function () {
      var result = alibarray([]).first();
      assert.deepEqual(result, undefined);
    });
  });

  describe('#last()', function () {
    it('should return last item in array', function () {
      var result = alibarray(data).last();
      assert.deepEqual(result, datat3);
    });
    it('should return undefined as array empty', function () {
      var result = alibarray([]).last();
      assert.deepEqual(result, undefined);
    });
  });

  describe('#unique()', function () {
    it('should return first items found with unique color prop value', function () {
      var result = alibarray(data).unique('color');
      assert.deepEqual(result, datat4);
    });
  });

  describe('#match()', function () {
    it('should return array of items with item match object with passed props', function () {
      var result = alibarray(data).match({ color: 'blue' });
      assert.deepEqual(result, datat5);
    });
    it('should return array of items with item match object with passed props of empty array', function () {
      var result = alibarray(data6).match({ postIds: [] });

      assert.deepEqual(result, data6t1);
    });
    it('should return array of items with item match object with passed props of passed array', function () {
      var result = alibarray(data6).match({ postIds: [7, 12, 15, 18] });

      assert.deepEqual(result, data6t2);
    });
  });

  describe('#exclude()', function () {
    it('should return array of items with item excluding match object with passed props', function () {
      var result = alibarray(data).exclude({ color: 'blue' });

      console.log('result', result)
      assert.deepEqual(result, datat6);
    });
    it('should return array of items with item excluding match object with passed props of empty array', function () {
      var result = alibarray(data6).exclude({ postIds: [] });

      assert.deepEqual(result, data6t3);
    });
    it('should return array of items with item excluding match object with passed props of passed array', function () {
      var result = alibarray(data6).exclude({ postIds: [7, 12, 15, 18] });

      assert.deepEqual(result, data6t4);
    });
  });  

  describe('#update()', function () {
    it('should update found item with additional props', function () {
      alibarray(dataUpdate).update({ color: 'green' }, { name: 'paris'});
      assert.deepEqual(dataUpdate, dataUpdatet1);
    });
  }); 

  describe('#replace()', function () {
    it('should replace found item with passed object', function () {
      alibarray(dataReplace).replace({ color: 'green' }, { name: 'paris'});
      assert.deepEqual(dataReplace, dataReplacet1);
    });
  });   

});