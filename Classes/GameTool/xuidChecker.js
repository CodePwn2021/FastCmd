module.exports = function(name) {
    if(!Cache.XuidList.hasOwnProperty(name)) {
        Utils.Tools.sendHelperMessageInGame(name, '§e[提示]§r出现了一些小问题，请重进游戏再试～');
        return false;
    } else {
        return true;
    }
}