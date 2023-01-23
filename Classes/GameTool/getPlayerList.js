module.exports = function() {
    var prom = new Promise((resolve, reject) => {
        game.sendCommand('list', (response) => {
            var playerList = response.OutputMessages[1].Parameters[0].split(', ');
            Cache.GlobalInfo.PlayerList = playerList;
            Cache.GlobalInfo.NowPlayerCount = response.OutputMessages[0].Parameters[0];
            Cache.GlobalInfo.MaxPlayerCount = response.OutputMessages[0].Parameters[1];
            resolve(playerList);
        });
    });
    return prom;
};