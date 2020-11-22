
[ES6](https://codeburst.io/javascript-wtf-is-es6-es8-es-2017-ecmascript-dca859e4821c) tips and tricks to make your code cleaner, shorter, and easier to read!

## Template literals

Template literals make working with strings so much easier than before. They're started with a back tick, and can have variables inserted using ${variable}. Compare these two lines of code:

```javascript
var fName = 'Peter', sName = 'Smith', age = 43, job = 'photographer';
var a = 'Hi, I\'m ' + fName + ' ' + sName + ', I\'m ' + age + ' and work as a ' + job + '.';
var b = `Hi, I'm ${ fName } ${ sName }, I'm ${ age } and work as a ${ job }.`;
```

This makes life far simpler and code easier to read. You can put anything inside of the curly braces: variables, equations, or function calls. I'll use these in examples throughout this article.

## Syntax Block scoping

JavaScript has always been scoped by functions, which is why it had become common to wrap the whole of a JavaScript file in an empty immediately invoked function expression (IIFE). This is done to isolate all of the variables in the file, so there are no variable conflicts.

Now, we have block scoping and two new variable declarations which are bound to a block.

## ‘Let’ Declaration

This is similar to var but has a few notable differences. Because it's block scoped, a new variable with the same name can be declared without affecting outer variables.

```javascript
var a = 'car' ;
{
    let a = 5;
    console.log(a) // 5
}
console.log(a) // car
```

Because its bound to a block scope, it solves this classic interview question:
"what is output, and how would you get it to work as you expect?"

```javascript
for (var i = 1; i < 5; i++){
    setTimeout(() => { console.log(i); }, 1000);
}
```

In this case it outputs "5 5 5 5 5" because the variable i changes on each iteration.

If you switch out the var for let then everything changes. Now, each loop creates a new block scope with the value for i bound to that loop. It is though you've written:

```javascript
{let i = 1; setTimeout(() => { console.log(i) }, 1000)}
{let i = 2; setTimeout(() => { console.log(i) }, 1000)}
{let i = 3; setTimeout(() => { console.log(i) }, 1000)}
{let i = 4; setTimeout(() => { console.log(i) }, 1000)}
{let i = 5; setTimeout(() => { console.log(i) }, 1000)}
```

Another difference between var and let is that let isn't hoisted as var is.

```javascript
{
    console.log(a); // undefined
    console.log(b); // ReferenceError
    var a = 'car';
    let b = 5;
}
```

Because of its tighter scoping and more predictable behaviour, some people have said that you should use let instead of var, except where you specifically need the hoisting or looser scoping of the var declaration.

## Const

If you wanted to declare a constant variable in JavaScript before, it was convention to name the variable in block caps. However, this wouldn’t secure the variable — it just let other developers know that it was a constant and shouldn't be changed.

Now we have the const declaration.

```javascript
{
    const c = "tree";
    console.log(c);  // tree
    c = 46;  // TypeError!
}
```

const doesn't make the variable immutable, just locks its assignment. If you have a complex assignment (object or array), then the value can still be modified.

```javascript
{
    const d = [1, 2, 3, 4];
    const dave = { name: 'David Jones', age: 32};
    d.push(5);
    dave.job = "salesman";
    console.log(d);  // [1, 2, 3, 4, 5]
    console.log(dave);  // { age: 32, job: "salesman", name: 'David Jones'}
}
```

## Problem with block scoping functions

Function declarations are now specified to be bound to block scoping.

```javascript
{
    bar(); // works
    function bar() { /* do something */ }
}
bar();  // doesn't work
```

The problem comes when you declare a function inside an if statement.

Consider this:

```javascript
if ( something) {
    function baz() { console.log('I passed') }
} else {
    function baz() { console.log('I didn\'t pass') }
}
baz();
```

Before ES6, both function declarations would have been hoisted and the result would have been 'I didn\'t pass' no matter what something was.
Now we get 'ReferenceError', as baz is always bound by the block scope.

## Spread

ES6 introduces the ... operator, which is referred to as the ‘spread operator’. It has two main uses: spreading an array or object into a new array or object, and joining multiple parameters into an array.

The first use case is the one you'll probably encounter most, so we’ll look at that first.

```javascript
let a = [3, 4, 5];
let b = [1, 2, ...a, 6];
console.log(b);  // [1, 2, 3, 4, 5, 6]
```

This can be very useful for passing in a set of variables to a function from an array.

```javascript
function foo(a, b, c) { console.log(`a=${a}, b=${b}, c=${c}`)}
let data = [5, 15, 2];
foo( ...data); // a=5, b=15, c=2
```

An object can also be spread, inputting each of the key value pairs into the new object. ( Object spread is actually in stage 4 of proposal and will be officially in ES2018. Its only supported by Chrome 60 or later, Firefox 55 or later, and Node 6.4.0 or later)

```javascript
let car = { type: 'vehicle ', wheels: 4};
let fordGt = { make: 'Ford', ...car, model: 'GT'};
console.log(fordGt); // {make: 'Ford', model: 'GT', type: 'vehicle', wheels: 4}
````

Another feature of the spread operator is that it creates a new array or object. The example below creates a new array for b, but c just refers to the same array.

```javascript
let a = [1, 2, 3];
let b = [ ...a ];
let c = a;
b.push(4);
console.log(a);  // [1, 2, 3]
console.log(b);  // [1, 2, 3, 4] referencing different arrays
c.push(5);
console.log(a);  // [1, 2, 3, 5]
console.log(c);  // [1, 2, 3, 5] referencing the same array
```

The second use case is gathering variables together into an array. This is very useful for when you don’t know how many variables are being passed to a function.

```javascript
function foo(...args) {
    console.log(args);
}
foo( 'car', 54, 'tree');  //  [ 'car', 54, 'tree' ]
```

## Default Parameters

Functions can now be defined with default parameters. Missing or undefined values are initialized with the default value. Just be careful — because null and false values are coerced to 0.

```javascript
function foo( a = 5, b = 10) {
    console.log( a + b);
}
foo();  // 15
foo( 7, 12 );  // 19
foo( undefined, 8 ); // 13
foo( 8 ); // 18
foo( null ); // 10 as null is coerced to 0
```

The default values can be more than just values — they can also be expressions or functions.

```javascript
function foo( a ) { return a * 4; }
function bar( x = 2, y = x + 4, z = foo(x)) {
    console.log([ x, y, z ]);
}
bar();  // [ 2, 6, 8 ]
bar( 1, 2, 3 ); //[ 1, 2, 3 ]
bar( 10, undefined, 3 );  // [ 10, 14, 3 ]
```

## Destructuring

Destructuring is the process of taking apart the array or object on the left hand side of the equal sign. The array or object can come from a variable, function, or equation.

```javascript
let [ a, b, c ] = [ 6, 2, 9];
console.log(`a=${a}, b=${b}, c=${c}`); //a=6, b=2, c=9

function foo() { return ['car', 'dog', 6 ]; }
let [ x, y, z ] = foo();
console.log(`x=${x}, y=${y}, z=${z}`);  // x=car, y=dog, z=6
```

With object destructuring, the keys of the object can be listed inside curly braces to extract that key-value pair.

```javascript
function bar() { return {a: 1, b: 2, c: 3}; }
let { a, c } = bar();
console.log(a); // 1
console.log(c); // 3
console.log(b); // undefined
```

Sometimes, you want to extract the values but assign them to a new variable. This is done using a 'key: variable' pairing on the left of the equals sign.

```javascript
function baz() {
    return {
        x: 'car',
        y: 'London',
        z: { name: 'John', age: 21}
    };
}
let { x: vehicle, y: city, z: { name: driver } } = baz();

console.log(
    `I'm going to ${city} with ${driver} in their ${vehicle}.`
); // I'm going to London with John in their car.
```

Another thing that object destructuring allows is assigning a value to multiple variables.

```javascript
let { x: first, x: second } = { x: 4 };
console.log( first, second ); // 4, 4
```

## Object Literals and Concise Parameters

When you are creating an object literal from variables, ES6 allows you to omit the key if it is the same as the variable name.

```javascript
let a = 4, b = 7;
let c = { a: a, b: b };
let concise = { a, b };
console.log(c, concise) // {a: 4, b: 7}, {a: 4, b: 7}
```

This can also be used in combination with destructuring to make your code much simpler and cleaner.

```javascript
function foo() {
    return {
        name: 'Anna',
        age: 56,
        job: { company: 'Tesco', title: 'Manager' }
    };
}

// pre ES6
let a = foo(), name = a.name, age = a.age, company = a.job.company;

// ES6 destructuring and concise parameters
let { name, age, job: {company}} = foo();
```

It can also be used to destructure objects passed into functions. Method 1 and 2 are how you would have done it before ES6, and method 3 uses destructuring and concise parameters.

```javascript
let person = {
    name: 'Anna',
    age: 56,
    job: { company: 'Tesco', title: 'Manager' }
};

// method 1
function old1( person) {
    var yearOfBirth = 2018 - person.age;
    console.log( `${ person.name } works at ${ person.job.company } and was born in ${ yearOfBirth }.`);
}

// method 2
function old1( person) {
    var age = person.age,
        yearOfBirth = 2018 - age,
        name = person.name,
        company = person.job.company;
    console.log( `${ name } works at ${ company } and was born in ${ yearOfBirth }.`);
}

// method 3
function es6({ age, name, job: {company}}) {
    var yearOfBirth = 2018 - age;
    console.log( `${ name } works at ${ company } and was born in ${ yearOfBirth }.`);
}
```

Using ES6, we can extract the age, name and company without extra variable declaration.

## Dynamic Property Names

ES6 adds the ability to create or add properties with dynamically assigned keys.

```javascript
let  city= 'sheffield_';
let a = {
    [ city + 'population' ]: 350000
};
a[ city + 'county' ] = 'South Yorkshire';
console.log(a); // {sheffield_population: 350000, sheffield_county: 'South Yorkshire' }
```

## Arrow Functions

Arrow functions have two main aspects: their structure and their this binding.

They can have a much simpler structure than traditional functions because they don't need the function key word, and they automatically return whatever is after the arrow.

```javascript
var foo = function( a, b ) {
    return a * b;
}

let bar = ( a, b ) => a * b;
```

If the function requires more than a simple calculation, curly braces can be used and the function returns whatever is returned from the block scope.

```javascript
let baz = ( c, d ) => {
    let length = c.length + d.toString().length;
    let e = c.join(', ');
    return `${e} and there is a total length of  ${length}`;
}
```

One of the most useful places for arrow functions is in array functions like .map, .forEach or .sort.

```javascript
let arr = [ 5, 6, 7, 8, 'a' ];
let b = arr.map( item => item + 3 );
console.log(b); // [ 8, 9, 10, 11, 'a3' ]
```

As well as having a shorter syntax, it also fixes the issues that often arose around the this binding behaviour. The fix with pre-ES6 functions was to store the this reference, often as a self variable.

```javascript
var clickController = {
    doSomething: function (..) {
        var self = this;
        btn.addEventListener(
            'click',
            function() { self.doSomething(..) },
            false
        );
    }
};
```

This had to be done because the this binding is dynamic. This means that the this inside the event listener and the this inside the doSomething do not refer to the same thing.

Inside arrow functions, the this binding is lexical, not dynamic. This was the main design feature of the arrow function.

Whilst lexical this binding can be great, sometimes that's not what is wanted.

```javascript
let a = {
    oneThing: ( a ) => {
            let b = a * 2;
            this.otherThing(b);
    },
    otherThing: ( b ) => {....}
};

a.oneThing(6);
```

When we use a.oneThing(6), the this.otherThing( b ) reference fails as this doesn't point to the a object, but to the surrounding scope. If you are rewriting legacy code using ES6 syntax, this is something to watch out for.

## for … of Loops

ES6 adds a way to iterate over each of the values in an array. This is different from the existing for ... in loop that loops over the key/index.

```javascript
let a = ['a', 'b', 'c', 'd' ];
// ES6
for ( var val of a ) {
    console.log( val );
} // "a" "b" "c" "d"
// pre-ES6
for ( var idx in a ) {
    console.log( idx );
}  // 0 1 2 3
```

Using the new for … of loop saves adding a let val = a[idx] inside each loop.

Arrays, strings, generators and collections are all iterable in standard JavaScript. Plain objects can't normally be iterated over, unless you have defined an iterator for it.

## Number Literals

ES5 code handled decimal and hexadecimal number formats well, but octal form wasn't specified. In fact, it was actively disallowed in strict mode.

ES6 has added a new format, adding an o after the initial 0 to declare the number an octal. They've also added a binary format.

```javascript
Number( 29 )  // 29
Number( 035 ) // 35 in old octal form.
Number( 0o35 ) // 29 in new octal form
Number( 0x1d ) // 29 in hexadecimal
Number( 0b11101 ) // 29 in binary form
```

## And Much More…

There is much, much more that ES6 offers us to make our code cleaner, shorter, easier to read and more robust.
Have a read of Kyle Simpson’s [You Don’t Know JS book on ES6](https://github.com/getify/You-Dont-Know-JS/blob/master/es6%20%26%20beyond/ch2.md), or check out this [brilliant little website](http://es6-features.org/#Constants)!

<br>

::: tip BASED ON
[`ES6 tips and tricks to make your code cleaner, shorter, and easier to read!`](https://medium.freecodecamp.org/make-your-code-cleaner-shorter-and-easier-to-read-es6-tips-and-tricks-afd4ce25977c) article from Sam Williams on freeCodeCamp
:::
