((globalThis) => {
    const core = Deno.core;
    function argsToMessage(...args) {
        return args.map((arg) => JSON.stringify(arg)).join(" ");
    }
    const sarcasticPhrases = [
        "Oh, brilliant idea!", "Wow, never heard that one before....", "Oh, how original...",
        "Congratulations, you broke the code!", "Great job, you found a bug!", "Keep up thr good work, genius!",
        "Oh, the brilliance is blinding...", "Such a groundbreaking contribution...",
        "You should be a comedian...", "Sarcasm level: expert...",
    ];

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    }

    globalThis.console = {
        log: (... args) => {
            core.print(`[out]: ${argsToMessage(...args)}\n`, false);
        },
        sarcasm: (...args) => {
            const time = getCurrentTime();
            const sarcasticMessage = sarcasticPhrases[Math.floor(Math.random() * sarcasticPhrases.length)]
            const message = argsToMessage(...args) + `\n\x1b[1m${sarcasticMessage}\x1b[0m`;
            const logMessage = `\x1b[1;35m[${time}] [message]:\x1b[om ${message}`;
            core.print(`${logMessage}\n`, true);
        },
        warn:(...args)=>{
            try{
                throw new Error(argsToMessage(...args))
            }
            catch(err){
                core.print(`[warn]: Your program has a error ${err.message}`)
            }
        }
    };
})(globalThis);