export function getTime() {

    if (typeof window !== 'undefined' && window.performance) {

        return window.performance.now();

    } else if (typeof global !== 'undefined' && global.process && global.process.hrtime) {

        const [sec, ns] = global.process.hrtime();
        return sec * 1e3 + ns * 1e-6;

    } else {
        return Date.now();

    }

};
