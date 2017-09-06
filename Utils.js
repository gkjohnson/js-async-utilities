(function(module) {
    module.Mixin = typeof require !== 'undefined' ? require('./Mixin').Mixin : window.Mixin
    module.Animator = typeof require !== 'undefined' ? require('./Animator').Animator : window.Animator
    module.Debouncer = typeof require !== 'undefined' ? require('./Debouncer').Debouncer : window.Debouncer
    module.Coroutiner = typeof require !== 'undefined' ? require('./Coroutiner').Coroutiner : window.Coroutiner
    
    module.Utils = class extends module.Mixin(module.Animator, module.Debouncer, module.Coroutiner) {}
})(typeof window !== 'undefined' && window || module && (module.exports = {}))