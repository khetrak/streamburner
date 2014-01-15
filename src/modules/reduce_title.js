var $ = require('../jquery'),
	env = require('../env');

module.exports = function() {
	if(!env.is_twitch) return;
	
	$('#broadcast_title').css({
		'font-size': '16px',
		'font-weight': 'normal',
		'white-space': 'nowrap',
		'text-overflow': 'ellipsis',
		'overflow': 'hidden'
	});
}
