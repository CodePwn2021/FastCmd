module.exports = {
    config: {
        isSimpleCommand: false,
        version: '1.0.0',
        description: '商店菜单'
    },
    
    list: {
        description: '展示全部分类',
        help: '',
        param: 0,
        cmd: function(name) {
            var shopList = Data.RentalServer.Shop;
            var keys = Object.keys(shopList);
            var count = 0;
            var listText = '';
            Utils.Tools.sendTellraw(name,'商品分类列表如下：');
            keys.forEach((value,index) => {
                if(value.startsWith('禁用')) return;
                if(count <= 3) {
                    listText = `${listText}${value} `;
                    count++;
                } else {
                    Utils.Tools.sendTellraw(name,listText);
                    listText = '';
                    count = 0;
                }
            });
            if(count != 0) {
                Utils.Tools.sendTellraw(name,listText);
            }
        }
    },
    
    sort: {
        description: '展示指定商品分类的详细列表',
        help: '<sortName:string> <page:int>',
        param: 2,
        cmd: function(name,sortName,page) {
            var shopList = Data.RentalServer.Shop;
            if(!shopList.hasOwnProperty(sortName) || sortName.startsWith('禁用')) {
                Utils.Tools.sendHelperMessageInGame(name, '你要找的这个分类不存在！');
                return;
            }
            var numRegExp = /^[0-9]*$/g;
            if(numRegExp.test(page)===false || page.startsWith('0')) {
                Utils.Tools.sendHelperMessageInGame(name, '页数必须是非0开头的正整数哦');
                return;
            }
            var page_int = parseInt(page);
            var keys = Object.keys(shopList[sortName]);
            var keys_filted = [];
            keys.forEach((value,index) => {
                if(value.startsWith('禁用')) return;
                keys_filted.push(value);
            });
            var minCount,maxCount;
            var pageCount = Math.ceil(keys_filted.length/10);
            if(page_int > pageCount) {
                Utils.Tools.sendHelperMessageInGame(name, `没有更多了！总共才只有${pageCount}页呢！`);
                return;
            }
            if(page_int == 1) {
                minCount = 0;
                maxCount = 9;
            } else {
                minCount = page_int*10;
                maxCount = minCount+10;
            }
            
            Utils.Tools.sendTellraw(name,`当前展示分类 §a${sortName}§r 的第${page_int}页，共${pageCount}页`);
            for(var i = minCount; i < maxCount; i++) {
                if(keys_filted[i] === undefined) return;
                let itemPrice = shopList[sortName][keys_filted[i]].price;
                Utils.Tools.sendTellraw(name,`${keys_filted[i]} 价格：§e${itemPrice}`);
            }
        }
    },
    
    detail: {
        description: '展示指定商品的详细描述',
        help: '<productName:string>',
        param: 1,
        cmd: function(name,productName) {
            if(productName.startsWith('禁用')) {
                Utils.Tools.sendHelperMessageInGame(name, '你要找的这个商品不存在！');
                return;
            }
            var shopList = Data.RentalServer.Shop;
            var sortKeys = Object.keys(shopList);
            var productInfo = null;
            sortKeys.forEach((value,index) => {
                if(value.startsWith('禁用')) return;
                if(shopList[value][productName] != undefined) {
                    productInfo = shopList[value][productName];
                }
            });
            if(productInfo === null) {
                Utils.Tools.sendHelperMessageInGame(name, '你要找的这个商品不存在！');
                return;
            }
            Utils.Tools.sendTellraw(name,`${productName} 价格：§e${productInfo.price}`);
            if(productInfo.type === 'item') Utils.Tools.sendTellraw(name,`数量：§a${productInfo.extra.amount}`);
            Utils.Tools.sendTellraw(name,`描述：${productInfo.desc}`);
        }
    },
    
    buy: {
        description: '购买商品',
        help: '<productName:string>',
        param: 1,
        cmd: function(name,productName,amount) {
            if(productName.startsWith('禁用')) {
                Utils.Tools.sendHelperMessageInGame(name, '你要买的这个商品不存在！');
                return;
            }
            var shopList = Data.RentalServer.Shop;
            var sortKeys = Object.keys(shopList);
            var productInfo = null;
            sortKeys.forEach((value,index) => {
                if(value.startsWith('禁用')) return;
                if(shopList[value][productName] != undefined) {
                    productInfo = shopList[value][productName];
                }
            });
            if(productInfo === null) {
                Utils.Tools.sendHelperMessageInGame(name, '你要买的这个商品不存在！');
                return;
            }
            
            // 先算算钱
            var myxuid = Cache.XuidList[name];
            var mypd = System.PlayerManager.read(myxuid);
            var my_balance = mypd.money_balance;
            
            var price = productInfo.price;
            
            var my_new_balance = my_balance - price;
            
            if(my_new_balance < 0) {
                Utils.Tools.sendHelperMessageInGame(name, `啊哦！好像你的余额不够呢，这个商品的价格是§e${price}`);
                return;
            }
            
            // 条件满足，嗯造就完了
            switch(productInfo.type) {
                case 'item':
                    var itemID = productInfo.extra.item;
                    var amount = productInfo.extra.amount;
                    if(itemID === undefined || amount === undefined) {
                        Utils.Tools.sendLogMessageInConsole("err", "shop", `商品 ${productName} 貌似并没有设置item_id和amount，请排查！`);
                        Utils.Tools.sendHelperMessageInGame(name, `啊这！看起来出了一些问题，暂时无法完成购买。我建议你联系一下服主！`);
                        return;
                    }
                    game.sendCommand(`give "${name}" ${itemID} ${amount}`,(callback) => {
                        if(callback.SuccessCount === 0) {
                            Utils.Tools.sendLogMessageInConsole("err", "shop", `商品 ${productName} 的命令执行失败！可能是item_id或amount设置有误！请排查！`);
                            Utils.Tools.sendHelperMessageInGame(name, `啊这！看起来出了一些问题，暂时无法完成购买。我建议你联系一下服主！`);
                            return;
                        }
                        Utils.Tools.sendHelperMessageInGame(name, `好耶！你成功购买了§a${productName}`);
                        System.PlayerManager.updatePlayer(myxuid,'money_balance',my_new_balance);
                    });
                    break;
                
                case 'chest':
                    var pos = productInfo.extra.chestPos;
                    if(pos === undefined) {
                        Utils.Tools.sendHelperMessageInGame(name, `啊这！看起来出了一些问题，暂时无法完成购买。我建议你联系一下服主！`);
                        return;
                    }
                    game.sendCommand(`clone ${pos} ${pos} ~-3~~ replace force`,(callback) => {
                        game.sendCommand('fill ~-3~~ ~-3~~ air 0 destroy',(callback) => {
                            game.sendCommand('kill @e[r=5,type=item,name="箱子"]',(callback) => {
                                game.sendCommand(`tp @e[r=5,type=item] "${name}"`,(callback) => {
                                    // 购买成功
                                    Utils.Tools.sendHelperMessageInGame(name, `好耶！你成功购买了§a${productName}`);
                                    System.PlayerManager.updatePlayer(myxuid,'money_balance',my_new_balance);
                                });
                            });
                        });
                    });
                    break;
                
                case 'entity':
                    var entity_id = productInfo.extra.entity_id;
                    if(entity_id === undefined) {
                        Utils.Tools.sendLogMessageInConsole("err", "shop", `商品 ${productName} 没有设置entity_id！！！请仔细排查！`);
                        Utils.Tools.sendHelperMessageInGame(name, `啊这！看起来出了一些问题，暂时无法完成购买。我建议你联系一下服主！`);
                        return;
                    }
                    game.sendCommand(`execute "${name}" ~~~ summon ${entity_id} ~~~`,(callback) => {
                        if(callback.SuccessCount === 0) {
                            Utils.Tools.sendLogMessageInConsole("err", "shop", `商品 ${productName} 的命令执行失败！可能是entity_id设置有误！你设置的entity_id：${entity_id}`);
                            Utils.Tools.sendHelperMessageInGame(name, `啊这！看起来出了一些问题，暂时无法完成购买。我建议你联系一下服主！`);
                            return;
                        }
                        Utils.Tools.sendHelperMessageInGame(name, `好耶！你成功购买了§a${productName}`);
                        System.PlayerManager.updatePlayer(myxuid,'money_balance',my_new_balance);
                    });
                    break;
                
                default:
                    Utils.Tools.sendLogMessageInConsole("err", "shop", `商品 ${productName} 的type设置错误！你设置的type：${productInfo.type}`);
                    Utils.Tools.sendHelperMessageInGame(name, `啊这！看起来出了一些问题，暂时无法完成购买。我建议你联系一下服主！`);
                    break;
            }
        },
    }
};