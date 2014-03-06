var logger = require('./logger');

// detects the running environment
// loads before jQuery is available

var Env = function() {
	this.is_twitch = false;
	this.has_chat = false;
	this.has_body = false;
}
Env.prototype.detect = function() {
	var loc = document.URL.toLowerCase();
	logger.log("Detecting environment",loc);
	if(loc.indexOf("meebo.html") != -1) {
		logger.log("Load Aborted - Meebo Frame");
		return false;
	}
	if(loc.indexOf("receiver.html") != -1) {
		logger.log("Load Aborted - Receiver Frame");
		return false;
	}
	if(loc.match(/\/about$/)) {
		logger.log("Load Aborted - About Frame");
		return false;
	}

	this.is_twitch = false;
	if(loc.match("^http:\/\/[^\/]*twitch\.tv\/")) {
		this.is_twitch = true;
		logger.log("Detected Twitch.TV");
	}

	this.has_body = true;
	if(loc.indexOf("/chat/embed") != -1) {
		this.has_body = false;
		logger.log("Detected missing body");
	}

	return true;
}
Env.prototype.detectOnReady = function() {
	logger.log("Detecting environment on ready");
	if(!window.jQuery) {
		logger.log("Load Aborted - jQuery isn't here, so this page probably isn't content");
		return false;
	}

	var $ = require('./jquery');

	this.has_chat = false;
	logger.log($('#chat_lines,.chat-messages'));
	if($('#chat_lines,.chat-messages').length) {
		this.has_chat = true;
		logger.log("Detected chat");
	}
	
	return true;
}

module.exports = new Env();
