testSensitive();
function testSensitive() {
var isSensitive = true;
game.sendCommand('tell @s 哈哈哈', (response) => {
    isSensitive = false;
    return;
});

setTimeout(
function(){
if(isSensitive) {
    console.log('sensitive name!');
    } else {
        console.log('not sensitive name!');
    }},500);
}