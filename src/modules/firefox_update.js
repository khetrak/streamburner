module.exports = function() {
	if(navigator.userAgent.toLowerCase().indexOf('firefox') == -1) return;
	if($('#localffbetterjtv').length) return;

	var $box = jQuery('<a/>')
		.text('BetterJTV is out of date and needs to be updated')
		.appendTo('body')
		.css({
			display: 'block',
			'background-color': '#222',
			color: '#ccc',
			position: 'fixed',
			'z-index': 100,
			padding: '5px',
			bottom: '0',
			right: '0',
			'border-top-left-radius': '3px'
		}).attr('href','http://www.betterjtv.com/')
	;
}
