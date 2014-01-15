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
	Util.attemptModule('over18_bypass');
	Util.attemptModule('reduce_title');
	Util.attemptModule('firefox_update');
	if(!env.is_twitch) {
		Util.attemptModule('justin/pretty_directory');
		Util.attemptModule('justin/add_pro_midnight_mode');
	}
}
if(env.has_chat) {
	Util.attemptModule('chat/resize');
	Util.attemptModule('chat/moderator');
	Util.attemptModule('chat/emotes');
}

setTimeout(function() {
	logger.log("CALL delayed");
	if(env.has_body) {
		Util.attemptModule('clearout');
		Util.attemptModule('pro_upgrader');
	}
	if(env.has_chat && !env.is_twitch) {
		Util.attemptModule('chat/settings');
	}
},1000);
