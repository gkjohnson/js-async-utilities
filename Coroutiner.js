(function(module) {
    const Animator = (typeof require !== 'undefined') ? require('./Animator').Animator : window.Animator;
    const getTime = () => window.performance && window.performance.now() || Date.now()

    module.Coroutiner = class {

        constructor() {
            this.__coroutines = {}
            this.__animator = new Animator()
        }

        // Returns whether there are any coroutines running
        hasCoroutines() {
            return this.__animator.hasAnimations()
        }

        // Starts a coroutine that for "duration" of a
        // frame until finished
        startCoroutine(key, gen, callnow = true, duration = 0) {
            this.__animator.animate(key, () => {
                const time = getTime()

                do {
                    const res = gen.next()
                    const done = res.done
                    if (done) {
                        this.__animator.clearAnimation(key)
                        return
                    }
                } while (getTime() - time < duration)
            })
        }

        // Clears the given coroutine key
        // Clears all coroutines if no key is given
        clearCoroutine(key = null) {
            this.__animator.clearAnimation(key)
        }
    }
})(typeof window !== 'undefined' && window || module && (module.exports = {}))