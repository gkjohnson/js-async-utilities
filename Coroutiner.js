import { Animator } from './Animator.js';
import { getTime } from './getTime.js';

const CoroutinerMixin =
baseClass => class extends baseClass {

    /* Life Cycle Functions */
    constructor() {

        super(...arguments);
        this.__coroutines = {};
        this.__animator = new Animator();

    }

    /* Public API */
    // Returns whether there are any coroutines running
    hasCoroutines() {

        return this.__animator.hasAnimations();

    }

    // Starts a coroutine that for "duration" of a
    // frame until finished
    startCoroutine(key, gen, callnow = true, duration = 0, duringIdle = false) {

        this.__animator.animate(key, () => {

            const time = getTime();

            do {

                const res = gen.next();
                const done = res.done;
                if (done) {

                    this.__animator.clearAnimation(key);
                    return;

                }

            } while (getTime() - time < duration);

        }, callnow, duringIdle);

    }

    // Clears the given coroutine key
    // Clears all coroutines if no key is given
    clearCoroutine(key = null) {

        this.__animator.clearAnimation(key);

    }

};

const Coroutiner = CoroutinerMixin(class {});

export { Coroutiner, CoroutinerMixin };
