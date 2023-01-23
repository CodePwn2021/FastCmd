module.exports = async function() {
    var is_feed = false;
    await game.sendCommand('gamerule sendcommandfeedback', (response) =>{
        is_feed = response.OutputMessages[0].Success;
        return;
    });
    await setTimeout(function() {
        if (!is_feed) {
            game.oneShotCommand('gamerule sendcommandfeedback true');
            Utils.Tools.sendLogMessageInConsole('info','feedbackChecker','本脚本需要开启sendcommadfeedback才可正常监听命令执行结果，已为你自动打开该选项。');
        }
        GameTool.isOperator();
        GameTool.checkSensitiveName();
    },
    500);
}