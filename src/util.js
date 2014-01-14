var $ = require('./jquery'),
	logger = require('./logger'),
	Modules = require('./modules/index');

module.exports = {
	bhook: function(hooklist) {
		var results = {};
		$.each(hooklist, function(key,search) {
			var found = $(search);
			if(found.length == 0) {
				throw new Error("bhook couldn't find "+search);
			}
			results[key] = found[0];
		});
		return results;
	},
	replaceAll: function(str, s1, s2) {
		return str.split(s1).join(s2);
	},
	stripSlashes: function(str) {
		str=str.replace(/\\'/g,'\'');
		str=str.replace(/\\"/g,'"');
		str=str.replace(/\\0/g,'\0');
		str=str.replace(/\\\\/g,'\\');
		return str;
	},
	attempt: function(name,func) {
		try {
			logger.log('Running '+name);
			func.call(undefined);
		} catch(e) {
			logger.error('Caught error'+e);
		}
	},
	attemptModule: function(name) {
		attempt(name,Modules[name]);
	}
};
