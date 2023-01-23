module.exports = {
    add: function(task_name, need_function) {
        messageEvent[task_name] = need_function;
    },
    
    remove: function(task_name) {
        delete messageEvent[task_name];
    },
    
    isExists: function(task_name) {
        return messageEvent.hasOwnProperty(task_name);
    }
};