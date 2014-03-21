var logger = require('../logger'),
	$ = require('../jquery');

module.exports = function() {
	if(! (/chrom(e|ium)/.test(navigator.userAgent.toLowerCase()))) return;
	if($('script[src="https://run.streamburner.net/streamburner.min.js"][id]').length) return;

	logger.log('Detected legacy chrome extension, displaying warning');
	
	$('<a href="https://www.streamburner.net/"></a>')
	.attr('target','_blank')
	.text('Streamburner has moved! Please remove the extension and reinstall it from the website.')
	.css({
		display: 'block',
		position: 'fixed',
		right:0, bottom:0,
		'background-color': '#990000',
		color: '#cccccc',
		'z-index': 99999,
		padding: '5px',
		'font-size': '10px',
		'cursor': 'pointer',
		'text-align': 'right'
	})
	.appendTo('body');
}
