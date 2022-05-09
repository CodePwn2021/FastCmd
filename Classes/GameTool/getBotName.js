module.exports = function() {
    return new Promise((resolve,reject) => {
        game.sendCommand('tell @s 233', (response) => {
            var bot_name = response.OutputMessages[0].Parameters[0];
            Cache.GlobalInfo.botName = bot_name;
            resolve(bot_name);
        });
    });
};