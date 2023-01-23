module.exports = async function() {
    var is_op = false;
    await game.sendCommand('gamemode 1 @s', (response) =>{
        is_op = response.OutputMessages[0].Success;
        return;
    });
    await setTimeout(function() {
        if (!is_op) {
            Utils.Tools.crashScriptPro('经检测，辅助用户没有OP权限。\n这也可能是因为你的网络延迟非常高而导致误判，请检查网络');
        }
    },
    500);
}