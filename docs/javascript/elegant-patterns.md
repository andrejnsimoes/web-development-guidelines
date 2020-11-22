

## Receive an object, return an object

Most of my functions now accept a single parameter of type object and many of them return or resolve to a value of type object as well.

Thanks in part to the *destructuring* feature introduced in ES2015, I’ve found this to be a powerful pattern. I’ve even given it the silly name, “RORO” because… branding? ¯\_(ツ)_/¯

Here are some reasons why you’ll love this pattern:

* Named parameters

* Cleaner default parameters

* Richer return values

* Easy function composition

Let’s look at each one.

## Named Parameters

Suppose we have a function that returns a list of Users in a given Role and suppose we need to provide an option for including each User’s Contact Info and another option for including Inactive Users, traditionally we might write:

```javascript
function findUsersByRole (
  role,
  withContactInfo,
  includeInactive
) {...}
```

A call to this function might then look like:

```javascript
findUsersByRole(
  'admin',
  true,
  true
)
```

Notice how ambiguous those last two parameters are. What does “true, true” refer to?

What happens if our app almost never needs Contact Info but almost always needs Inactive Users? We have to contend with that middle parameter all the time, even though it’s not really relevant (more on that later).

In short, this traditional approach leaves us with potentially ambiguous, noisy code that’s harder to understand and trickier to write.

Let’s see what happens when we receive a single object instead:

```javascript
function findUsersByRole ({
  role,
  withContactInfo,
  includeInactive
}) {...}
```

Notice our function looks almost identical except that **we’ve put braces around our parameters**. This indicates that instead of receiving three distinct parameters, our function now expects a single object with properties named role, withContactInfo, and includeInactive.

This works because of a JavaScript feature introduced in ES2015 called *Destructuring*.

Now we can call our function like this:

```javascript
findUsersByRole({
  role: 'admin',
  withContactInfo: true,
  includeInactive: true
})
```

This is far less ambiguous and a lot easier to read and understand. Plus, omitting or re-ordering our parameters is no longer an issue since they are now the named properties of an object.

For example, this works:

```javascript
findUsersByRole({
  withContactInfo: true,
  role: 'admin',
  includeInactive: true
})
```

And so does this:

```javascript
findUsersByRole({
  role: 'admin',
  includeInactive: true
})
```

This also makes it possible to add new parameters without breaking old code.

One important note here is that if we want all the parameters to be optional, in other words, if the following is a valid call…

```javascript
findUsersByRole()
```

… we need to set a default value for our parameter object, like so:

```javascript
function findUsersByRole ({
  role,
  withContactInfo,
  includeInactive
} = {}) {...}
```

An added benefit of using destructuring for our parameter object is that it promotes immutability. When we destructure the object on its way into our function we assign the object’s properties to new variables. Changing the value of those variables will not alter the original object.

Consider the following:

```javascript
const options = {
  role: 'Admin',
  includeInactive: true
}

findUsersByRole(options)

function findUsersByRole ({
  role,
  withContactInfo,
  includeInactive
} = {}) {
  role = role.toLowerCase()
  console.log(role) // 'admin'
  ...
}

console.log(options.role) // 'Admin'
```

Even though we change the value of role the value of options.role remains unchanged.
> **It’s worth noting that destructuring makes a **shallow **copy so if any of the properties of our parameter object are of a complex type (e.g. array or object) changing them would indeed affect the original.*

So far, so good, yeah?

## Cleaner Default Parameters

With ES2015 JavaScript functions gained the ability to define default parameters. In fact, we recently used a default parameter when we added ={} to the parameter object on our findUsersByRole function above.

With traditional default parameters, our findUsersByRole function might look like this.

```javascript
function findUsersByRole (
  role,
  withContactInfo = true,
  includeInactive
) {...}
```

If we want to set includeInactive to true we have to explicitly pass undefined as the value for withContactInfo to preserve the default, like this:

```javascript
findUsersByRole(
  'Admin',
  undefined,
  true
)
```

How hideous is that?

Compare it to using a parameter object like so:

```javascript
function findUsersByRole ({
  role,
  withContactInfo = true,
  includeInactive
} = {}) {...}
```

Now we can write…

```javascript
findUsersByRole({
  role: ‘Admin’,
  includeInactive: true
})
```

… and our default value for withContactInfo is preserved.

## BONUS: Required Parameters

How often have you written something like this?

```javascript
function findUsersByRole ({
  role,
  withContactInfo,
  includeInactive
} = {}) {
  if (role == null) {
    throw Error(...)
  }
  ...
}
```
>  ***Note: **We use == (double equals) above to test for both null and undefined with a single statement.*

What if I told you that you could use default parameters to validate required parameters instead?

First, we need to define a requiredParam() function that throws an Error.

Like this:

```javascript
function requiredParam (param) {
  const requiredParamError = new Error(
    `Required parameter, "${param}" is missing.`
  )

  // preserve original stack trace
  if (typeof Error.captureStackTrace === ‘function’) {
    Error.captureStackTrace(
      requiredParamError,
      requiredParam
    )
  }

  throw requiredParamError
}
```
>  *I know, I know. requiredParam doesn’t RORO. That’s why I said **many **of my functions — not **all**.*

Now, we can set an invocation of requiredParam as the default value for role, like so:

```javascript
function findUsersByRole ({
  role = requiredParam('role'),
  withContactInfo,
  includeInactive
} = {}) {...}
```

With the above code, if anyone calls findUsersByRole without supplying a role they will get an Error that says Required parameter, “role” is missing.

Technically, we can use this technique with regular default parameters as well; we don’t necessarily need an object. But this trick was too useful not to mention.

## Richer Return Values

JavaScript functions can only return a single value. If that value is an object it can contain a lot more information.

Consider a function that saves a User to a database. When that function returns an object it can provide a lot of information to the caller.

For example, a common pattern is to “upsert” or “merge” data in a save function. Which means, we insert rows into a database table (if they do not already exist) or update them (if they do exist).

In such cases, it would be handy to know wether the operation performed by our Save function was an INSERT or an UPDATE. It would also be good to get an accurate representation of exactly what was stored in the database, and it would be good to know the status of the operation; did it succeed, is it pending as part of a larger transaction, did it timeout?

When returning an object, it’s easy to communicate all of this info at once.

Something like:

```javascript
async saveUser({
  upsert = true,
  transaction,
  ...userInfo
}) {
  // save to the DB
  return {
    operation, // e.g 'INSERT'
    status, // e.g. 'Success'
    saved: userInfo
  }
}
```

Technically, the above returns a Promise that resolves to an object but you get the idea.

## Easy Function Composition
> # “Function composition is the process of combining two or more functions to produce a new function. Composing functions together is like snapping together a series of pipes for our data to flow through.” — [Eric Elliott](undefined)

We can compose functions together using a pipe function that looks something like this:

```javascript
function pipe(...fns) {
  return param => fns.reduce(
    (result, fn) => fn(result),
    param
  )
}
```

The above function takes a list of functions and returns a function that can apply the list from left to right, starting with a given parameter and then passing the result of each function in the list to the next function in the list.

Don’t worry if you’re confused, there’s an example below that should clear things up.

One limitation of this approach is that each function in the list must only receive a single parameter. Luckily, when we RORO that’s not a problem!

Here’s an example where we have a saveUser function that pipes a userInfo object through 3 separate functions that validate, normalize, and persist the user information in sequence.

```javascript
function saveUser(userInfo) {
  return pipe(
    validate,
    normalize,
    persist
  )(userInfo)
}
```

We can use a [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) in our validate, normalize, and persist functions to destructure only the values that each function needs and still pass everything back to the caller.

Here’s a bit of code to give you the gist of it:

```javascript
function validate({
  id,
  firstName,
  lastName,
  email = requiredParam(),
  username = requiredParam(),
  pass = requiredParam(),
  address,
  ...rest
}) {
  // do some validation
  return {
    id,
    firstName,
    lastName,
    email,
    username,
    pass,
    address,
    ...rest
  }
}

function normalize({
  email,
  username,
  ...rest
}) {
  // do some normalizing
  return {
    email,
    username,
    ...rest
  }
}

async function persist({
  upsert = true,
  ...info
}) {
  // save userInfo to the DB
  return {
    operation,
    status,
    saved: info
  }
}
```

## To RO or not to RO, that is the question

I said at the outset, **most** of my functions receive an object and **many** of them return an object too.

Like any pattern, RORO should be seen as just another tool in our tool box. We use it in places where it adds value by making a list of parameters more clear and flexible and by making a return value more expressive.

If you’re writing a function that will only ever need to receive a single parameter, then receiving an object is overkill. Likewise, if you’re writing a function that can communicate a clear and intuitive response to the caller by returning a simple value, there is no need to return an object.

An example where I almost never RORO is assertion functions. Suppose we have a function isPositiveInteger that checks wether or not a given parameter is a positive integer, such a function likely wouldn’t benefit from RORO at all.

<br>

::: tip BASED ON
[`Elegant patterns in modern JavaScript: RORO`](https://medium.freecodecamp.org/elegant-patterns-in-modern-javascript-roro-be01e7669cbd) article from Bill Sourour on freeCodeCamp
:::