(function(module) {
    module.Debouncer = class {
        constructor() {
            super.constructor(...arguments)
            this.__debounces = {}
        }

        // Returns whether there are any debounces the be run
        hasDebounces() {
            return !!Object.keys(this.__debounces).length
        }

        // Fires s debounce function after the given duration
        debounce(key, func, dur) {
            if (key == null || !func) return

            if (key in this.__debounces) this.clearDebounce(key)

            this.__debounces[key] = {
                handle: setTimeout(() => {
                    func()
                    this.clearDebounce(key)
                }, dur || 0),
                func
            }
        }

        // Clears the given debounce key
        // Clears all debounces if no key is given
        clearDebounce(key) {
            if (key == null) {
                for (let k in this.__debounces) {
                    this.clearDebounce(k)
                }
            } else if (key in this.__debounces) {
                clearTimeout(this.__debounces[key].handle)
                delete this.__debounces[key]
            }
        }

        // Fires the debounce now and clears the key
        // Flushes all debounces if no key is given
        flushDebounce(key) {
            if (key == null) {
                for (let k in this.__debounces) {
                    this.flushDebounce(k)
                }
            } else if (key in this.__debounces) {
                this.__debounces[key].func()
                this.clearDebounce(key)
            }
        }
    }
})(typeof window !== 'undefined' && window || module && (module.exports = {}))