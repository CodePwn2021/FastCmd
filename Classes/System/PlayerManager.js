module.exports = {
    addPlayer: function(name,xuid) {
        var path = 'FastCmd/Data/PlayerData/'+xuid+'.json';
        var defaultData = Utils.Template.PlayerDataExample;
        var nowTime = Utils.Tools.getTime();
        if(fs.exists(path)) {
            if(fs.isDir(path)) {
                fs.remove(path);
                if(Data.Script.Tool.debugLogger) Utils.Logger.script('DEBUG-WARN','PlayerManager','这™是个文件夹？？？你在干什么？');
            }
            if(Data.Script.Tool.debugLogger) Utils.Logger.script('DEBUG-WARN','PlayerManager','这个路径™之前就存在了，你在干什么？？？');
        }
        
        defaultData.latest_nickname = name;
        defaultData.modified_time = nowTime;
        defaultData.create_time = nowTime;
        let text = JSON.stringify(defaultData,null,2);
        fs.writeFile(path,text);
    },
    
    updatePlayer: function(xuid,target,value) {
        var path = 'FastCmd/Data/PlayerData/'+xuid+'.json';
        var obj = JSON.parse(fs.readFile(path));
        var nowTime = Utils.Tools.getTime();
        var defaultData = Utils.Template.PlayerDataExample;
        obj.modified_time = nowTime;
        obj[target] = value;
        
        var binded = Object.assign(defaultData,obj);
        let text = JSON.stringify(binded,null,2);
        fs.writeFile(path,text);
    },
    
    isExists: function(xuid) {
        var path = 'FastCmd/Data/PlayerData/'+xuid+'.json';
        return fs.exists(path);
    },
    
    read: function(xuid) {
        var obj = JSON.parse(fs.readFile('FastCmd/Data/PlayerData/'+xuid+'.json'));
        return obj;
    }
};