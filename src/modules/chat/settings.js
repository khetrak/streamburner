var $ = require('../../jquery'),
	env = require('../../env'),
	logger = require('../../logger');

module.exports = function() {
	if(env.is_twitch) {
		var $popoutAction = $('#chat_settings_dropmenu .g18_popout-FFFFFF80').first();
		if(!$popoutAction.length) throw Error("Couldn't find popout action");
		
		var $a = $('<a href="#" class="dropmenu_action">Clear My Chat</a>');
		$a.click(function(e) {
			e.preventDefault();
			$('#chat_line_list').html('');
			CurrentChat.line_count = 0;
			CurrentChat.queue.length = 0;
			CurrentChat.admin_message("You cleared your own chat (StreamBurner)");
		});
		$popoutAction.after($a);
	} else {
		var $popoutAction = $(".chat-actions #popout-chat");
		if(!$popoutAction.length) throw Error("Couldn't find popout action");

		var $a = $('\
			<a class="chat-action" href="#" id="sb_clear">Clear My Chat</a> \
		');

		$a.click(function(e) {
			e.preventDefault();
			$('#chat_line_list').html('');
			CurrentChat.line_count = 0;
			CurrentChat.queue.length = 0;
			CurrentChat.admin_message("You cleared your own chat (StreamBurner)");
		});
		$popoutAction.after($a);
	}
}
