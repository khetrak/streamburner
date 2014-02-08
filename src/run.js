var logger = require('./logger'),
	Util = require('./util'),
	$ = require('./jquery'),
	env = require('./env');

logger.log('Running with jQuery',$);

if(env.has_body) {
	Util.attemptModule('clearout');
	Util.attemptModule('brand');
	Util.attemptModule('pro_upgrader');
	setTimeout(function() {
		logger.log("CALL delayed");
		Util.attemptModule('clearout');
		Util.attemptModule('pro_upgrader');
	},1000);

	if(!env.is_twitch) {
		Util.attemptModule('over18_bypass');
		Util.attemptModule('reduce_title');
		Util.attemptModule('justin/pretty_directory');
		Util.attemptModule('justin/style_tweaks');
		//Util.attemptModule('justin/add_pro_midnight_mode');
		//if(env.has_chat) Util.attemptModule('justin/chat_resize');
	}
}

if(env.is_twitch) {
	Util.attemptModule('twitch/dark_mode');
	function chatLoaded() {
		Util.attemptModule('chat/moderator');
		Util.attemptModule('chat/emotes');
		Util.attemptModule('chat/settings');
	}
	if(Twitch.chat.isLoaded()) {
		chatLoaded();
	} else {
		var oldLoad = Twitch.chat.load;
		Twitch.chat.load = function() {
			oldLoad.apply(this,arguments);
			chatLoaded();
		};
	}
} else {
	if(env.has_chat) {
		Util.attemptModule('chat/emotes');
		Util.attemptModule('chat/moderator');
		Util.attemptModule('chat/settings');
	}
}
