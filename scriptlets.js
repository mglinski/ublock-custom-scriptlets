/// call-function-delayed.js
/// alias cfd.js
/// dependency run-at.fn
/// dependency safe-self.fn
// example.com##+js(cfd, funcName, waitTime)
function callFunctionDelayed(
    funcCall = '',
    waitTime = 0
) {
    const safe = safeSelf();
    const logPrefix = safe.makeLogPrefix('call-function-delayed', funcCall, waitTime);
    
    // @link: https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number#answer-175787
    const isStrNumeric = (str) => {
        if (typeof str !== "string") return false; // we only process strings!  
        // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this) and ensure strings of whitespace fail
        return !isNaN(str) && !isNaN(parseFloat(str));
    };
    if (funcCall === '') {
        safe.uboErr(logPrefix, `Error: funcCall is empty string`);
        return;
    }
    if (typeof waitTime === "string" && !isStrNumeric(waitTime)) {
        safe.uboErr(logPrefix, `Error: waitTime is not a valid number`);
        return;
    }
    waitTime = parseInt(waitTime);
    const funcInvoke = async () => {
        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        try {
            if (waitTime > 0) {
                if ( safe.logLevel > 1) safe.uboLog(logPrefix, `waiting ${waitTime} ms...`);
                await sleep(waitTime);
            }
            const fn = window[funcCall];
            if ( safe.logLevel > 1) safe.uboLog(logPrefix, `started calling window.${funcCall}()`);
            self.requestAnimationFrame(fn);
            if ( safe.logLevel > 1) safe.uboLog(logPrefix, `finished calling window.${funcCall}()`);
        } catch (e) {
            safe.uboErr(logPrefix, `Error: ${e}`);
        }
    };
    runAt(() => {
        funcInvoke();
    }, 'idle');
}
