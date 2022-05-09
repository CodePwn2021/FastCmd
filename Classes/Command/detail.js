module.exports = {
    config: {
        isSimpleCommand: true,
        version: '1.0.0',
        description: '查看关键词信息'
    },
    
    default: {
        description: '',
        help: '<keyword:string>',
        param: 1,
        cmd: function(name,keyword) {
            var details = Data.RentalServer.Detail;
            if(!details.hasOwnProperty(keyword.toString()) || keyword.startsWith('禁用')) {
                Utils.Tools.sendLogMessageInGame(name, 'warn', `关键词${keyword}不存在`);
                return;
            }
            Utils.Tools.sendTellraw(name,details[keyword]);
            return;
        }
    }
};