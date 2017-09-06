(function(module) {

    // platform agnostic next frame functions
    const _requestAnimationFrame = (function() {
        if (typeof process !== 'undefined' && process.nextTick) return f => process.nextTick(f)
        if (typeof requestAnimationFrame !== 'undefined') return f => requestAnimationFrame(f)
        return f => setTimeout(f, 0)
    })()

    const _cancelAnimationFrame = (function() {
        if (typeof process !== 'undefined' && process.nextTick) return null
        if (typeof requestAnimationFrame !== 'undefined') return f => cancelAnimationFrame(f)
        return id => clearTimeout() 
    })()

    module.Animator = class {
        constructor() {
            super.constructor(...arguments)
            this.__animations = {}
        }

        // Returns whether or not there are any animations
        hasAnimations() {
            return !!Object.keys(this.__animations).length
        }

        animate(key, func, callNow = true) {
            if (key == null || !func) return

            this.clearAnimation(key)
            this.__animations[key] = { func, handle: -1 }

            let frame = 0

            // Returns whether or not the current
            // animation is cancelled
            // Needed because node does not have
            // a cancel function for NextTick 
            const _cancelled = () => !(key in this.__animations) || this.__animations[key].func !== func

            // Fires the next animation frame request
            const _request = () => {
                this.__animations[key].handle = _requestAnimationFrame(_do)
            }

            // Calls the function and fires the next
            // animation frame
            const _do = () => {
                if (_cancelled()) return

                func(frame)
                frame++

                if (!_cancelled()) _request()
            }

            if (callNow) _do()
            else _request()
        }

        // Clears the given animation key
        // Clears all animations if no key is given
        clearAnimation(key) {
            if (key == null) {
                for (let k in this.__animations) this.clearAnimation(k)
            } else if (key in this.__animations) {
                _cancelAnimationFrame && _cancelAnimationFrame(this.__animations[key].handle)
                delete this.__animations[key]
            }
        }
    }
})(typeof window !== 'undefined' && window || module && (module.exports = {}))