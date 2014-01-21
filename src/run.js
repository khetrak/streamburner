var logger = require('./logger'),
	Util = require('./util'),
	$ = require('./jquery'),
	env = require('./env');

logger.log('Running with jQuery',$);

/*
var betterjtv_stat = document.createElement('script');
betterjtv_stat.type = 'text/javascript';
betterjtv_stat.src = "http://www.betterjtv.com/p/stat.php?"+Math.random();
var betterjtv_head = document.getElementsByTagName("head")[0];
if(betterjtv_head) betterjtv_head.appendChild(betterjtv_stat);
*/

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
		Util.attemptModule('justin/add_pro_midnight_mode');
	}
}
if(env.has_chat && !env.is_twitch) {

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
		Util.attemptModule('chat/resize');
		Util.attemptModule('chat/moderator');
		Util.attemptModule('chat/emotes');
		Util.attemptModule('chat/settings');
	}
}
