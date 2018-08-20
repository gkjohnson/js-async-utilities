(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Animator"] = factory();
	else
		root["Animator"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Animator", function() { return Animator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AnimatorMixin", function() { return AnimatorMixin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__getTime_js__ = __webpack_require__(2);


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

            const newTime = Object(__WEBPACK_IMPORTED_MODULE_0__getTime_js__["a" /* getTime */])();
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



/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (immutable) */ __webpack_exports__["a"] = getTime;
function getTime() {

    if (typeof window !== 'undefined' && window.performance) {

        return window.performance.now();

    } else if (typeof global !== 'undefined' && global.process && global.process.hrtime) {

        const [sec, ns] = global.process.hrtime();
        return sec * 1e3 + ns * 1e-6;

    } else {
        return Date.now();

    }

};

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ })
/******/ ]);
});