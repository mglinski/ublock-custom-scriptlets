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
            console.log(`uBO-Scriptlet[callFunctionDelayed]: waiting ${waitTime} ms...`);
            if (waitTime > 0) await sleep(waitTime);
            console.log(`uBO-Scriptlet[callFunctionDelayed]: calling -> ${funcCall}`);
            self.requestAnimationFrame(funcCall);
            console.log(`uBO-Scriptlet[callFunctionDelayed]: called -> ${funcCall}`);
        } catch (e) {}
    };
    runAt(() => {
        funcInvoke();
    }, 'idle');
}
