var $ = require('./jquery'),
	logger = require('./logger');

// lazy load to prevent dependency loop
var modules = false;
var attemptShift = 0;

var Util = {
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
		attemptShift++;
		try {
			var log = '';
			for(var i = 0; i < attemptShift; i++) log += ' ';
			log += '> '+name;
			logger.log(log);
			func.call();
		} catch(e) {
			logger.error('Caught error',e.stack);
		}
		attemptShift--;
	},
	attemptModule: function(name) {
		if(modules === false) {
			modules = require('./modules/index');
		}
		Util.attempt(name,modules[name]);
	}
};

module.exports = Util;
