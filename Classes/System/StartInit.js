module.exports = function(){
    Function.buildCache();
    Function.buildData();
    GameTool.getBotName().then((res) => {
        GameTool.getPlayerList();
        GameTool.feedbackChecker();
    });
};