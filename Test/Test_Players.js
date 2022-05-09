game.sendCommand('tell @s @e[type=player]', (response) =>{
        console.log(JSON.stringify(response));
    });

/*
{
	"CommandOrigin": {
		"Origin": 0,
		"UUID": "815fc539-c533-11ec-923d-725810de226c",
		"RequestID": "",
		"PlayerUniqueID": 0
	},
	"OutputType": 3,
	"SuccessCount": 1,
	"OutputMessages": [{
		"Success": true,
		"Message": "commands.message.display.outgoing",
		"Parameters": ["Code_81247e", "Code_81247e, LeiJun114514"]
	}],
	"DataSet": ""
}
*/