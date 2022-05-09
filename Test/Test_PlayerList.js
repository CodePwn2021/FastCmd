function a() {
    game.sendCommand('list', (response) => {
        console.log(JSON.stringify(response));
        //var player_list = response.OutputMessages[0].Parameters[1].split(", ");
    });
};
a();


/*

{
	"CommandOrigin": {
		"Origin": 0,
		"UUID": "ba81200c-c07c-11ec-827d-7a499caac494",
		"RequestID": "",
		"PlayerUniqueID": 0
	},
	"OutputType": 3,
	"SuccessCount": 1,
	"OutputMessages": [{
		"Success": true,
		"Message": "commands.players.list",
		"Parameters": ["2", "10"]
	}, {
		"Success": true,
		"Message": "commands.players.list.names",
		"Parameters": ["Code_81247f, LeiJun114514"]
	}],
	"DataSet": ""
}
OutputMessages[1].Parameters[0]
*/