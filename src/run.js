var logger = require('./logger'),
	Util = require('./util');

var is_twitch = false;
var has_chat = false;
var has_body = false;

bdebug.log("CALL init");
var loc = document.URL.toLowerCase();
if(loc.indexOf("meebo.html") != -1) {
	bdebug.log("BetterJTV Load Aborted - Meebo Frame");
	return;
}

is_twitch = false;
if(loc.match("^http:\/\/[^\/]*twitch\.tv\/")) {
	is_twitch = true;
	bdebug.log("Detected Twitch.TV");
}

has_chat = false;
if(document.getElementById("chat_lines")) {
	has_chat = true;
	bdebug.log("Detected chat");
}

has_body = true;
if(loc.indexOf("/chat/embed") != -1) {
	has_body = false;
	bdebug.log("Detected missing body");
}

/*
var betterjtv_stat = document.createElement('script');
betterjtv_stat.type = 'text/javascript';
betterjtv_stat.src = "http://www.betterjtv.com/p/stat.php?"+Math.random();
var betterjtv_head = document.getElementsByTagName("head")[0];
if(betterjtv_head) betterjtv_head.appendChild(betterjtv_stat);
*/

if(has_body) {
	Util.attemptModule('clearout');
	Util.attemptModule('brand');
	Util.attemptModule('pro_upgrader');
	Util.attemptModule('over18_bypass');
	Util.attemptModule('reduce_title');
	Util.attemptModule('firefox_update');
	if(!is_twitch) Util.attemptModule('pretty_directory');
}
if(has_chat) {
	Util.attemptModule('chat/resize');
	Util.attemptModule('chat/moderater');
	Util.attemptModule('chat/emotes');
}

setTimeout(function() {
	bdebug.log("CALL delayed");
	if(has_body) {
		Util.attemptModule('clearout');
		Util.attemptModule('pro_upgrader');
	}
	if(has_chat && !is_twitch) {
		Util.attemptModule('chat/settings');
	}
},1000);
