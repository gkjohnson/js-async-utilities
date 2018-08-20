/* global
    describe it beforeEach afterEach expect
*/
const { Animator, Debouncer, Coroutiner } = require('../umd/index.js');

// TODO: Test this in the browser context, as well

const getMicroseconds = () => {

    const [sec, ns] = process.hrtime();
    return sec * 1e3 + ns * 1e-6;

};

describe('Animator', () => {

    let animator;
    beforeEach(() => animator = new Animator());

    it('should animate until stopped', done => {

        let num = 0;
        animator.animate('anim', () => {

            num++;
            if (num === 100) {

                animator.clearAnimation('anim');
                setTimeout(() => {

                    expect(num).toEqual(100);
                    done();

                }, 500);

            }

        });

    });

    it('should animate multiple functions at once', done => {

        let num1 = 0;
        let num2 = 0;

        animator.animate('anim1', () => {

            num1++;
            if (num1 === 100) animator.clearAnimation('anim1');

        });

        animator.animate('anim2', () => {

            num2++;
            if (num2 === 200) {

                animator.clearAnimation('anim2');
                setTimeout(() => {

                    expect(num1).toEqual(100);
                    expect(num2).toEqual(200);
                    done();

                }, 100);

            }

        });

    });

    it('should clear all animations at once', (done) => {

        let num = 0;
        const func = () => {

            num++;
            if (num === 100) {

                animator.clearAnimation();
                setTimeout(() => {

                    expect(num).toEqual(100);
                    done();

                }, 100);

            }

        };

        animator.animate('anim1', func);
        animator.animate('anim2', func);
        animator.animate('anim3', func);

    });

    it('should replace animations', done => {

        let num1 = 0;
        let num2 = 0;

        animator.animate('anim', () => {

            num1++;
            if (num1 === 100) {

                animator.animate('anim', () => {

                    num2++;

                    if (num2 === 100) {

                        expect(num1).toEqual(100);
                        expect(num2).toEqual(100);
                        animator.clearAnimation();
                        done();

                    }

                });

            }

        });

    });

    describe('callNow', () => {

        it('should call function immediately when true', () => {

            let called = false;
            animator.animate('anim', () => called = true, true);
            expect(called).toEqual(true);

        });

        it('should not call function immediately when false', () => {

            let called = false;
            animator.animate('anim', () => called = true, false);
            expect(called).toEqual(false);

        });

    });

    afterEach(() => {

        animator.clearAnimation();
        animator = null;

    });

});

describe('Debouncer', () => {

    let debouncer;
    beforeEach(() => debouncer = new Debouncer());

    it('should debounce properly', done => {

        let called = false;
        debouncer.debounce('db', () => called = true, 100);

        setTimeout(() => {

            expect(called).toEqual(true);
            done();

        }, 200);

    });

    it('should replace debounce functions', done => {

        let called1 = false;
        let called2 = false;
        debouncer.debounce('db', () => called1 = true, 100);
        debouncer.debounce('db', () => called2 = true, 100);

        setTimeout(() => {

            expect(called1).toEqual(false);
            expect(called2).toEqual(true);
            done();

        }, 200);

    });

    it('should clear debounces', done => {

        let called = false;
        debouncer.debounce('db', () => called = true, 100);
        debouncer.clearDebounce('db');

        setTimeout(() => {

            expect(called).toEqual(false);
            done();

        }, 200);

    });

    it('should clear all debounces', done => {

        let called = false;
        debouncer.debounce('db1', () => called = true, 100);
        debouncer.debounce('db2', () => called = true, 100);
        debouncer.debounce('db3', () => called = true, 100);
        debouncer.clearDebounce();

        setTimeout(() => {

            expect(called).toEqual(false);
            done();

        }, 200);

    });

    it('should run the function after the specified duration', done => {

        const start = getMicroseconds();
        debouncer.debounce('db', () => {

            const delta = getMicroseconds() - start;
            const margin = Math.abs(1 - (delta / 100));

            expect(margin).toBeLessThan(0.025);
            done();

        }, 100);

    });

    afterEach(() => debouncer = null);

});

describe('Coroutiner', () => {

    let coroutiner;
    beforeEach(() => coroutiner = new Coroutiner());

    it('should run a coroutine to completion', done => {

        coroutiner.startCoroutine('cr', (function * () {

            for (let i = 0; i < 100; i++) yield null;
            done();

        })());

    });

    it('should cancel the coroutine', done => {

        let called = 0;
        coroutiner.startCoroutine('cr', (function * () {

            for (let i = 0; i < 100; i++) {

                called++;

                if (called === 20) {

                    coroutiner.clearCoroutine('cr');
                    setTimeout(() => {

                        expect(called).toEqual(20);
                        done();

                    }, 100);

                }
                yield null;

            }

        })());

    });

    it('should replace coroutines', done => {

        let called1 = 0;
        let called2 = 0;
        coroutiner.startCoroutine('cr', (function * () {

            for (let i = 0; i < 100; i++) {

                called1++;
                yield null;

            }

        })());

        coroutiner.startCoroutine('cr', (function * () {

            for (let i = 0; i < 100; i++) {

                called2++;
                yield null;

            }

            expect(called1).toEqual(1);
            expect(called2).toEqual(100);
            done();

        })());

    });

    it('should clear all coroutines', done => {

        let called = 0;
        function * genFunc() {

            for (let i = 0; i < 100; i++) {

                called++;
                yield null;

            }

        }

        coroutiner.startCoroutine('cr1', genFunc());
        coroutiner.startCoroutine('cr2', genFunc());
        coroutiner.startCoroutine('cr3', genFunc());

        coroutiner.clearCoroutine();
        setTimeout(() => {

            expect(called).toEqual(3);
            done();

        }, 100);

    });

    it('should run a coroutine for the specified duration', done => {

        coroutiner.startCoroutine('cr', (function * () {

            let totalTicks = 0;
            let ticked = true;

            let start = 0;
            while (true) {

                if (ticked) {

                    if (totalTicks === 10) break;

                    start = getMicroseconds();
                    ticked = false;
                    process.nextTick(() => {

                        totalTicks++;
                        ticked = true;

                        const delta = getMicroseconds() - start;
                        const margin = Math.abs(1 - delta / 100);
                        expect(margin).toBeLessThan(0.025);

                    });

                }

                yield null;

            }

            done();

        })(), true, 100);

    });

    describe('callNow', () => {

        it('should call function immediately when true', () => {

            let called = false;
            coroutiner.startCoroutine('cr', (function * () { called = true; })(), true);
            expect(called).toEqual(true);

        });

        it('should not call function immediately when false', () => {

            let called = false;
            coroutiner.startCoroutine('cr', (function * () { called = true; })(), false);
            expect(called).toEqual(false);

        });

    });

    afterEach(() => coroutiner = null);

});
