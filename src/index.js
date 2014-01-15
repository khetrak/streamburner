var logger = require('./logger'),
	jquery = require('./jquery'),
	env = require('./env');

if(!env.detect()) {
	return;
}

jquery.load(function($) {
	if(document.readyState == 'complete' || document.readyState == 'interactive') {
		require('./run');
	} else {
		logger.log("Waiting for document to be ready...");
		$(function() {
			logger.log("Document is ready");
			require('./run');
		});
	}
	
});
