var $ = require('../../jquery');

module.exports = function() {
	var featured = $('.directory-most-viewed-channels .directory-channel').remove();
	$('.directory-most-viewed-channels').remove();
	featured.prependTo('.directory-channels');
	$('.directory-channel').css({
		'margin-right': '3px',
		'margin-left': '-8px'
	});
}
