var $ = require('../../jquery');

module.exports = function() {
	$("<link/>")
		.prop('href','http://run.streamburner.net/justin_tweaks.css')
		.prop('type','text/css')
		.prop('rel','stylesheet')
		.appendTo('head');
}
