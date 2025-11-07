/// callfunction-delayed.js
/// alias cf-d.js
/// dependency run-at.fn
// example.com##+js(cf-d, funcName, waitTime)
function callFunctionDelayed(
    funcCall = '',
    waitTime = 0
) {
    if (funcCall === '') return;
    if (!Number.isInteger(waitTime)) return;

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const funcInvoke = async () => {
        try {
            if (waitTime > 0) await sleep(waitTime);
            self.requestAnimationFrame(funcCall);
        } catch {}
    };
    runAt(() => {
        funcInvoke();
    }, 'idle');
}
