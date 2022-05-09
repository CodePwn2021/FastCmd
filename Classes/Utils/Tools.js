module.exports = {
	sendMessageInGameAll: function(name, content) {
		game.oneShotCommand(`tellraw @a {\"rawtext\":[{\"text\":\"<${name}§r> ${content}§r\"}]}`);
	},

	sendMessageInGame: function(target, name, content) {
		game.oneShotCommand(`tellraw "${target}" {\"rawtext\":[{\"text\":\"<${name}§r> ${content}§r\"}]}`);
	},

	sendTellraw: function(target, content) {
		game.oneShotCommand(`tellraw "${target}" {\"rawtext\":[{\"text\":\"${content}§r\"}]}`);
	},

	sendHelperMessageInGame: function(target, content) {
		var helperName = Data.RentalServer.Main.helperName;
		var str = Utils.Tools.magicText(content,target);
		game.oneShotCommand(`tellraw "${target}" {\"rawtext\":[{\"text\":\"<${helperName}§r> ${str}§r\"}]}`);
	},

	sendLogMessageInConsole: function(type, name, content) {
		let nocolor = "\033[0m";
		switch (type) {
			case "info":
				ctype = "\033[1;32m[INFO]";
				type = "INFO";
				break;

			case "err":
				ctype = "\033[1;31m[ERROR]";
				type = "ERROR";
				break;

			case "warn":
				ctype = "\033[1;33m[WARN]";
				type = "WARN";
				break;
		}
		if(Data.Script.Main.recordScriptLog) {
			Utils.Logger.script(type,name,content);
		}
		console.log(`${ctype} ${name}：${content+nocolor}`);
	},

	sendLogMessageInGame: function(target, type, content) {
		switch (type) {
			case "info":
				ctype = "§2INFO";
				break;

			case "err":
				ctype = "§cERROR";
				break;

			case "warn":
				ctype = "§6WARN";
				break;
		}
		game.oneShotCommand(`tellraw "${target}" {\"rawtext\":[{\"text\":\"<${ctype}§r> ${content}§r\"}]}`);
	},

	crashScriptPro: function(reason) {
		if(Data.Script.Main.recordScriptLog) {
			Utils.Logger.script('ERROR','FastCmd崩溃',reason);
		}
		let colored = '\033[0;31m'+reason+'\033[0m';
		console.log(`FastCmd即将崩溃，原因：\n${colored}`);
		game.oneShotCommand('kick '+Cache.GlobalInfo.botName);
		setTimeout(function(){console.log(game.sendCommandSync('tell @s 网易'))},1000);
		engine.crash();
	},

	randomArray: function(arr) {
		var newArr = [];
		arr.forEach((value,index) => {
			if(!value.startsWith('禁用')){
				newArr.push(value);
			}
		});
		if(newArr.length == 0) {
			return 'NULL_ARRAY';
		}
		return newArr[Math.floor((Math.random()*newArr.length))];
	},

	magicText: function(str,playerName) {
		var placed = str;
		if(playerName != null) {
			placed = placed.replace('#@PLAYERNAME@#',playerName);
		}
		var date = Utils.Tools.getDateChinese();
		var datetime = Utils.Tools.getTimeChinese();
		placed = placed.replace('#@DATETIME@#',datetime).replace('#@DATE@#',date)
		return placed;
	},

	getTime: function() {
		let time = Utils.Tools.getFormtTime(Math.round(new Date() / 1000), true);
		return time;
	},

	getDate: function() {
		let time = Utils.Tools.getFormtTime(Math.round(new Date() / 1000), false);
		return time;
	},

	getTimeChinese: function() {
		let time = Utils.Tools.getFormtTimeChinese(Math.round(new Date() / 1000), true);
		return time;
	},

	getDateChinese: function() {
		let time = Utils.Tools.getFormtTimeChinese(Math.round(new Date() / 1000), false);
		return time;
	},

	getFormtTime: function(dateTime, flag) {
		//格式化时间
		//dateTime：时间戳；  flag：取值为true/false，用于判断是否需要显示时分秒
		if (dateTime != null) {
			//若传入的dateTime为字符串类型，需要进行转换成数值，若不是无需下面注释代码
			//var time = parseInt(dateTime)
			var date = new Date(dateTime * 1000);
			//获取年份
			var YY = date.getFullYear();
			//获取月份
			var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
			//获取日期
			var DD = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
			if (flag) { //flag为true，显示时分秒格式
				//获取小时
				var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
				//获取分
				var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
				///获取秒
				var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
				//返回时间格式： 2020-11-09 13:14:52
				return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;
			} else {
				//返回时间格式： 2020-11-09
				return YY + '-' + MM + '-' + DD;
			}
		} else {
			return "";
		}
	},

	getFormtTimeChinese: function(dateTime, flag) {
		//格式化时间
		//dateTime：时间戳；  flag：取值为true/false，用于判断是否需要显示时分秒
		if (dateTime != null) {
			//若传入的dateTime为字符串类型，需要进行转换成数值，若不是无需下面注释代码
			//var time = parseInt(dateTime)
			var date = new Date(dateTime * 1000);
			//获取年份
			var YY = date.getFullYear();
			//获取月份
			var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
			//获取日期
			var DD = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
			if (flag) { //flag为true，显示时分秒格式
				//获取小时
				var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
				//获取分
				var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
				///获取秒
				var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
				//返回时间格式： 2020年11月09日，13点14分52秒
				return YY + '年' + MM + '月' + DD + '日，' + hh + '点' + mm + '分' + ss + '秒';
			} else {
				//返回时间格式： 2020年11月09日
				return YY + '年' + MM + '月' + DD + '日';
			}
		} else {
			return "";
		}
	}
};