# javascript-utils

[![npm version](https://badge.fury.io/js/%40gkjohnson%2Fjavascript-utils.svg)](https://www.npmjs.com/package/@gkjohnson/javascript-utils)

Basic Javsacript utility functions and classes to provide class mixin creation and key-addressed debounce, animation, and coroutine functions.

# Classes
Classes to extend or instantiate to enable easy access and use of simple utility functions

## Debouncer.js
```javascript
const Debouncer = require('.../Debouncer.js').Debouncer
const db = new Debouncer()
db.debounce('key', () => console.log('Hello!'), 1000)

// 1 second later
// Hello!
```

### debounce(key, func, duration)
Calls the provided function _func_ once after the provided duration.

_key_ uniquely identifies the debounce function. If another debounce is requested with the same _key_, the previous one is cancelled.

### clearDebounce(key)
Cancels the debounce request with the given _key_.

If _key_ is `null`, then all debounces are cancelled.

### flushDebounce(key)
Calls the debounce request with the provided key **now**.

If _key_ is `null`, then all debounces are cancelled.

## Animator.js
```javascript
const Animator = require('.../Animator.js').Animator
const an = new Animator()
an.animate('key', frameNum => console(frameNum))

// 1000 frames later
// prints 0..1000

an.clearAnimation('key')

// no more logs
```

### animate(key, func, callNow = true)
Calls the provided function _func_ every frame until cleared.

If _callNow_ is `true`, then the function will be called for the first time immediately.

### clearAnimation(key)
Behaves like `ClearDebounce(key)` for animations.

## Coroutiner.js
```javascript
const Coroutiner = require('.../Coroutiner.js').Coroutiner

function* increment() {
  let i = 0
  while(true) {
    i++
    console.log(i)
    yield null
  }
}

const cr = new Coroutiner()
cr.startCoroutine('key', increment())

// 1000 frames later
// prints 0..1000

cr.clearCoroutine('key')

// no more logs

```

### startCoroutine(key, func, duration, callNow = true)
Starts a coroutine that runs for the given duration every frame.

If _callNow_ is `true`, then the function will be called for the first time immediately.

### clearCoroutine(key)
Behaves like `ClearDebounce(key)` for coroutines.

## Mixin.js
```javascript
const Mixin = require('.../Mixin.js').Mixin

class UtilExtension extends Mixin(Animator, Debouncer, Coroutiner) {}
```

Helper function for creating a mixin class. Does not work with static functions or getters and setters.
