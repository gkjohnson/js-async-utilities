function Mixin(superClass, ...args) {
    const __mixinargs__ = args

    class Mixed extends superClass{
        constructor() {
            super(...arguments)

            for (let arg of __mixinargs__) {
                Object.assign(this, new arg())

                for (let key of Object.getOwnPropertyNames(arg.prototype)) {
                    if (key === 'constructor') continue

                    this[key] = function() {
                        return arg.prototype[key].call(this, ...arguments)
                    }
                }
            }
        }
    }

    return Mixed
}

export default Mixin