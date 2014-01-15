var $darkcss = false;
$div.find('#bjtv_dark').click(function() {
	if($darkcss) {
		$darkcss.remove();
		$darkcss = false;
	} else {
		$darkcss = $("<link/>")
			.prop('href','http://run.betterjtv.com/dark.css')
			.prop('type','text/css')
			.prop('rel','stylesheet')
			.appendTo('head');
	}
});
