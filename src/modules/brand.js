var $ = require('../jquery'),
	env = require('../env');

module.exports = function() {
	var $logo;
	var newTwitch = false;
	if(env.is_twitch) {
		$logo = $('#header_logo');
		if(!$logo.length) {
			newTwitch = true;
			$logo = $('#logo');
		}
	} else {
		$logo = $('.global-header-logo');
	}
	if(!$logo) return;

	var $watermark = $('<img/>')
	.prop('src','https://run.streamburner.net/sbflag.png')
	.css('position', 'absolute');

	var $logo;
	if(env.is_twitch) {
		$logo = $('#header_logo');
		if($logo.length) {
			$logo.css('position','relative');
			$watermark.css({ top: '-12px', left: '-5px', width: '15px' }).prependTo('#header_logo');
			return;
		}

		$logo = $('#logo');
		if($logo.length) {
			$watermark.css({ top: '12px', left: '64px', width: '15px' });
			$('.top').first().prepend($watermark);
			return;
		}
	} else {
		$logo = $('.global-header-logo');
		if($logo.length) {
			$watermark.css({ top: '2px', left: '-4px', width: '15px' }).prependTo('.global-header-wrapper');
			return;
		}
	}
	
	throw Error('Logo not found');
}
