game.sendCommand('scoreboard objectives list', (response) =>{
        console.log(JSON.stringify(response));
    });

/*
{
	"CommandOrigin": {
		"Origin": 0,
		"UUID": "72fa655b-c553-11ec-b777-725810de226c",
		"RequestID": "",
		"PlayerUniqueID": 0
	},
	"OutputType": 3,
	"SuccessCount": 4,
	"OutputMessages": [{
		"Success": true,
		"Message": "§a%!c(MISSING)ommands.scoreboard.objectives.list.count",
		"Parameters": ["4"]
	},
	{
		"Success": true,
		"Message": "commands.scoreboard.objectives.list.entry",
		"Parameters": ["fc_coin", "FC测试金钱", "dummy"]
	},
	{
		"Success": true,
		"Message": "commands.scoreboard.objectives.list.entry",
		"Parameters": ["test1", "测试1", "dummy"]
	},
	{
		"Success": true,
		"Message": "commands.scoreboard.objectives.list.entry",
		"Parameters": ["test2", "测试2", "dummy"]
	},
	{
		"Success": true,
		"Message": "commands.scoreboard.objectives.list.entry",
		"Parameters": ["test3", "测试3", "dummy"]
	}],
	"DataSet": ""
}
*/