/// call-function-delayed.js
/// alias cfd.js
/// dependency run-at.fn
// example.com##+js(cfd, funcName, waitTime)
function callFunctionDelayed(
    funcCall = '',
    waitTime = 0
) {
    // @link: https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number#answer-175787
    const isStrNumeric = (str) => {
        if (typeof str != "string") return false; // we only process strings!  
        // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this) and ensure strings of whitespace fail
        return !isNaN(str) && !isNaN(parseFloat(str));
    };
    if (funcCall === '') {
        console.log(`uBO-Scriptlet[callFunctionDelayed]: ERROR: funcCall is empty string`);    
        return;
    }
    if (typeof waitTime === string && !isStrNumeric(waitTime)) {
        console.log(`uBO-Scriptlet[callFunctionDelayed]: ERROR: waitTime is not a valid number`);
        return;
    }
    waitTime = parseInt(waitTime);
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
