(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./Animator.js"));
	else if(typeof define === 'function' && define.amd)
		define(["./Animator.js"], factory);
	else if(typeof exports === 'object')
		exports["Coroutiner"] = factory(require("./Animator.js"));
	else
		root["Coroutiner"] = factory(root["Animator"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Coroutiner", function() { return Coroutiner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoroutinerMixin", function() { return CoroutinerMixin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Animator_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Animator_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Animator_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getTime_js__ = __webpack_require__(2);



const CoroutinerMixin =
baseClass => class extends baseClass {

    /* Life Cycle Functions */
    constructor() {

        super(...arguments);
        this.__coroutines = {};
        this.__animator = new __WEBPACK_IMPORTED_MODULE_0__Animator_js__["Animator"]();

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

            const time = Object(__WEBPACK_IMPORTED_MODULE_1__getTime_js__["a" /* getTime */])();

            do {

                const res = gen.next();
                const done = res.done;
                if (done) {

                    this.__animator.clearAnimation(key);
                    return;

                }

            } while (Object(__WEBPACK_IMPORTED_MODULE_1__getTime_js__["a" /* getTime */])() - time < duration);

        }, callnow, duringIdle);

    }

    // Clears the given coroutine key
    // Clears all coroutines if no key is given
    clearCoroutine(key = null) {

        this.__animator.clearAnimation(key);

    }

};

const Coroutiner = CoroutinerMixin(class {});




/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

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

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 3 */
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


/***/ })
/******/ ]);
});