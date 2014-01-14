var logger = require('./logger'),
	jquery = require('./jquery');

if(!window.jQuery) {
	logger.log("Aborting load -- jQuery isn't here, so this page probably isn't content");
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
