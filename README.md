# async-utilities

[![npm version](https://badge.fury.io/js/async-utilities.svg)](https://www.npmjs.com/package/async-utilities)

Basic Javsacript utility functions and classes to provide class mixin creation and key-addressed debounce, animation, and coroutine functions.

# Classes
Classes to extend or instantiate to enable easy access and use of simple utility functions

## Debouncer.js
```javascript
import Debouncer from '.../Debouncer.js'
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
import Animator from '.../Animator.js'
const an = new Animator()
an.animate('key', (frameNum, deltaTime) => console(frameNum))

// 1000 frames later
// prints 0..999

an.clearAnimation('key')

// no more logs
```

### animate(key, func, callNow = true, duringIdle = false)
Calls the provided function _func_ every frame until cleared. The function is passed both the current frame and time since last frame.

If _callNow_ is `true`, then the function will be called for the first time immediately.

If _duringIdle_ is `true`, then the animation function is called during the `requestIdleCallback` function instead of `requestAnimationFrame`

### clearAnimation(key)
Behaves like `ClearDebounce(key)` for animations.

## Coroutiner.js
```javascript
import Coroutiner from '.../Coroutiner.js'

function* increment() {
  for(let i = 0; i < 1000; i ++) {
    console.log(i)
    yield null
  }
}

const cr = new Coroutiner()
cr.startCoroutine('key', increment())

// prints 0..999
```

### startCoroutine(key, func, duration, callNow = true, duringIdle = false)
Starts a coroutine that runs for the given duration every frame.

See _Animator_ for _callNow_ and _duringIdle_ descriptions.

### clearCoroutine(key)
Behaves like `ClearDebounce(key)` for coroutines.

## Mixin.js
```javascript
import Mixin from '.../Mixin.js'

class UtilExtension extends Mixin(Animator, Debouncer, Coroutiner) {}
```

Helper function for creating a mixin class. Does not work with static functions or getters and setters.
