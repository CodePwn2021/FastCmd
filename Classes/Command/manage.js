module.exports = {
    config: {
        isSimpleCommand: false,
        version: '1.0.0',
        description: '管理命令'
    },
    
    request: {
        description: '请求传送到指定玩家的位置',
        help: '<targetName:string>',
        param: 1,
        cmd: function(name,targetName) {}
    },
    
    accept: {
        description: '同意传送请求',
        help: '',
        param: 0,
        cmd: function(name) {}
    },
    
    deny: {
        description: '拒绝传送请求',
        help: '',
        param: 0,
        cmd: function(name) {}
    }
};