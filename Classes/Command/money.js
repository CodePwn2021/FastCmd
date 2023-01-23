module.exports = {
    config: {
        isSimpleCommand: false,
        version: '1.0.0',
        description: '金钱管理'
    },
    
    balance: {
        description: '查询余额',
        help: '',
        param: 0,
        cmd: function(name) {
            var pd = System.PlayerManager.read(Cache.XuidList[name]);
            var balance_count = pd.money_balance;
            Utils.Tools.sendTellraw(name,`你的余额： §e${balance_count}`);
        }
    },
    
    transfer: {
        description: '向对方转账',
        help: '<target:string> <count:int>',
        param: 2,
        cmd: function(name,target,count) {
            if(target === Cache.GlobalInfo.botName) {
                Utils.Tools.sendHelperMessageInGame(name, '我表示我不愿意参与！');
                return;
            }
            
            var playerList = Cache.GlobalInfo.PlayerList;
            if(!playerList.includes(target)) {
                Utils.Tools.sendHelperMessageInGame(name, '好像对方并没有在线。。。难不成你打错字了？');
                return;
            }
            
            var numRegExp = /^[0-9]*$/g;
            if(numRegExp.test(count)===false || count.startsWith('0')) {
                Utils.Tools.sendHelperMessageInGame(name, '转账金额必须是非0的正整数哦');
                return;
            }
            
            var count_int = parseInt(count);
            
            var myxuid = Cache.XuidList[name];
            var mypd = System.PlayerManager.read(myxuid);
            var my_balance = mypd.money_balance;
            
            var targetxuid = Cache.XuidList[target];
            var targetpd = System.PlayerManager.read(targetxuid);
            var target_balance = targetpd.money_balance;
            
            var my_new_balance = my_balance - count_int;
            var target_new_balance = target_balance + count_int;
            
            if(my_new_balance < 0) {
                Utils.Tools.sendHelperMessageInGame(name, '啊哦！好像你的余额不够呢。。。');
                return;
            }
            
            System.PlayerManager.updatePlayer(myxuid,'money_balance',my_new_balance);
            System.PlayerManager.updatePlayer(targetxuid,'money_balance',target_new_balance);
            Utils.Tools.sendHelperMessageInGame(name, `成功向§a${target}§r转账§e${count_int}§r！`);
        }
    },
    
    plus: {
        description: '给玩家加钱',
        help: '<targetName:string> <count:int>',
        param: 2,
        cmd: function(name,target,count) {
            var myxuid = Cache.XuidList[name];
            var masterXuid = Data.Script.Main.master;
            var adminList = Data.RentalServer.Main.admin;
            if(myxuid != masterXuid || !adminList.includes(myxuid)) {
                Utils.Tools.sendHelperMessageInGame(name, '啊哦，好像你并不是管理员呢。。。');
                return;
            }
            
            if(target === Cache.GlobalInfo.botName) {
                Utils.Tools.sendHelperMessageInGame(name, '我表示我不愿意参与！');
                return;
            }
            
            var playerList = Cache.GlobalInfo.PlayerList;
            if(!playerList.includes(target)) {
                Utils.Tools.sendHelperMessageInGame(name, '好像对方并没有在线。。。难不成你打错字了？');
                return;
            }
            
            var numRegExp = /^[0-9]*$/g;
            if(numRegExp.test(count)===false || count.startsWith('0')) {
                Utils.Tools.sendHelperMessageInGame(name, '添加的金钱必须是非0的正整数哦');
                return;
            }
            
            var count_int = parseInt(count);
            
            var targetxuid = Cache.XuidList[target];
            var targetpd = System.PlayerManager.read(targetxuid);
            var target_balance = targetpd.money_balance;
            
            var target_new_balance = target_balance + count_int;
            
            System.PlayerManager.updatePlayer(targetxuid,'money_balance',target_new_balance);
            Utils.Tools.sendHelperMessageInGame(name, `成功向§a${target}§r添加金钱§e${count_int}§r！`);
        }
    },
    
    reduce: {
        description: '给玩家扣钱',
        help: '<targetName:string> <count:int>',
        param: 2,
        cmd: function(name,target,count) {
            var myxuid = Cache.XuidList[name];
            var masterXuid = Data.Script.Main.master;
            var adminList = Data.RentalServer.Main.admin;
            if(myxuid != masterXuid || !adminList.includes(myxuid)) {
                Utils.Tools.sendHelperMessageInGame(name, '啊哦，好像你并不是管理员呢。。。');
                return;
            }
            
            if(target === Cache.GlobalInfo.botName) {
                Utils.Tools.sendHelperMessageInGame(name, '我表示我不愿意参与！');
                return;
            }
            
            var playerList = Cache.GlobalInfo.PlayerList;
            if(!playerList.includes(target)) {
                Utils.Tools.sendHelperMessageInGame(name, '好像对方并没有在线。。。难不成你打错字了？');
                return;
            }
            
            var numRegExp = /^[0-9]*$/g;
            if(numRegExp.test(count)===false || count.startsWith('0')) {
                Utils.Tools.sendHelperMessageInGame(name, '扣除的金钱必须是非0的正整数哦');
                return;
            }
            
            var count_int = parseInt(count);
            
            var targetxuid = Cache.XuidList[target];
            var targetpd = System.PlayerManager.read(targetxuid);
            var target_balance = targetpd.money_balance;
            
            var target_new_balance = target_balance - count_int;
            
            if(target_new_balance < 0) {
                Utils.Tools.sendHelperMessageInGame(name, '由于余额不支持使用负数，默认扣到零。');
                System.PlayerManager.updatePlayer(targetxuid,'money_balance',0);
                return;
            }
            System.PlayerManager.updatePlayer(targetxuid,'money_balance',target_new_balance);
            Utils.Tools.sendHelperMessageInGame(name, `成功将§a${target}§r扣除金钱§e${count_int}§r！`);
        }
    }
};