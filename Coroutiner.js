(function(module) {
    const Animator = (typeof require !== 'undefined') ? require('./Animator').Animator : window.Animator;
    const _time = (function() { return window.performance && window.performance.now() || new Date() })()

    module.Coroutiner = class {

        constructor() {
            this.__coroutines = {}
            this.__animator = new Animator()
        }

        // Returns whether there are any coroutines running
        hasCoroutines() {
            return !!Object.keys(this.__coroutines).length
        }

        // Starts a coroutine that for "duration" of a
        // frame until finished
        startCoroutine(key, gen, callnow, duration = 0) {
            this.__animator.animate(key, () => {
                const time = _time

                do {
                    const res = gen.next()
                    const done = res.done
                    if (done) {
                        this.__animator.clearAnimation(key)
                        return
                    }
                } while (_time - time < duration)
            })
        }

        // Clears the given coroutine key
        // Clears all coroutines if no key is given
        clearCoroutine(key) {
            if (key in this.__coroutines) delete this.__coroutines[key]
        }
    }
})(typeof window !== 'undefined' && window || module && (module.exports = {}))