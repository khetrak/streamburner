var logger = require('./logger');

// detects the running environment
// loads before jQuery is available

var Env = function() {
	this.is_twitch = false;
	this.has_body = false;
	this.callbacks = {};
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
	return true;
}
Env.prototype.startLoop = function() {
	var $ = require('./jquery');

	var self = this;
	function detectChat() {
		var mode = '';
		if($('.ember-chat').length) {
			mode = 'ember';
		} else if($('#chat_lines').length) {
			mode = 'legacy';
		}
		
		if(!mode) {
			setTimeout(detectChat,500);
		} else {
			logger.log("Detected chat mode loaded: "+mode);
			self.emit('chat_load',mode);
		}
	}
	detectChat();
}
Env.prototype.on = function(type,func) {
	if(!(type in this.callbacks)) this.callbacks[type] = [];
	this.callbacks[type].push(func);
}
Env.prototype.emit = function(type) {
	if(!(type in this.callbacks)) return;
	var args = Array.prototype.slice.call(arguments);
	args.shift();
	for(var i = 0; i < this.callbacks[type].length; i++) {
		this.callbacks[type][i].apply(undefined,args);
	}
}

module.exports = new Env();
