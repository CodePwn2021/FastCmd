module.exports = {
    addGroup: function(cache_group_name) {
        Cache[cache_group_name] = {};
    },
    
    removeGroup: function(cache_group_cache) {
        delete Cache[cache_group_name];
    },
    
    isGroupExists: function(cache_group_name) {
        return Cache.hasOwnProperty(cache_group_name);
    }
};