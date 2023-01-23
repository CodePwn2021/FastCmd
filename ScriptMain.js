engine.waitConnectionSync();

const code_name = '#CODENAME#';
const main_version = '#VERSION#';
const release_time = '#RELEASE_TIME#';

/* Define Start */
var System = {};
var Command = {};
var Function = {};
var GameTool = {};
var Init = {};
var ScoreBoard = {};
var Utils = {};
Utils.Template = {};

var Config = {};
var Data = {};
Data.RentalServer = {};
Data.Script = {};
var Cache = {};
loadModule('eval', 'Define', 'Define.js');

// Init, and CacheBuilder.
System.StartInit();

var messageEvent = {};
/* Define End */

_init_();

function _init_() {
    console.log('\n----- FastCmd ------' +
        '\nAuthor: CodePwn2021' +
        '\nVersion: ' + main_version +
        '\nCode Name: ' + code_name +
        '\nRelease Time: ' + release_time +
        '\n--------------------');
    console.log('正在检查。。。');
    connectUserCenter();
}

function connectUserCenter() {

    var param_json = JSON.stringify({
        'fb_name': consts.uc_username,
        'version': main_version,
        'time_sign': Math.round(new Date() / 1000)
    });

    var encrypted_json = CryptoJS.AES.encrypt(param_json, CryptoJS.enc.Utf8.parse('bQRjG5vcjC1tQZyM'), {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: CryptoJS.enc.Utf8.parse('16tU8oT59pTlpqm1')
    }).toString();

    fetch('https://api.fastcmd.xyz/fastcmd/check-pro', {
        method: 'POST',
        headers: {
            'Cache-Control': 'no-cache',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: 'param=' + encodeURIComponent(encrypted_json)
    }).then(function(response) {
        response.text().then(function(prepare) {
            var res = CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(prepare, CryptoJS.enc.Utf8.parse('bQRjG5vcjC1tQZyM'), {
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
                iv: CryptoJS.enc.Utf8.parse('16tU8oT59pTlpqm1')
            }));
            try {
                var parsed = JSON.parse(res);
            } catch (err) {
                Utils.Tools.crashScriptPro(`无法正确解析服务器传回数据：${err}`);
                return;
            }
            if (parsed.code != 0) {
                Utils.Tools.crashScriptPro(`鉴权错误：${parsed.message}`);
                return;
            }

            var timeSignCount = Math.round(new Date() / 1000) - parsed.time_sign;

            if (timeSignCount > 20) {
                Utils.Tools.crashScriptPro(`与服务器时间不同步（疑似使用抓包软件）`);
                return;
            }

            console.log('检查通过。');
            console.log('欢迎用户：' + parsed.username);
            console.log('您的授权到期时间为：' + Utils.Tools.getFormtTime(parsed.expire, true));

            fetch('http://api.fastcmd.xyz/fastcmd/notice.json', {
                method: 'GET',
                headers: {
                    'Cache-Control': 'no-cache',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                }
            }).then((response) => {
                response.text().then((text) => {
                    var obj = JSON.parse(text);
                    console.log('\n---- 云端公告 ----' +
                        '\n时间：' + obj.time +
                        '\n内容：\n' + obj.content +
                        '\n-----------------');
                })
            })

            System.Thread.start('FastCmdKeyDownDrop');
        });
    }).catch(function(err) {
        Utils.Tools.crashScriptPro(`网络错误：${err}`);
    });
}

function loadModule(mode, name, path) {
    var target = require(path);
    //console.log('\033[1;33m[DEBUG]\033[0m Loading:\n'+'\033[0;36m'+name+'\033[0m');
    if(!target.startsWith('CodePwn2021_Encrypted') || target.indexOf('Encrypted_END') === -1) {
        console.log(`模块文件：${path} 存在异常，已阻止加载\n偷改版权的差不多得了，我不是随便就能欺负的，谢谢。\n作者：CodePwn2021\n认准正版，避免被坑`);
        return;
    }
    target = target.replace('CodePwn2021_Encrypted','').replace('Encrypted_END','');
    var loads = CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(target, CryptoJS.enc.Utf8.parse('QUmdTISWvlo4KAy1'), {
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
        iv: CryptoJS.enc.Utf8.parse('aX0WFnOUAC9cZrD4')
    }));
    switch (mode) {
        case 'import':
            eval(name + '=' + loads);
            break;

        case 'eval':
            eval(loads);
            break;
    }
    loads = '';
}
