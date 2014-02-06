var $ = require('../jquery'),
	env = require('../env');

module.exports = function() {
	var $watermark = $('<img/>')
	.prop('src','https://run.streamburner.net/sbflag.png')
	.css('position', 'absolute');

	var $logo;
	if(env.is_twitch) {
		$logo = $('#header_logo');
		if($logo.length) {
			$logo.css('position','relative');
			$watermark.clone().css({ top: '-12px', left: '-5px', width: '15px' }).prependTo('#header_logo');
		}

		$logo = $('#logo');
		if($logo.length)
			$watermark.clone().css({ top: '12px', left: '64px', width: '15px' }).prependTo($('.top').first());

		$logo = $('#small_home');
		if($logo.length)
			$watermark.clone().css({ top: '0px', left: '5px', width: '15px' }).prependTo('#small_home');

		return;
	} else {
		$logo = $('.global-header-logo');
		if($logo.length) {
			$watermark.css({ top: '2px', left: '1px', width: '15px' }).prependTo('.global-header-wrapper');
			return;
		}
	}
	
	throw Error('Logo not found');
}
