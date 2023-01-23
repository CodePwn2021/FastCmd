engine.waitConnectionSync();
engine.setName("TEST");
game.sendCommand('tell @s @a', (response) => {
            var bot_name = response.OutputMessages[0].Parameters[0];
            var player_list = response.OutputMessages[0].Parameters[1].split(", ");
            console.log("BotName: "+bot_name);
            console.log("PlayerList: \n"+JSON.stringify(player_list));
        });
console.log("start listen");
game.listenChat((name, msg) => {
    if(name == "") {
        console.log("[NULL] => "+msg);
    } else {
        console.log(name+" => "+msg);
    }
    
    if(msg.indexOf('#TEST#') != -1) {
        game.sendCommand('tell @s @a', (response) => {
            var bot_name = response.OutputMessages[0].Parameters[0];
            var player_list = response.OutputMessages[0].Parameters[1].split(", ");
            console.log("BotName: "+bot_name);
            console.log("PlayerList: \n"+JSON.stringify(player_list));
        });
    }
});
/*
{
	"CommandOrigin": {
		"Origin": 0,
		"UUID": "c0547462-bc7c-11ec-81e3-ee712839d470",
		"RequestID": "",
		"PlayerUniqueID": 0
	},
	"OutputType": 3,
	"SuccessCount": 1,
	"OutputMessages": [{
		"Success": true,
		"Message": "commands.message.display.outgoing",
		"Parameters": ["Code_9bcf3d", "PlayerList>>>Code_9bcf3d, LeiJun114514"]
	}],
	"DataSet": ""
}
*/