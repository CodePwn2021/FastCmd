module.exports = function(){
    return new Promise((resolve,reject) => {
        game.sendCommand('scoreboard objectives list',(response) => {
            var lists = response.OutputMessages;
            var result = [];
            lists.forEach((value,index) => {
                if(index == 0) return;
                let param = lists[index].Parameters;
                result.push([param[0],param[1]]);
            });
            resolve(result);
        });
    });
};