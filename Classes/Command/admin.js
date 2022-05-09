module.exports = {
    config: {
        isSimpleCommand: false,
        version: '1.0.0',
        description: '管理员添加/删除，仅主人可用'
    },
    
    add: {
        description: '添加一个管理员',
        help: '<targetName:string>',
        param: 1,
        cmd: function(name,targetName) {
            var myxuid = Cache.XuidList[name];
            var masterXuid = Data.Script.Main.master;
            var adminList = Data.RentalServer.Main.admin;
            if(myxuid != masterXuid) {
                Utils.Tools.sendHelperMessageInGame(name, '啊哦，好像你并不是我的主人呢。。。');
                return;
            }
            
            if(targetName === Cache.GlobalInfo.botName) {
                Utils.Tools.sendHelperMessageInGame(name, '我表示我不愿意参与！');
                return;
            }
            
            if(!(Cache.XuidList).hasOwnProperty(targetName)) {
                Utils.Tools.sendHelperMessageInGame(name, '好像对方并没有在线。。。难不成你打错字了？');
                return;
            }
            var targetXuid = Cache.XuidList[targetName];
            (Data.RentalServer.Main.admin).push(targetXuid);
            System.DataManager.reload();
            Utils.Tools.sendHelperMessageInGame(name, '添加管理员成功！');
        }
    },
    
    remove: {
        description: '移除一个管理员',
        help: '<targetName:string>',
        param: 1,
        cmd: function(name,targetName) {
            var myxuid = Cache.XuidList[name];
            var masterXuid = Data.Script.Main.master;
            var adminList = Data.RentalServer.Main.admin;
            if(myxuid != masterXuid) {
                Utils.Tools.sendHelperMessageInGame(name, '啊哦，好像你并不是我的主人呢。。。');
                return;
            }
            
            if(targetName === Cache.GlobalInfo.botName) {
                Utils.Tools.sendHelperMessageInGame(name, '我表示我不愿意参与！');
                return;
            }
            
            if(!(Cache.XuidList).hasOwnProperty(targetName)) {
                Utils.Tools.sendHelperMessageInGame(name, '好像对方并没有在线。。。难不成你打错字了？');
                return;
            }
            var targetXuid = Cache.XuidList[targetName];
            var targetIndex = (Data.RentalServer.Main.admin).indexOf(targetXuid);
            (Data.RentalServer.Main.admin).splice(targetIndex,1);
            System.DataManager.reload();
            Utils.Tools.sendHelperMessageInGame(name, '移除管理员成功！');
        }
    },
    
    clear: {
        description: '移除全部的管理员',
        help: '',
        param: 0,
        cmd: function(name) {
            var myxuid = Cache.XuidList[name];
            var masterXuid = Data.Script.Main.master;
            var adminList = Data.RentalServer.Main.admin;
            if(myxuid != masterXuid) {
                Utils.Tools.sendHelperMessageInGame(name, '啊哦，好像你并不是我的主人呢。。。');
                return;
            }
            
            Data.RentalServer.Main.admin = [];
            System.DataManager.reload();
            Utils.Tools.sendHelperMessageInGame(name, '移除全部管理员成功！');
        }
    }
};