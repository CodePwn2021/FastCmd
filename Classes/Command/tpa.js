module.exports = {
    config: {
        isSimpleCommand: false,
        version: '1.0.0',
        description: '传送到另一个玩家的位置'
    },
    
    request: {
        description: '请求传送到指定玩家的位置',
        help: '<targetName:string>',
        param: 1,
        cmd: function(name,targetName) {
            if(!Data.RentalServer.Main.tpaFunction) {
                Utils.Tools.sendTellraw(name,'§e此世界已禁用tpa功能。');
                return;
            }
            
            if(targetName === Cache.GlobalInfo.botName) {
                Utils.Tools.sendHelperMessageInGame(name, '我表示我不愿意参与！');
                return;
            }
            
            var playerList = Cache.GlobalInfo.PlayerList;
            if(!playerList.includes(targetName)) {
                Utils.Tools.sendHelperMessageInGame(name, '好像对方并没有在线。。。难不成你打错字了？');
                return;
            }
            
            if((Cache.TpaList).includes(targetName)) {
                Utils.Tools.sendHelperMessageInGame(name, '你已经发送过一个请求了，请等待对方处理或自动拒绝！');
                return;
            }
            
            Cache.TpaList[targetName] = name;
            Utils.Tools.sendHelperMessageInGame(targetName, `§a${name}§r想要到你这里看看！`);
            Utils.Tools.sendHelperMessageInGame(targetName, '如果要同意，请使用#tpa accept同意请求！');
            setTimeout(function(){
                if((Cache.TpaList).includes(targetName)) {
                    delete Cache.TpaList[targetName];
                    Utils.Tools.sendHelperMessageInGame(name, '对方好像没理你呢。。。请求被自动拒绝了。。。');
                    Utils.Tools.sendHelperMessageInGame(targetName, '请求超过15秒，已自动拒绝传送请求！');
                }
            },150000);
        }
    },
    
    accept: {
        description: '同意传送请求',
        help: '',
        param: 0,
        cmd: function(name) {
            if(!Data.RentalServer.Main.tpaFunction) {
                Utils.Tools.sendTellraw(name,'§e此世界已禁用tpa功能。');
                return;
            }
            
            if(!(Cache.TpaList).includes(name)) {
                Utils.Tools.sendHelperMessageInGame(name, '请求不存在或已过期！');
                return;
            }
            
            game.oneShotCommand(`tp ${Cache.TpaList[name]} ${name}`);
            Utils.Tools.sendHelperMessageInGame(name, '已同意请求！');
            Utils.Tools.sendHelperMessageInGame(Cache.TpaList[name], '对方已同意你的请求！');
            delete Cache.TpaList[name];
        }
    },
    
    deny: {
        description: '拒绝传送请求',
        help: '',
        param: 0,
        cmd: function(name) {
            if(!Data.RentalServer.Main.tpaFunction) {
                Utils.Tools.sendTellraw(name,'§e此世界已禁用tpa功能。');
                return;
            }
            
            if(!(Cache.TpaList).includes(name)) {
                Utils.Tools.sendHelperMessageInGame(name, '请求不存在或已过期！');
                return;
            }
            
            Utils.Tools.sendHelperMessageInGame(name, '已拒绝传送请求！');
            Utils.Tools.sendHelperMessageInGame(Cache.TpaList[name], '对方拒绝了你的传送请求！');
            delete Cache.TpaList[name];
        }
    }
};