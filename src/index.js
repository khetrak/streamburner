var logger = require('./logger'),
	jquery = require('./jquery'),
	env = require('./env');

if(!env.detect()) return;

jquery.load(function($) {
	function documentReady() {
		logger.log("Document is ready");
		if(!env.detectOnReady()) return;

		logger.log("Sleeping for one tick");
		setTimeout(function() {
			require('./run');
			env.startLoop();
		},0);
	}

	if(document.readyState == 'complete' || document.readyState == 'interactive') {
		documentReady();
	} else {
		logger.log("Waiting for document to be ready...");
		$(documentReady);
	}
	
});
