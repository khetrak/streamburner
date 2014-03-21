var $ = require('../../jquery'),
	env = require('../../env'),
	logger = require('../../logger');

module.exports = function() {
	env.on('chat_load',inject);
}

function inject(mode) {
	logger.log('Injecting SB settings menu');

	if(!env.is_twitch && mode === 'legacy') {
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
	} else if(env.is_twitch && mode === 'ember') {
		var $settings = $('.chat-settings .chat-menu-content').first();
		if(!$settings.length) throw Error("Couldn't find popout action");
		
		var $new = $('<p><a href="#">Clear My Chat</a></p>');
		$new.find('a').click(function(e) {
			e.preventDefault();
			var room = window.App.__container__.lookup('controller:chat').currentRoom;
			room.set("messages",[]);
			room.addTmiMessage("You cleared your own chat (StreamBurner)");
		});
		$settings.append($new);
	}
}
