var $ = require('../jquery'),
	env = require('../env');

function cstroke(color, size)
{
	return ''
			  +size+'px  '+size+'px 0 '+color
		+', -'+size+'px  '+size+'px 0 '+color
		+',  '+size+'px -'+size+'px 0 '+color
		+', -'+size+'px -'+size+'px 0 '+color;
}
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

	$logo.css('position', 'relative');

	var $watermark = $('<div/>').css({
		position: 'absolute',
		'font-weight': 'bold',
		'font-size': '15px',
		'font-family': 'arial',
		'text-decoration': 'none'
	});
	if(env.is_twitch) {
		if(newTwitch) {
			$watermark.css({
				top: '18px',
				left: '63px',
				'text-shadow': cstroke('#999999', 1),
				'text-indent': 0,
				color: 'white'
			});
		} else {
			$watermark.css({
				top: '-11px',
				left: '-6px',
				'text-shadow': cstroke('purple', 1),
				color: 'white'
			});
		}
	} else {
		$watermark.css({
			top: '2px',
			left: '-8px',
			color: 'red',
			'text-indent': 0
		});
	}
	$watermark.text('Better').appendTo($logo);
}
