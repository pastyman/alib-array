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

var data2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var data3 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var data3t1 = [0, 1, 2, 3, 5, 6, 7, 8, 4, 9, 10];

var data4 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var data4t1 = [0, 1, 2, 3, 99, 4, 5, 6, 7, 8, 9, 10];

var data5 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var data5t1 = [0, 1, 2, 3, 8, 5, 6, 7, 4, 9, 10];

describe('alibarray', function () {
    describe('#contains()', function () {
        it('should return true as item is contained in the array', function () {
            var result = alibarray().contains(data, { color: 'green', size: 12 });
            assert.equal(result, true);
        });

        it('should return true as item is contained in the array', function () {
            var result = alibarray().contains(data, { color: 'green' });
            assert.equal(result, true);
        });    
        
        it('should return true as item is contained in the array', function () {
            var result = alibarray().contains(data, { });
            assert.equal(result, true);
        });       
        
        it('should return false as item is not contained in the array', function () {
            var result = alibarray().contains(data, { color: 'green', size: 12, details : {shape: 'round', name: 'circle'} });
            assert.equal(result, false);
        });        

        it('should return false as item is not contained in the array', function () {
            var result = alibarray().contains(data, { color: 'green', size: 25 });
            assert.equal(result, false);
        });        

        it('should return false as item is not contained in the array', function () {
            var result = alibarray().contains(data, { color: 'green', size: 25, type: 'jumper' });
            assert.equal(result, false);
        });    

        it('should return false as item is not contained in the array', function () {
            var result = alibarray().contains(data, { mega: true });
            assert.equal(result, false);
        });  
        
        it('should return false as exact item is not contained in the array', function () {
            var result = alibarray().contains(data, { color: 'green' }, 'exact');
            assert.equal(result, false);
        }); 

        it('should return true as one item with matching prop contained in the array', function () {
            var result = alibarray().contains(data, { color: 'green', size: 12, details : {shape: 'round', name: 'circle'} }, 'any');
            assert.equal(result, true);
        });        

        it('should return false as primative is not contained in the array', function () {
            var result = alibarray().contains(data, 7);
            assert.equal(result, false);
        });   
        
        it('should return true as primative is contained in the array', function () {
            var result = alibarray().contains(data2, 7);
            assert.equal(result, true);
        }); 

        it('should return false as primative is not contained in the array', function () {
            var result = alibarray().contains(data2, 41);
            assert.equal(result, false);
        });   



    });
    
    describe('#position()', function () {
        it('should return 1 as item is at index pos 1 in the array', function () {
            var result = alibarray().position(data, { color: 'green', size: 12 });
            assert.equal(result, 1);
        });

        it('should return 1 as item is at index pos 1 in the array', function () {
            var result = alibarray().position(data, { color: 'green' });
            assert.equal(result, 1);
        });    
        
        it('should return 0 as item is at index pos 0 in the array', function () {
            var result = alibarray().position(data, { });
            assert.equal(result, 0);
        });       
        
        it('should return null as item is not contained in the array', function () {
            var result = alibarray().position(data, { color: 'green', size: 12, details : {shape: 'round', name: 'circle'} });
            assert.equal(result, null);
        });        

        it('should return null as item is not contained in the array', function () {
            var result = alibarray().position(data, { color: 'green', size: 25 });
            assert.equal(result, null);
        });        

        it('should return null as item is not contained in the array', function () {
            var result = alibarray().position(data, { color: 'green', size: 25, type: 'jumper' });
            assert.equal(result, null);
        });    

        it('should return null as item is not contained in the array', function () {
            var result = alibarray().position(data, { mega: true });
            assert.equal(result, null);
        });  
        
        it('should return null as primative is not contained in the array', function () {
            var result = alibarray().position(data, 7);
            assert.equal(result, null);
        });   
        
        it('should return 6 as primative is at index pos 6 in the array', function () {
            var result = alibarray().position(data2, 7);
            assert.equal(result, 6);
        }); 

        it('should return null as primative is not contained in the array', function () {
            var result = alibarray().position(data2, 41);
            assert.equal(result, null);
        });   
    });

    describe('#count()', function () {
        it('should return 1 as 1 item matches in the array', function () {
            var result = alibarray().count(data, { color: 'green', size: 12 });
            assert.equal(result, 1);
        });

        it('should return 4 as 4 item matches in the array', function () {
            var result = alibarray().count(data, { color: 'blue' });
            assert.equal(result, 4);
        });    

        it('should return 3 as 3 item matches in the array', function () {
            var result = alibarray().count(data, { size: 12 });
            assert.equal(result, 3);
        }); 
        
        it('should return 0 as 0 item matches in the array', function () {
            var result = alibarray().count(data, { color: 'green', size: 55 });
            assert.equal(result, 0);
        });        
    });

    describe('#insert()', function () {
        it('should insert item at index position 3', function () {
            alibarray().insert(data, { color: 'gold', size: 15 }, 3);
            assert.deepEqual(data, datat1);
        });
    });  
    
    describe('#move()', function () {
        it('should move item from index 4 to index 8', function () {
            alibarray().move(data3, 4, 8);
            assert.deepEqual(data3, data3t1);
        });
    });    

    describe('#insert()', function () {
        it('should insert item at index 4', function () {
            alibarray().insert(data4, 99, 4);
            assert.deepEqual(data4, data4t1);
        });
    });     

    describe('#swap()', function () {
        it('should swap items at index 4 and 8', function () {
            alibarray().swap(data5, 4, 8);
            assert.deepEqual(data5, data5t1);
        });
    });      
});