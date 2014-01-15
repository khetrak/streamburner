var logger = require('./logger'),
	Util = require('./util'),
	$ = require('./jquery'),
	env = require('./env');

console.log('jQuery',$);

env.is_twitch = false;
env.has_chat = false;
env.has_body = false;

logger.log("CALL init");
var loc = document.URL.toLowerCase();
if(loc.indexOf("meebo.html") != -1) {
	logger.log("BetterJTV Load Aborted - Meebo Frame");
	return;
}

env.is_twitch = false;
if(loc.match("^http:\/\/[^\/]*twitch\.tv\/")) {
	env.is_twitch = true;
	logger.log("Detected Twitch.TV");
}

env.has_chat = false;
if($("#chat_lines").length) {
	env.has_chat = true;
	logger.log("Detected chat");
}

env.has_body = true;
if(loc.indexOf("/chat/embed") != -1) {
	env.has_body = false;
	logger.log("Detected missing body");
}

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
	if(!env.is_twitch) Util.attemptModule('pretty_directory');
}
if(env.has_chat) {
	Util.attemptModule('chat/resize');
	Util.attemptModule('chat/moderater');
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
