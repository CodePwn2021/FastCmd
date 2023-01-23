module.exports = {
    save: function() {
        var drent = Data.RentalServer;
        var dscript = Data.Script;
        Object.keys(drent).forEach((value,index) => {
            var rcache = JSON.stringify(drent[value],null,4);
            fs.writeFile(Data.fileList[`Rent${value}`],rcache);
        });
        
        Object.keys(dscript).forEach((value,index) => {
            var rcache = JSON.stringify(dscript[value],null,4);
            fs.writeFile(Data.fileList[`Script${value}`],rcache);
        });
        
    },
    reload: function() {
        System.DataManager.save();
        Data.RentalServer = {};
        Data.Script = {};
        Function.buildData();
    },
    reload_nosave: function() {
        Data.RentalServer = {};
        Data.Script = {};
        Function.buildData();
    }
};