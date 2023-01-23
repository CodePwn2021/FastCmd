module.exports = {
    chat: function (name,msg){
        var date = Utils.Tools.getDate();
        var time = (Utils.Tools.getTime()).split(' ')[1];
        var file_name = `FastCmd/Data/Log/Chat/Chat_${date}.log`;
        var new_line = `${time} <${name}> ${msg}\n`;
        if(!fs.exists(file_name)) {
            fs.writeFile(file_name,new_line);
        } else {
            var cache = fs.readFile(file_name)+new_line;
            fs.writeFile(file_name,cache);
        }
    },
    playerJoin: function (name,mode){
        var date = Utils.Tools.getDate();
        var time = (Utils.Tools.getTime()).split(' ')[1];
        var file_name = `FastCmd/Data/Log/PlayerJoin/PlayerJoin_${date}.log`;
        var new_line = `${time} <${name}> ${mode}游戏\n`;
        if(!fs.exists(file_name)) {
            fs.writeFile(file_name,new_line);
        } else {
            var cache = fs.readFile(file_name)+new_line;
            fs.writeFile(file_name,cache);
        }
    },
    script: function (type,name,content){
        var date = Utils.Tools.getDate();
        var time = (Utils.Tools.getTime()).split(' ')[1];
        var file_name = `FastCmd/Data/Log/Script/Script_${date}.log`;
        var new_line = `${time} [${type}] ${name}: ${content}\n`;
        if(!fs.exists(file_name)) {
            fs.writeFile(file_name,new_line);
        } else {
            var cache = fs.readFile(file_name)+new_line;
            fs.writeFile(file_name,cache);
        }
    }
};