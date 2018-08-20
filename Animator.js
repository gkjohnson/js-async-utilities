import { getTime } from './getTime.js';

// platform agnostic next frame functions
const _requestAnimationFrame = (function() {

    if (typeof global !== 'undefined' && global.process && global.process.nextTick) return f => global.process.nextTick(f);
    if (typeof window !== 'undefined' && window.requestAnimationFrame) return f => window.requestAnimationFrame(f);
    return f => setTimeout(f, 0);

})();

const _cancelAnimationFrame = (function() {

    if (typeof global !== 'undefined' && global.process && global.process.nextTick) return () => {};
    if (typeof window !== 'undefined' && window.cancelAnimationFrame) return id => window.cancelAnimationFrame(id);
    return id => clearTimeout(id);

})();

const _requestIdleCallback = (function() {

    if (typeof requestIdleCallback !== 'undefined') return f => requestIdleCallback(f);
    else return f => setTimeout(f, 0);

})();

const _cancelIdleCallback = (function() {

    if (typeof cancelIdleCallback !== 'undefined') return id => cancelIdleCallback(id);
    else return id => clearTimeout(id);

})();

const AnimatorMixin =
baseClass => class extends baseClass {

    /* Life Cycle Functions */
    constructor() {

        super(...arguments);
        this.__animations = {};

    }

    /* Public API */
    // Returns whether or not there are any animations
    hasAnimations() {

        return !!Object.keys(this.__animations).length;

    }

    animate(key, func, callNow = true, duringIdle = false) {

        if (key == null || !func || !(func instanceof Function)) return;

        this.clearAnimation(key);
        this.__animations[key] = { func, handle: -1, duringIdle };

        let frame = 0;
        let lastFrameTime = -1;

        // Returns whether or not the current animation is cancelled
        // Needed because node does not have a cancel function for NextTick
        const _cancelled = () => !(key in this.__animations) || this.__animations[key].func !== func;

        // Fires the next animation frame request
        const _request = () => {

            this.__animations[key].handle = duringIdle ? _requestIdleCallback(_do) : _requestAnimationFrame(_do);

        };

        // Calls the function and fires the next
        // animation frame
        const _do = () => {

            if (_cancelled()) return;

            const newTime = getTime();
            const deltaTime = lastFrameTime === -1 ? 0 : newTime - lastFrameTime;

            func(frame, deltaTime);
            frame++;

            lastFrameTime = newTime;

            if (!_cancelled()) _request();

        };

        if (callNow) _do();
        else _request();

    }

    // Clears the given animation key
    // Clears all animations if no key is given
    clearAnimation(key = null) {

        if (key == null) {

            for (const k in this.__animations) this.clearAnimation(k);

        } else if (key in this.__animations) {

            if (this.__animations[key].duringIdle) _cancelIdleCallback(this.__animations[key].handle);
            else _cancelAnimationFrame(this.__animations[key].handle);

            delete this.__animations[key];

        }

    }

};

const Animator = AnimatorMixin(class {});

export { Animator, AnimatorMixin };
