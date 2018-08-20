const { Coroutiner, Animator } = require('./umd/index.js');

const coroutiner = new Coroutiner();
const animator = new Animator();

const getMicroseconds = () => {

    const [sec, ns] = process.hrtime();
    return sec * 1e3 + ns * 1e-6;

};

// let tick = 0;
// coroutiner.startCoroutine('cr', (function * () {

//     while (true) {

//         console.log(tick, 1);

//         yield null;

//     }

// })(), true, 10);

// animator.animate('anim', () => tick++);

coroutiner.startCoroutine('cr', (function * () {

    let totalTicks = 0;
    let ticked = true;

    let start = 0;
    while (true) {

        if (ticked) {

            start = getMicroseconds();
            ticked = false;
            process.nextTick(() => {

                totalTicks++;
                ticked = true;

                console.log(getMicroseconds() - start);

            });

        }

        if (totalTicks === 10) break;

        yield null;

    }

})(), true, 100);
