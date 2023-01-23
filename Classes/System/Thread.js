module.exports = {
    start: function(startKey) {
        // Thread Start Check
        if (startKey != 'FastCmdKeyDownDrop') {
            Utils.Tools.crashScriptPro('非法启动监听线程');
        } else {
            // JoinGame (IDPlayerList)
            game.subscribePacket('IDPlayerList', function(callback) {
                let playerName = callback.Entries[0].Username;
                if (callback.ActionType != 0) {
                    var beforePlayerList = Cache.GlobalInfo.PlayerList;
                    GameTool.getPlayerList().then((res) => {
                        for(let value of beforePlayerList) {
                            if (!res.includes(value)) {
                                delete Cache.XuidList[value];
                                if(Data.Script.Main.recordPlayerJoin) {
                                    Utils.Logger.playerJoin(value, '退出了');
                                }
                                break;
                            }
                        }
                    });
                return;
            }

                var playerXuid = callback.Entries[0].XUID;
                Cache.XuidList[playerName] = playerXuid;
                
                if (Data.Script.Main.recordPlayerJoin) {
                    Utils.Logger.playerJoin(playerName, '尝试加入');
                }
                
                if(!System.PlayerManager.isExists(playerXuid)) {
                    System.PlayerManager.addPlayer(playerName,playerXuid);
                } else {
                    System.PlayerManager.updatePlayer(playerXuid,'latest_nickname',playerName);
                }
            });
            // ListenChat
            game.listenChat(function(name, msg) {
                // 系统信息
                if (name == '') {
                    // 加入信息
                    if (msg.indexOf('multiplayer.player.joined') != -1) {
                        var oldListz = Cache.GlobalInfo.PlayerList;
                        GameTool.getPlayerList().then((res) => {
                            var cache_name;
                            for(let value of res) {
                                if (!oldListz.includes(value)) {
                                    cache_name = value;
                                    break;
                                }
                            }
                            return res = cache_name;
                        }).then((res) => {
                            if (Data.Script.Main.recordPlayerJoin) {
                                Utils.Logger.playerJoin(res, '加入了');
                            }

                            // 敏感词玩家检查-发送特定文本
                            game.oneShotCommand(`execute @a ~~~ tell ${Cache.GlobalInfo.botName} §o§kFastCmd_CheckName§e§r`);
                            
                            // 云端黑名单检查
                            if (Data.Script.Main.kickCloudBanned) {
                                GameTool.checkCloudBan(res);
                            }

                            if (Data.RentalServer.Main.enableJoinMsg) {
                                var randText = Utils.Tools.randomArray(Data.RentalServer.Main.joinMsg);
                                if (randText == 'NULL_ARRAY') {
                                    Utils.Tools.sendLogMessageInConsole('err', 'joinText', 'joinMsg内容不允许全部禁用！！！要全部禁用请直接将isEnableJoinMsg设置为false，谢谢！');
                                    return;
                                }
                                randText = Utils.Tools.magicText(randText, res);
                                setTimeout(function(){Utils.Tools.sendHelperMessageInGame(res, randText);},3000);
                            }
                            
                            return;
                        });
                        return;
                    }
                    
                    // 死亡信息
                    if(msg.startsWith('death.fell') || msg.startsWith('death.attack')) {
                        if(Data.RentalServer.Main.allowBackDeathPoint) {
                            var allPlayers = Cache.GlobalInfo.PlayerList;
                            game.sendCommand('tell @s @e[type=player]',(response) => {
                                var alivePlayers = response.OutputMessages[0].Parameters[1].split(', ');
                                var deadPlayer;
                                for(let value of allPlayers) {
                                    if(!alivePlayers.includes(value)) {
                                        deadPlayer = value;
                                        break;
                                    }
                                }
                                // xuid
                                if(GameTool.xuidChecker(deadPlayer)) {
                                    var deadPlayerXuid = Cache.XuidList[deadPlayer];
                                    // 提取死亡点
                                    game.sendCommand(`execute @a[name="${deadPlayer}"] ~~~ tp ~~~`, (response) => {
                                        var param = response.OutputMessages[0].Parameters;
                                        Cache.DeathPoint[deadPlayerXuid] = `${param[1]} ${param[2]} ${param[3]}`;
                                        Utils.Tools.sendHelperMessageInGame(name, '嘿，输入#back就能回到原来的地方！');
                                    });
                                }
                                return;
                            });
                        }
                        return;
                    }
                    return;
                }
                
                // 检查特殊名字
                var name_cache = name;
                if (name_cache.startsWith('<')) name_cache = name_cache.replace(/<.*><|>$/g, '');

                if(name_cache == Cache.GlobalInfo.botName) {
                    return;
                }

                // 敏感词玩家检查-真正的检查阶段
                if(msg == '§o§kFastCmd_CheckName§e§r') {
                    var pListCheck = Cache.GlobalInfo.PlayerList;
                    if(!pListCheck.includes(name_cache)) {
                        setTimeout(function(){GameTool.fuckSensitivePlayer(name_cache);},3000);
                    }
                    return;
                }
                
                if (Data.Script.Main.recordChat) {
                    Utils.Logger.chat(name_cache, msg);
                }
                //console.log(`${name_cache} => ${msg}`);
                if (msg.startsWith("#")) {
                    // console.log('cmd_mgr!');
                    // cmd_mgr
                    if(GameTool.xuidChecker(name_cache)) {
                        System.CommandParser(name_cache, msg);
                    }
                    return;
                }
                // messageEvent
                for (let key in messageEvent) {
                    // function (name,msg) {}
                    messageEvent[key](name_cache, msg);
                }
            });
            Utils.Tools.sendLogMessageInConsole("info", "thread_init", "线程启动完毕");
            if(Data.Script.Main.master == '#NOT_SET#') {
                System.MessageEventManager.add('fc_set_master',function(name,msg){
                    if(msg === 'FC租赁服绑定') {
                        try {
                            if(GameTool.xuidChecker(name)) {
                                Data.Script.Main.master = Cache.XuidList[name];
                                (Data.RentalServer.Main.admin).push(Cache.XuidList[name]);
                                System.DataManager.reload();
                                System.MessageEventManager.remove('fc_set_master');
                                Utils.Tools.sendHelperMessageInGame(name, '§a绑定完成！你就是我的主人～');
                                Utils.Tools.sendLogMessageInConsole("info", "master", "绑定完成！");
                            }
                        } catch(e) {
                            Utils.Tools.sendLogMessageInConsole("err", "master", e);
                        }
                    }
                });
                Utils.Tools.sendLogMessageInConsole("info", "master", "貌似你是初次使用？请在游戏内发送“FC租赁服绑定”，完成绑定后即可正常使用！");
            }
        }
    }
};
