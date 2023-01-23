module.exports = function(name){
    var originalName = name;
    var parsedName = encodeURIComponent(name);
    fetch('https://black.fastcmd.xyz/status?name='+parsedName,{
        method: 'GET',
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    }).then((res) => {
        res.text().then((text) => {
            var obj;
            try {
                obj = JSON.parse(text);
            } catch(e) {
                Utils.Tools.sendLogMessageInConsole('warn','CloudBan','JSON解析异常');
                return;
            }
            if(obj.code != 0) {
                if(Data.Script.Main.recordScriptLog && Data.Script.Tool.debugLogger) {
                    Utils.Logger.script('DEBUG-INFO','CloudBan',`出现错误。以下是返回信息：\n${text}`);
                }
                return;
            };
            if(obj.blacklisted) {
                var datetime = Utils.Tools.getTimeChinese();
                var reason = Data.RentalServer.Main.cloudBanKickTips;
                var parsedReason = reason.replace('#@PLAYERNAME@#',obj.name).replace('#@REASON@#',obj.reason).replace('#@DATETIME@#',datetime);
                game.oneShotCommand(`kick ${originalName} ${parsedReason}`);
                game.oneShotCommand(`kick ${originalName} 你在云端黑名单`);
                if(Data.Script.Main.recordScriptLog) {
                    Utils.Logger.script('INFO','CloudBan',`玩家 ${originalName} 在云端黑名单，已被踢出。原因：${obj.reason}`);
                }
            } else if(Data.Script.Main.recordScriptLog && Data.Script.Tool.debugLogger) {
                Utils.Logger.script('DEBUG-INFO','CloudBan',`玩家 ${originalName} 不在云端黑名单`);
            }
        });
    });
};