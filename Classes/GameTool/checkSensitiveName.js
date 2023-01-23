module.exports = async function() {
    var isSensitive = true;
    await game.sendCommand(`tell @s ${Cache.GlobalInfo.botName}`, (response) =>{
        isSensitive = false;
        return;
    });
    await setTimeout(function() {
        if (isSensitive) {
            Utils.Tools.crashScriptPro('经检测，辅助用户的呢称是敏感词，这将会导致FastCmd的工作行为产生异常。\n这也可能是因为你的网络延迟非常高而导致误判，请检查网络');
        }
    },
    500);
}