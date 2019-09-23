# alib-array
A set of JavaScript array helper functions

## Install

Install with [npm](https://www.npmjs.com/):

```sh

$ npm i alib-array --save

```

## Usage

contains - checks if an array contains an object with props and values matching that of passed compareObject:

```js

const alibarray = require('alib-array');

var data = [
    { color: 'blue', size: 44 },
    { color: 'green', size: 12 },
    { color: 'red', size: 18 },
    { color: 'blue', size: 9 },
    { color: 'blue', size: 4 },
    { color: 'blue', size: 12 },
    { color: 'black', size: 12 },
];

var result = alibarray().contains(data, { color: 'green', size: 12 });
//=> true - exact match

var result = alibarray().contains(data, { color: 'green', size: 25 });
//=> false

var result = alibarray().contains(data, { color: 'green' });
//=> true - although not an exact match, the array contains an object with prop color equal to green

```

contains can also check for primitives:

```js

var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var result = alibarray().contains(data, 7);
//=> true

var result = alibarray().contains(data, 99);
//=> false

```

position - returns position of first item in array containing an object with props and values matching that of passed compareObject - if nothing is found, null is returned :

```js

const alibarray = require('alib-array');

var data = [
    { color: 'blue', size: 44 },
    { color: 'green', size: 12 },
    { color: 'red', size: 18 },
    { color: 'blue', size: 9 },
    { color: 'blue', size: 4 },
    { color: 'blue', size: 12 },
    { color: 'black', size: 12 },
];

var result = alibarray().position(data, { color: 'green', size: 12 });
//=> 1 - item at index position 1

var result = alibarray().position(data, { color: 'green' });
//=> 1 - item at index position 1


var result = alibarray().position(data, { color: 'green', size: 12, details : {shape: 'round', name: 'circle'} });
//=> null - return null as item is not in the array

```

move - moves an item in an array, mutates the array passed to it

```js

var data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
alibarray().move(data, 4, 8);

console.log(data);
//=> [0, 1, 2, 3, 5, 6, 7, 8, 4, 9, 10];

```

insert - inserts an item into an array, if index value is bigger than length of array, item will be placed at the end

```js

var data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
alibarray().insert(data, 99, 4);

console.log(data);
//=> [0, 1, 2, 3, 99, 4, 5, 6, 7, 8, 9, 10];

```
