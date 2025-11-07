/// call-function-delayed.js
/// alias cfd.js
/// dependency run-at.fn
// example.com##+js(cfd, funcName, waitTime)
function callFunctionDelayed(
    funcCall = '',
    waitTime = 0
) {
    if (funcCall === '') return;
    if (!Number.isInteger(waitTime)) return;

    const funcInvoke = async () => {
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        try {
            if (waitTime > 0) await sleep(waitTime);
            self.requestAnimationFrame(funcCall);
        } catch (e) {}
    };
    runAt(() => {
        funcInvoke();
    }, 'idle');
}
