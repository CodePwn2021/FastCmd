module.exports = {
    config: {
        isSimpleCommand: true,
        version: '1.0.0',
        description: '返回失败点'
    },
    default: {
        description: '',
        help: '',
        param: 0,
        cmd: function(name) {
            if(Data.RentalServer.Main.allowBackDeathPoint) {
                var targetXuid = Cache.XuidList[name];
                var deathPoint = Cache.DeathPoint[targetXuid];
                if(deathPoint === undefined) {
                    Utils.Tools.sendHelperMessageInGame(name, '貌似并没有失败点记录哦');
                    return;
                }
                game.sendCommand(`tp "${name}" ${deathPoint}`,(callback) => {
                    Utils.Tools.sendHelperMessageInGame(name, '已将您传送到失败点');
                    delete Cache.DeathPoint[targetXuid];
                });
            } else {
                Utils.Tools.sendTellraw(name,'§e此世界已禁用返回失败点。');
            }
        }
    }
};