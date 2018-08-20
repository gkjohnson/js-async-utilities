(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Debouncer"] = factory();
	else
		root["Debouncer"] = factory();
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Debouncer", function() { return Debouncer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DebouncerMixin", function() { return DebouncerMixin; });
const DebouncerMixin =
baseClass => class extends baseClass {

    /* Life Cycle Functions */
    constructor() {

        super(...arguments);
        this.__debounces = {};

    }

    /* Public API */
    // Returns whether there are any debounces the be run
    hasDebounces() {

        return !!Object.keys(this.__debounces).length;

    }

    // Fires s debounce function after the given duration
    debounce(key, func, dur = 0) {

        if (key == null || !func || !(func instanceof Function)) return;

        if (key in this.__debounces) this.clearDebounce(key);

        this.__debounces[key] = {
            handle: setTimeout(() => {

                func();
                this.clearDebounce(key);

            }, dur),
            func,
        };

    }

    // Clears the given debounce key
    // Clears all debounces if no key is given
    clearDebounce(key = null) {

        if (key == null) {

            for (const k in this.__debounces) {

                this.clearDebounce(k);

            }

        } else if (key in this.__debounces) {

            clearTimeout(this.__debounces[key].handle);
            delete this.__debounces[key];

        }

    }

    // Fires the debounce now and clears the key
    // Flushes all debounces if no key is given
    flushDebounce(key = null) {

        if (key == null) {

            for (const k in this.__debounces) {

                this.flushDebounce(k);

            }

        } else if (key in this.__debounces) {

            this.__debounces[key].func();
            this.clearDebounce(key);

        }

    }

};

const Debouncer = DebouncerMixin(class {});




/***/ })
/******/ ]);
});