function Mixin(superClass, ...args) {

    const __mixinargs__ = args;

    class Mixed extends superClass {

        constructor() {

            super(...arguments);

            for (const Cons of __mixinargs__) {

                Object.assign(this, new Cons());

                for (const key of Object.getOwnPropertyNames(Cons.prototype)) {

                    if (key === 'constructor') continue;

                    this[key] = function() {

                        return Cons.prototype[key].call(this, ...arguments);

                    };

                }

            }

        }

    }

    return Mixed;

}

export default Mixin;
