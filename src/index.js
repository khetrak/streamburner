var logger = require('./logger'),
	jquery = require('./jquery'),
	env = require('./env');

if(!env.detect()) {
	return;
}

jquery.load(function($) {
	function documentReady() {
		logger.log("Document is ready, waiting one tick");
		setTimeout(function() {
			require('./run');
		},0);
	}

	if(document.readyState == 'complete' || document.readyState == 'interactive') {
		documentReady();
	} else {
		logger.log("Waiting for document to be ready...");
		$(documentReady);
	}
	
});
