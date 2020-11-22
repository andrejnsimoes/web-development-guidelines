
## [.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

Creates a new array based on whether the items of an array pass a certain condition.

**Example**

Create an array of student ages that meet the legal drinking age.

```javascript
const studentsAge = [17, 16, 18, 19, 21, 17];
const ableToDrink = studentsAge.filter( age => age > 18 );

// ableToDrink will be equal to [19, 21]
```

## [.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

Creates a new array by manipulating the values in another array. Great for data manipulation and it is often used in React because it is an immutable method.

**Example**

Create an array that adds a $ to the beginning of each number.

```javascript
const numbers = [2, 3, 4, 5];
const dollars = numbers.map( number => '$' + number);

// dollars will be equal to ['$2', '$3', '$4', '$5']
```

## [.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)

This often overlooked method uses an accumulator to reduce all items in an array to a single value. Great for calculating totals. The returned value can be of any type (i.e. object, array, string, integer).

**Example**

Add up the integers in an array.

```javascript
const numbers = [5, 10, 15];
const total = numbers.reduce( (accumulator, currentValue) => accumulator + currentValue);

// total will be equal to 30
```

There are some really cool use cases for .reduce() outlined in the MDN docs that provide examples on how to do things likes flattening an array of arrays, grouping objects by a property, and removing duplicate items in array.

## [.forEach()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

Applies a function on each item in an array.

**Example**

Log each array item to the console

```javascript
const emotions = ['happy', 'sad', 'angry'];
emotions.forEach( emotion => console.log(emotion) );

// Will log the following:
// 'happy'
// 'sad'
// 'angry'
```

## [.some()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

Checks if any item in an array passes the condition. A good use case would be checking for user privileges. It can also be used similarly to a .forEach() where you would perform an action on each array item and break out of the loop once a *truthy* value is returned.

**Example**

Check if there is at least one 'admin' in an array.

```javascript
const userPrivileges = ['user', 'user', 'user', 'admin'];
const containsAdmin = userPrivileges.some( element => element === 'admin');

// containsAdmin will be equal to true
```

## [.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

Similar to .some(), but checks if all items in an array pass a condition.

**Example**

Check if all ratings are equal to or greater than 3 stars.

```javascript
const ratings = [3, 5, 4, 3, 5];
const goodOverallRating = ratings.every( rating => rating >= 3 );

// goodOverallRating will be equal to true
```

## [.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

Checks if an array contains a certain value. It’s similar to .some(),but instead of looking for a condition to pass, it looks if the array contains a specific value.

**Example**

Check if the array includes an item with the string ‘waldo’.

```javascript
const names = ['sophie', 'george', 'waldo', 'stephen', 'henry'];
const includesWaldo = names.includes('waldo');

// includesWaldo will be equal to true
```

## [Array.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

This is a static method that creates an array based on another array or string. You can also pass a map callback function as an argument to further shape the data in the new array. Honestly, I’m not too sure why someone would use this over the .map() method.

**Example**

Create an array from a string.

```javascript
const newArray = Array.from('hello');

// newArray will be equal to ['h', 'e', 'l', 'l', 'o']
```

Create an array that has double the value for each item in another array.

```javascript
const doubledValues = Array.from([2, 4, 6], number => number * 2);

// doubleValues will be equal to [4, 8, 12]
```

## [Object.values()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)

Return an array of the values of an object.

**Example**

```javascript
const icecreamColors = {
    chocolate: 'brown',
    vanilla: 'white',
    strawberry: 'red',
}

const colors = Object.values(icecreamColors);

// colors will be equal to ["brown", "white", "red"]
```

## [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

Return an array of the keys of an object.

**Example**

```javascript
const icecreamColors = {
    chocolate: 'brown',
    vanilla: 'white',
    strawberry: 'red',
}

const types = Object.keys(icecreamColors);

// types will be equal to ["chocolate", "vanilla", "strawberry"]
```

## [Object.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

Creates an array which contains arrays of key/value pairs of an object.

**Example**

```javascript
const weather = {
    rain: 0,
    temperature: 24,
    humidity: 33,
}

const entries = Object.entries(weather);

// entries will be equal to
// [['rain', 0], ['temperature', 24], ['humidity', 33]]
```

## [Array spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

Spreading arrays using the spread operator (…) allows you to expand the elements in an array. It’s useful when concatenating a bunch of arrays together. It’s also a good way to avoid using the splice() method when looking to remove certain elements from an array because it can be combined with the slice() method to prevent direct mutation of an array.

**Example**

Combine two arrays.

```javascript
const spreadableOne = [1, 2, 3, 4];
const spreadableTwo = [5, 6, 7, 8];

const combined = [...spreadableOne, ...spreadableTwo];

// combined will be equal to [1, 2, 3, 4, 5, 6, 7, 8]
```

Remove an array element without mutating the original array.

```javascript
const animals = ['squirrel', 'bear', 'deer', 'salmon', 'rat'];
const mammals = [...animals.slice(0,3), ...animals.slice(4)];

// mammals will be equal to ['squirrel', 'bear', 'deer', 'rat']
```

## [Object spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

Spreading an object allows for the addition of new properties and values to an object without mutations (i.e. a new object is created) and it can also be used to combine multiple objects together. It should be noted that spreading objects does not do nested copying.

**Example**

Add a new object property and value without mutating the original object.

```javascript
const spreadableObject = {
    name: 'Robert',
    phone: 'iPhone'
};

const newObject = {
    ...spreadableObject,
    carModel: 'Volkswagen'
}

// newObject will be equal to
// { carModel: 'Volkswagen', name: 'Robert', phone: 'iPhone' }
```

## [Function Rest](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)

Functions can use the rest parameter syntax to accept any number of arguments as an array.

**Example**

Display the array of passed arguments.

```javascript
function displayArgumentsArray(...theArguments) {
    console.log(theArguments);
}

displayArgumentsArray('hi', 'there', 'bud');

// Will print ['hi', 'there', 'bud']
```

## [Object.freeze()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze)

Prevents you from modifying existing object properties or adding new properties and values to an object. It’s often what people think const does, however const allows you to modify an object.

**Example**

Freeze an object to prevent the name property from being changed.

```javascript
const frozenObject = {
    name: 'Robert'
}

Object.freeze(frozenObject);

frozenObject.name = 'Henry';

// frozenObject will be equal to { name: 'Robert' }
```

## [Object.seal()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal)

Stops any new properties from being added to an object, but still allows for existing properties to be changed.

**Example**

Seal an object to prevent the wearsWatch property from being added.

```javascript
const sealedObject = {
    name: 'Robert'
}

Object.seal(sealedObject);

sealedObject.name = 'Bob';
sealedObject.wearsWatch = true;

// sealedObject will be equal to { name: 'Bob' }
```

## [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

Allows for objects to be combined together. This method is not really needed because you can use the object spread syntax instead. Like the object spread operator, Object.assign() does not do deep cloning. Lodash is your best friend when it comes to deep cloning objects.

**Example**

Combine two objects into one.

```javascript
const firstObject = {
    firstName: 'Robert'
}

const secondObject = {
    lastName: 'Cooper'
}

const combinedObject = Object.assign(firstObject, secondObject);
// combinedObject will be equal to { firstName: 'Robert', lastName: 'Cooper' }
```

<br>

::: tip BASED ON
[`Useful Javascript Array and Object Methods`](https://codeburst.io/useful-javascript-array-and-object-methods-6c7971d93230) article from Robert Cooper on codeburst
:::
