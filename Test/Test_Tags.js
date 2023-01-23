function a() {
    game.sendCommand('tag LeiJun114514 list', (response) => {
        console.log(JSON.stringify(response));
        //var player_list = response.OutputMessages[0].Parameters[1].split(", ");
    });
};
a();