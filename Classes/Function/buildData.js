module.exports = function() {
    var paths = [
        'FastCmd/Data',
        'FastCmd/Data/Log',
        'FastCmd/Data/Config',
        'FastCmd/Cache',
        'FastCmd/Data/Log/Chat', /* 聊天记录日志 */
        'FastCmd/Data/Log/PlayerJoin', /* 玩家加入和退出日志 */
        'FastCmd/Data/Log/Script', /* 脚本日志 */
        'FastCmd/Data/Config/RentalServer', /* 租赁服配置 */
        'FastCmd/Data/Config/Script', /* 脚本配置 */
        'FastCmd/Data/PlayerData' /* 玩家数据 */
    ];

    Data.fileList = {
        /* RentalServer */
        RentMain: 'FastCmd/Data/Config/RentalServer/main.json',
        /* 租赁服主配置 */
        RentDetail: 'FastCmd/Data/Config/RentalServer/detail.json',
        /* #detail命令提示数据 */
        RentTplist: 'FastCmd/Data/Config/RentalServer/tplist.json',
        /* 公共tp列表 */
        RentShop: 'FastCmd/Data/Config/RentalServer/shop.json',
        /* 商店数据 */
        RentNotice: 'FastCmd/Data/Config/RentalServer/notice.json',
        /* 轮播公告 */
        RentScoreboard: 'FastCmd/Data/Config/RentalServer/scoreboard.json',
        /* 记分板配置 */

        /* Script */
        ScriptMain: 'FastCmd/Data/Config/Script/main.json',
        /* 脚本主配置 */
        ScriptTask: 'FastCmd/Data/Config/Script/task.json',
        /* 自定义计划任务（指令） */
        ScriptTool: 'FastCmd/Data/Config/Script/tool.json',
        /* 自带工具开关 */
        ScriptLang: 'FastCmd/Data/Config/Script/lang.json',
        /* 文本自定义，但暂不支持多语言文本 */
        ScriptDisabledCmd: 'FastCmd/Data/Config/Script/disabled_cmd.json'
        /* 禁用的命令 */
    };

    paths.forEach((value, index) => {
        if (fs.exists(value)) {
            if (!fs.isDir(value)) {
                fs.remove(value);
                fs.mkdir(value);
            }
        } else {
            fs.mkdir(value);
        }
    });

    Object.keys(Data.fileList).forEach((value, index) => {
        if (fs.exists(Data.fileList[value])) {
            if (fs.isDir(Data.fileList[value])) {
                fs.remove(Data.fileList[value]);
                // 是个文件夹就删掉，然后写入基础数据
                fs.writeFile(Data.fileList[value], JSON.stringify(Utils.Template[value],null,4));
                var externalJSON = JSON.parse(fs.readFile(Data.fileList[value]));
                if (value.startsWith('Rent')) {
                    Data.RentalServer[value.replace('Rent', '')] = Object.assign(Utils.Template[value], externalJSON);
                } else if (value.startsWith('Script')) {
                    Data.Script[value.replace('Script', '')] = Object.assign(Utils.Template[value], externalJSON);
                }
            } else {
                // 检查数据看看，发生错误就重写数据进去
                var checkData;
                try {
                    checkData = JSON.parse(fs.readFile(Data.fileList[value]));
                } catch (e) {
                    Utils.Tools.sendLogMessageInConsole('warn', 'Data', `${value} 配置存在格式问题，已为您备份原文件，请重新检查格式！！！`);
                    fs.rename(Data.fileList[value], `${Data.fileList[value]}.bak`);
                    fs.writeFile(Data.fileList[value], JSON.stringify(Utils.Template[value],null,4));
                }
                var assigned = Object.assign(Utils.Template[value], checkData);
                if (value.startsWith('Rent')) {
                    Data.RentalServer[value.replace('Rent', '')] = assigned;
                    fs.writeFile(Data.fileList[value], JSON.stringify(assigned,null,4));
                } else if (value.startsWith('Script')) {
                    Data.Script[value.replace('Script', '')] = assigned;
                    fs.writeFile(Data.fileList[value], JSON.stringify(assigned,null,4));
                }
            }
        } else {
            // 东西不在，写入基础数据
            fs.writeFile(Data.fileList[value], JSON.stringify(Utils.Template[value],null,4));
            var externalJSON = JSON.parse(fs.readFile(Data.fileList[value]));
            if (value.startsWith('Rent')) {
                Data.RentalServer[value.replace('Rent', '')] = Object.assign(Utils.Template[value], externalJSON);
            } else if (value.startsWith('Script')) {
                Data.Script[value.replace('Script', '')] = Object.assign(Utils.Template[value], externalJSON);
            }
        }
    });
    // fs.writeFile('FastCmd/Data/debug.json', JSON.stringify(Data,null,4));
};