function a() {
    game.sendCommand('execute @a[name="张三"] ~~~ tp ~~~', (response) => {
        console.log(JSON.stringify(response));
    });
};
a();

/*
@e[type=player]    选取还活着的
@a[name="名字"]    选取指定玩家，不管有没有活着
{
	"CommandOrigin": {
		"Origin": 0,
		"UUID": "7c54cf6f-c510-11ec-b380-725810de226c",
		"RequestID": "",
		"PlayerUniqueID": 0
	},
	"OutputType": 3,
	"SuccessCount": 1,
	"OutputMessages": [{
		"Success": true,
		"Message": "commands.tp.success.coordinates",
		"Parameters": ["LeiJun114514", "-7.72", "4.00", "9.54"]
	}],
	"DataSet": ""
}
*/

/*
var param = response.OutputMessages[0].Parameters;
var targetName = param[0];
var targetPosX = param[1];
var targetPosY = param[2];
var targetPosZ = param[3];
*/