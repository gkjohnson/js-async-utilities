# javascript-utils

Basic Javsacript utility functions and classes to provide class mixin creation and key-addressed debounce, animation, and coroutine functions.

# Classes
Classes to extend or instantiate to enable easy access and use of simple utility functions

## Debouncer.js
##### debounce(key, func, duration)
Calls the provided function _func_ once after the provided duration.

_key_ uniquely identifies the debounce function. If another debounce is requested with the same _key_, the previous one is cancelled.

##### clearDebounce(key)
Cancels the debounce request with the given _key_.

If _key_ is `null`, then all debounces are cancelled.

##### flushDebounce(key)
Calls the debounce request with the provided key **now**.

If _key_ is `null`, then all debounces are cancelled.

## Animator.js
##### animate(key, func)
Calls the provided function _func_ every frame until cleared.

##### clearAnimation(key)
Behaves like `ClearDebounce(key)` for animations.

## Coroutiner.js
##### startCoroutine(key, func, duration)
Starts a coroutine that runs for the given duration every frame.

##### clearCoroutine(key)
Behaves like `ClearDebounce(key)` for coroutines.

## Mixin.js
Helper function for creating a mixin class. Does not work with static functions or getters and setters.

## UtilExention.js
Extension class that includes all functionality from `Animator.js`, `Debouncer.js`, and `Coroutiner.js`
