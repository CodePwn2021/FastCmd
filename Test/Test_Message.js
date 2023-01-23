game.listenChat(function(name, msg) {
    if(name == '') {
        console.log('[NULL] => ' + msg);
        return;
    }
    
    console.log(`${name} => ${msg}`);
});