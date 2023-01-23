module.exports = {
    config: {
        isSimpleCommand: false,
        version: '1.0.0',
        description: '玩家传送点设置'
    },
    
    list: {
        description: '展示传送点列表',
        help: '',
        param: 0,
        cmd: function(name) {}
    },
    
    go: {
        description: '传送到指定传送点',
        help: '<pointName:string>',
        param: 1,
        cmd: function(name,pointName) {}
    },
    
    add: {
        description: '添加传送点',
        help: '<pointName:string>',
        param: 1,
        cmd: function(name,pointName) {}
    },
    
    remove: {
        description: '移除传送点',
        help: '<pointName:string>',
        param: 1,
        cmd: function(name,pointName) {}
    }
};