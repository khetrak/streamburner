var $ = require('../../jquery');

var $darkcss = false;

module.exports = function() {
	var $actions = $('.channel-actions .buttons').first();
	if(!$actions.length) throw Error('Couldn\'t find actions');

	var $button = $('<a class="action normal_button"><span>Dark Mode</span></a>');
	$actions.append($button);
	
	$button.click(function(e) {
		e.preventDefault();
		if($darkcss) {
			$darkcss.remove();
			$darkcss = false;
		} else {
			$darkcss = $("<link/>")
				.prop('href','http://run.streamburner.net/darktwitch.css')
				.prop('type','text/css')
				.prop('rel','stylesheet')
				.appendTo('head');
		}
	});
}
