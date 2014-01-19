var logger = {};
var logtypes = ['log','warn','error','info'];
for(var i = 0; i < logtypes.length; i++) {
(function(type) {
	logger[type] = function() {
		if(!window.console) return;
		if(!console[type]) return;
		var args = Array.prototype.slice.apply(arguments);
		args.unshift("[SB "+type+"]");
		console.log.apply(console,args);
	};
})(logtypes[i]);
}

logger.log('Starting...');

module.exports = logger;
