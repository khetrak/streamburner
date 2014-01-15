var $ = require('../../jquery');

module.exports = function() {
	var $settingsmenu = $(".dmactions");
	if(!$settingsmenu.length) return;
	
	$settingsmenu.css('height','auto');

	var $div = $("<div/>").html('\
		<p class="chat_option" id="bjtv_dark" style="cursor: pointer"> \
			<span>Darken Page</span> \
		</p> \
		<p class="chat_option" id="bjtv_clear" style="cursor: pointer"> \
			<span>Clear My Chat</span> \
		</p> \
	').appendTo($settingsmenu);
	
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
	$div.find('#bjtv_clear').click(function() {
		$('#chat_line_list').html('');
		CurrentChat.admin_message("You cleared your own chat (BetterJTV)");
	});

}
