module.exports = {
    config: {
        isSimpleCommand: false,
        version: '1.0.0',
        description: '传送点菜单'
    },
    
    list: {
        description: '展示传送点列表，以及对应坐标',
        help: '',
        param: 0,
        cmd: function(name) {
            var tplist = Data.RentalServer.Tplist;
            var allStr = '';
            Utils.Tools.sendTellraw(name,'所有传送点以及对应坐标如下：');
            Object.keys(tplist).forEach((value,index) => {
                if(value.startsWith('禁用')) return;
                Utils.Tools.sendTellraw(name,`${value}: ${tplist[value]}`);
            });
        }
    },
    
    go: {
        description: '传送到指定传送点',
        help: '<keyword:string>',
        param: 1,
        cmd: function(name,keyword) {
            var tplist = Data.RentalServer.Tplist;
            if(!tplist.hasOwnProperty(keyword) || keyword.startsWith('禁用')) {
                Utils.Tools.sendHelperMessageInGame(name, `传送点${keyword}不存在哦`);
                return;
            }
            game.oneShotCommand(`tp "${name}" ${tplist[keyword]}`);
            Utils.Tools.sendTellraw(name,`成功传送至 ${keyword}`);
        }
    }
};