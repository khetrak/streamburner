var logger = require('./logger');

module.exports = {
	load: function(c) {
		logger.log('Loading local jQuery...');
		var script = document.createElement('script');
		script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/2.0.1/jquery.min.js';
		var head = document.getElementsByTagName('head')[0];
		script.onload = function() {
			logger.log('jQuery loaded');
			var $ = jQuery.noConflict(true);
			module.exports = $;
			c($);
		};
		head.appendChild(script);
	}
};
