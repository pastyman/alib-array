# alib-array

A set of JavaScript array helper functions:
* position - returns index position of first item in array containing an object with props and values matching that of passed object.
* contains - Check if array contains object with props and values matching that of passed object.
* count - returns number of items in array containing an object with props and values matching that of passed object.
* move - moves an item in array.
* swap - swaps 2 items position in an array.
* first - get first item of array, returns undefined if array empty.
* last - get last item of array, returns undefined if array empty.
* unique - returns items where prop of propName has a unique value.
* match - returns array of items in array containing an object with props and values matching that of passed object.
* find - returns first item in array containing an object with props and values matching that of passed object.
* exclude - returns array of items in array containing an object with props and values not matching that of passed object.
* update - updates first item in array containing an object with props and values matching that of passed object.
* replace - replaces first item in array containing an object with props and values matching that of passed object.
* insert - inserts an item into an array at passed index, if index is longer than array item is added to end of array.

## Install

Install with [npm](https://www.npmjs.com/):

```sh

$ npm i alib-array --save

```

## Usage

import or require:

```js

const alibarray = require('alib-array');

//or

import alibarray from 'alib-array';

```

contains - checks if an array contains an object with props and values matching that of passed compareObject:

```js

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

//compareMode can be passed defaults to all - compare mode 'all' matches all props on passed object 'any' any props match from passed object, 'exact' - exact match 

var result = alibarray().contains(data, { color: 'green' }, 'exact');
//=> false - an exact match of { color: 'green' } not found in the array

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

//compareMode can be passed defaults to all - compare mode 'all' matches all props on passed object 'any' any props match from passed object, 'exact' - exact match 

var result = alibarray().position(data, { color: 'green' }, 'exact');
//=> null - an exact match of { color: 'green' } not found in the array

var result = alibarray().position(data, { color: 'green', size: 12, details : {shape: 'round', name: 'circle'} });
//=> null - return null as item is not in the array

```

count - returns number of items in array containing an object with props and values matching that of passed compareItem:

```js

var data = [
    { color: 'blue', size: 44 },
    { color: 'green', size: 12 },
    { color: 'red', size: 18 },
    { color: 'blue', size: 9 },
    { color: 'blue', size: 4 },
    { color: 'blue', size: 12 },
    { color: 'black', size: 12 },
];

var result = alibarray().count(data, { color: 'green', size: 12 });
//=> 1 - 1 items match

var result = alibarray().count(data, { color: 'blue' });
//=> 4 - 4 items match


var result = alibarray().count(data, { color: 'green', size: 12, details : {shape: 'round', name: 'circle'} });
//=> 0 - 0 items match

```
match - returns array of items in array containing an object with props and values matching that of passed compareItem:

```js

var data = [
    { color: 'blue', size: 44 },
    { color: 'green', size: 12 },
    { color: 'red', size: 18 },
    { color: 'blue', size: 9 },
    { color: 'blue', size: 4 },
    { color: 'blue', size: 12 },
    { color: 'black', size: 12 },
];

var result = alibarray().match(data, { color: 'green', size: 12 });
//=> [{ color: 'green', size: 12 }]

var result = alibarray().match(data, { color: 'blue' });
//=> [{ color: 'blue', size: 44 }, { color: 'blue', size: 9 }, { color: 'blue', size: 4 }, { color: 'blue', size: 12 }]


var result = alibarray().match(data, { color: 'green', size: 12, details : {shape: 'round', name: 'circle'} });
//=> []

```

find - returns first item in array containing an object with props and values matching that of passed compareObject - if nothing is found, null is returned :

```js

var data = [
    { color: 'blue', size: 44 },
    { color: 'green', size: 12 },
    { color: 'red', size: 18 },
    { color: 'blue', size: 9 },
    { color: 'blue', size: 4 },
    { color: 'blue', size: 12 },
    { color: 'black', size: 12 },
];

var result = alibarray().find(data, { color: 'green', size: 12 });
//=> { color: 'green', size: 12 }

var result = alibarray().find(data, { color: 'green' });
//=> { color: 'green', size: 12 }

//compareMode can be passed defaults to all - compare mode 'all' matches all props on passed object 'any' any props match from passed object, 'exact' - exact match 

var result = alibarray().find(data, { color: 'green' }, 'exact');
//=> null - an exact match of { color: 'green' } not found in the array

var result = alibarray().find(data, { color: 'green', size: 12, details : {shape: 'round', name: 'circle'} });
//=> null - return null as item is not in the array

```


exclude - returns array of items in array containing an object with props and values not matching that of passed compareItem:

```js

var data = [
    { color: 'blue', size: 44 },
    { color: 'green', size: 12 },
    { color: 'red', size: 18 },
    { color: 'blue', size: 9 },
    { color: 'blue', size: 4 },
    { color: 'blue', size: 12 },
    { color: 'black', size: 12 },
];

var result = alibarray().exclude(data, { color: 'green', size: 12 });
//=> [{ color: 'blue', size: 44 }, { color: 'red', size: 18 }, { color: 'blue', size: 9 }, { color: 'blue', size: 4 }, { color: 'blue', size: 12 }, { color: 'black', size: 12 }]

var result = alibarray().exclude(data, { color: 'blue' });
//=> [{ color: 'green', size: 12 }, { color: 'red', size: 18 }, { color: 'black', size: 12 }]

var result = alibarray().exclude(data, { color: 'green', size: 12, details : {shape: 'round', name: 'circle'} });
//=> [ { color: 'blue', size: 44 }, { color: 'green', size: 12 }, { color: 'red', size: 18 }, { color: 'blue', size: 9 }, { color: 'blue', size: 4 }, { color: 'blue', size: 12 }, { color: 'black', size: 12 }]

```

move - moves an item in an array, mutates the array passed to it

```js

var data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
alibarray().move(data, 4, 8);

console.log(data);
//=> [0, 1, 2, 3, 5, 6, 7, 8, 4, 9, 10]

```

insert - inserts an item into an array, if index value is bigger than length of array, item will be placed at the end

```js

var data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
alibarray().insert(data, 99, 4);

console.log(data);
//=> [0, 1, 2, 3, 99, 4, 5, 6, 7, 8, 9, 10]

```

swap - swaps the position of 2 items in an array, mutates the array passed to it

```js

var data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
alibarray().swap(data, 4, 8);

console.log(data);
//=> [0, 1, 2, 3, 8, 5, 6, 7, 4, 9, 10]

```

first - returns first item in array. if the array is empty, undefined is returned

```js

var data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var result = alibarray().first(data);

console.log(result);
//=> 0

```

last - returns last item in array. if the array is empty, undefined is returned

```js

var data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var result = alibarray().last(data);

console.log(result);
//=> 10

```

update - updates first item in array containing an object with props and values matching that of passed compareObject with update item, mutates array passed to it
```js

var data = [
    { color: 'blue', size: 44 },
    { color: 'green', size: 12 },
    { color: 'red', size: 18 },
    { color: 'blue', size: 9 },
    { color: 'blue', size: 4 },
    { color: 'blue', size: 12 },
    { color: 'black', size: 12 },
];

var result = alibarray().update(data, { color: 'green' }, { name: 'paris' });
//=> [ { color: 'blue', size: 44 }, { color: 'green', size: 12, name: 'paris' }, { color: 'red', size: 18 }, { color: 'blue', size: 9 }, { color: 'blue', size: 4 }, { color: 'blue', size: 12 }, { color: 'black', size: 12 } ]

```

replace - replaces first item in array containing an object with props and values matching that of passed compareObject with replace item, mutates array passed to it
```js

var data = [
    { color: 'blue', size: 44 },
    { color: 'green', size: 12 },
    { color: 'red', size: 18 },
    { color: 'blue', size: 9 },
    { color: 'blue', size: 4 },
    { color: 'blue', size: 12 },
    { color: 'black', size: 12 },
];

var result = alibarray().update(data, { color: 'green' }, { name: 'paris' });
//=> [ { color: 'blue', size: 44 }, { name: 'paris' }, { color: 'red', size: 18 }, { color: 'blue', size: 9 }, { color: 'blue', size: 4 }, { color: 'blue', size: 12 }, { color: 'black', size: 12 } ]

```

unique - returns items where prop of propName has a unique value.

```js

var data = [
  { color: 'blue', size: 44 },
  { color: 'green', size: 12 },
  { color: 'red', size: 18 },
  { color: 'gold', size: 15 },
  { color: 'blue', size: 9 },
  { color: 'blue', size: 4 },
  { color: 'blue', size: 12 },
  { color: 'black', size: 12 },
];

var result = alibarray().unique(data, 'color');
//=> [{ color: 'blue', size: 44 }, { color: 'green', size: 12 }, { color: 'red', size: 18 }, { color: 'gold', size: 15 }, { color: 'black', size: 12 }] only items with unique value for prop color are returned

```