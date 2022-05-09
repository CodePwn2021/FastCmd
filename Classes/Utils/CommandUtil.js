module.exports = {
    // 转换为map
    getMap: function(arr1, arr2) {
        var obj = {};
        for (var i = 0; i < arr1.length; i++) {
            obj[arr1[i]] = arr2[i];
        }
        return obj;
    },

    // 转换指定类型
    convertType: function(type, source) {
        switch (type) {
            case 'string':
                return '"' + source + '"';

            case 'number':
                return Number(source);

            case 'boolean':
                if (source == "true") {
                    return true;
                } else if (source == 'false') {
                    return false;
                }
                break;
        }
    },

    // 校验类型是否正确
    isTypeValid: function(type, source) {
        switch (type) {
            case 'string':
                return '[object String]' == Object.prototype.toString.call(source);

            case 'number':
                return '[object Number]' == Object.prototype.toString.call(source) && isFinite(source);

            case 'boolean':
                return typeof source === 'boolean';

            default:
                return false;
        }
    }
};