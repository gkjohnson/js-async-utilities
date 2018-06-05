class Debouncer {

    /* Life Cycle Functions */
    constructor () {

        this.__debounces = {};

    }

    /* Public API */
    // Returns whether there are any debounces the be run
    hasDebounces () {

        return !!Object.keys(this.__debounces).length;

    }

    // Fires s debounce function after the given duration
    debounce (key, func, dur = 0) {

        if (key == null || !func || !(func instanceof Function)) return;

        if (key in this.__debounces) this.clearDebounce(key);

        this.__debounces[key] = {
            handle: setTimeout(() => {

                func();
                this.clearDebounce(key);

            }, dur),
            func
        };

    }

    // Clears the given debounce key
    // Clears all debounces if no key is given
    clearDebounce (key = null) {

        if (key == null) {

            for (let k in this.__debounces) {

                this.clearDebounce(k);

            }

        } else if (key in this.__debounces) {

            clearTimeout(this.__debounces[key].handle);
            delete this.__debounces[key];

        }

    }

    // Fires the debounce now and clears the key
    // Flushes all debounces if no key is given
    flushDebounce (key = null) {

        if (key == null) {

            for (let k in this.__debounces) {

                this.flushDebounce(k);

            }

        } else if (key in this.__debounces) {

            this.__debounces[key].func();
            this.clearDebounce(key);

        }

    }

}

export default Debouncer;
