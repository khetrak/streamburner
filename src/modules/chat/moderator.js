var logger = require('../../logger'),
	Util = require('../../util'),
	$ = require('../../jquery'),
	env = require('../../env');

module.exports = function() {
	env.on('chat_load',inject);
}

function inject(mode) {
	if(mode === 'legacy') {
		Util.attempt('timestamps',function() {
			if(!CurrentChat.show_timestamps && CurrentChat.toggle_show_timestamps) {
				if(typeof toggle_checkbox != "undefined") {
					toggle_checkbox("toggle_chat_timestamps");
				}
				CurrentChat.toggle_show_timestamps();
			}
		});

		Util.attempt('mod_icons',function() {
			if(CurrentChat.set_mod_icons_visible)
				CurrentChat.set_mod_icons_visible(true);
		});
	}

	Util.attempt('unhide_links',function() {
		if(mode === 'ember') {
			//var linkify_old = Chat.prototype.linkify;
			//Chat.prototype.linkify = function() {
			//	CurrentChat.channel_hide_chat_links = false;
			//	return linkify_old.apply(this,arguments);
			//}
		}
		if(mode === 'legacy') {
			PP.channel_hide_chat_links = false;
		}
	});

	Util.attempt('modify_lines',function() {
		if(mode === 'legacy') {
			Util.injectChat('insert_chat_line', function(old,args) {
				var info = args[0];
				if(info.tagtype == "broadcaster") info.tagname = "Host";
				if(info.tagtype == "admin") { info.tagtype=null; info.tagname=null; }
				if(info.tagtype == "greeter") { info.tagtype=null; info.tagname=null; }
				if(info.nickname == "tia_marie") { info.tagtype="staff"; info.tagname = "&lt;3 TIA!"; }
				if(info.nickname == "wbot") { info.tagtype="bot"; info.tagname = "Bot"; }
				info.pro = false;
				info.image_url = "";
				if(info.chat_type == "twitter") info.nickname = "TW-"+info.nickname;
				if(info.chat_type == "facebook") info.nickname = "FB-"+info.nickname;
				if(info.chat_type == "myspace") info.nickname = "MS-"+info.nickname;

				return old.apply(this,args);
			});
		}
	});

	Util.attempt('prevent_clear',function() {
		if(mode === 'ember') {
			window.App.Room.prototype._sbClearMessages = window.App.Room.prototype.clearMessages;
			Util.inject(window.App.Room.prototype,'clearMessages',function(old,args) {
				var from = args[0]
				if(from) {
					//this.get("messages").forEach(function (n, r) {
					//	if(n.from === from) this.set("messages." + r + ".deleted", !0);
					//});
				} else {
					this.addTmiMessage("Chat was cleared by a moderator (Prevented by StreamBurner)");
				}
			});
		}
		if(mode === 'legacy') {
			function onClear(info) {
				if (info.target == "all") {
					CurrentChat.admin_message("Chat was cleared by a moderator<br/>(prevented by StreamBurner)");
				} else if (info.target == "user") {
					var nickname = CurrentChat.real_username(info.user);
					$('#chat_line_list .chat_from_' + info.user.replace(/%/g, '_').replace(/[<>,]/g, '')).css('opacity','0.5');
					CurrentChat.admin_message(nickname+" has been timed out");
				}
			}
			if(env.is_twitch) {
				TMI.off('clear_chat');
				TMI.on('clear_chat', function(e,info) { onClear(info); });
			} else {
				CurrentChat.handlers.clear_chat = function(info) { onClear(info); };
			}
		}
	});
}
