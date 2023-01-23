module.exports = function(name, command) {
    if (command.startsWith('# ') || command === '#') {
        Utils.Tools.sendLogMessageInGame(name, 'err', '命令格式不正确。');
        return;
    }

    var targetCmd = command.replace('#', '').split(' ')[0];
    var targetSubCmd = '';
    var param = command.replace('#' + targetCmd + ' ', '').replace('#' + targetCmd + '', '').split(' ');

    if (!Command.hasOwnProperty(targetCmd) || (Data.Script.DisabledCmd.list).includes(targetCmd)) {
        Utils.Tools.sendLogMessageInGame(name, 'err', '命令不存在。');
        return;
    }

    if (param[0] === 'default' || param[0] === 'config') {
        Utils.Tools.sendLogMessageInGame(name, 'err', '命令格式不正确。');
        return;
    }

    var isSimple = Command[targetCmd].config.isSimpleCommand;

    if (!isSimple) {
        /* 不是简单指令，进行预处理 */
        targetSubCmd = param[0];
        param.splice(0, 1);
        if (targetSubCmd == '') {
            Utils.Tools.sendLogMessageInGame(name, 'err', '命令格式不正确。');
            return;
        }

        if (!Command[targetCmd].hasOwnProperty(targetSubCmd)) {
            Utils.Tools.sendLogMessageInGame(name, 'err', '您输入的子命令不存在。');
            return;
        }
    } else {
        if (param[0] === '') {
            /* 针对简单命令出现的空字符串处理 */
            param.splice(0, 1);
        }
    }

    var execStr = '';
    param.forEach((value, index) => {
        execStr = execStr + ',"' + value + '"'
    });

    switch (isSimple) {
        case true:
            var needLength = Command[targetCmd].default.param;
            if (param.length != needLength) {
                Utils.Tools.sendLogMessageInGame(name, 'err', '执行错误！这个命令要求的参数是' + needLength);
                return;
            }
            try {
                eval('Command.' + targetCmd + '.default.cmd("' + name + '"' + execStr + ');');
            } catch {
                Utils.Tools.sendLogMessageInGame(name, 'err', '执行命令错误。请检查命令。');
            }
            break;

        case false:
            var needLength = Command[targetCmd][targetSubCmd].param;
            if (param.length != needLength) {
                Utils.Tools.sendLogMessageInGame(name, 'err', '执行错误！这个命令要求的参数是' + needLength);
                return;
            }
            try {
                eval('Command.' + targetCmd + '.' + targetSubCmd + '.cmd("' + name + '"' + execStr + ');');
            } catch(e) {
                Utils.Tools.sendLogMessageInGame(name, 'err', '执行命令错误。请检查命令。');
                console.log(e);
            }
            break;
    }
    return;
}