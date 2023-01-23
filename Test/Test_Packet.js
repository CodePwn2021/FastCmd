game.subscribePacket('IDPlayerList',function(callback){
    console.log(JSON.stringify(callback));
});