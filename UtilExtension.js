(function(module) {
    const Mixin = typeof require !== 'undefined' ? require('./Mixin').Mixin : window.Mixin
    const Animator = typeof require !== 'undefined' ? require('./Animator').Animator : window.Animator
    const Debouncer = typeof require !== 'undefined' ? require('./Debouncer').Debouncer : window.Debouncer
    const Coroutiner = typeof require !== 'undefined' ? require('./Coroutiner').Coroutiner : window.Coroutiner
    
    module.UtilExtension = class extends Mixin(Animator, Debouncer, Coroutiner) {}
})(typeof window !== 'undefined' && window || module)