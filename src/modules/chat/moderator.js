var logger = require('../../logger'),
	Util = require('../../util'),
	$ = require('../../jquery'),
	env = require('../../env');

module.exports = function() {
	if(!window.CurrentChat) {
		logger.log("Chat not present -- aborting");
		return;
	}

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

	Util.attempt('unhide_links',function() {
		if(env.is_twitch) {
			var linkify_old = Chat.prototype.linkify;
			Chat.prototype.linkify = function() {
				CurrentChat.channel_hide_chat_links = false;
				return linkify_old.apply(this,arguments);
			}
		} else {
			PP.channel_hide_chat_links = false;
		}
	});

/*
	var checkbox = $('#mod_icons');
	if(checkbox) checkbox = checkbox.parentNode;
	if(checkbox) checkbox.remove();
*/
/*
	logger.log("-menu");
	if(typeof toggle_chat_settings_menu != "undefined") {
		// twitch doesn't have this menu
		toggle_chat_settings_menu2=toggle_chat_settings_menu;
		toggle_chat_settings_menu=function() {
			{
				if(CurrentChat && CurrentChat.show_timestamps) {
					var checkbox = $('#toggle_chat_timestamps');
					if(checkbox) checkbox.checked=true;
				}
			}
			{
				var checkbox = $('#mod_icons');
				if(checkbox) checkbox.checked = 
					($('#chat_lines').className.indexOf("nobuttons") == -1);
			}

			toggle_chat_settings_menu2();
		}
	}
*/

	Util.attempt('modify_lines',function() {
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
	});

	Util.attempt('prevent_clear',function() {
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
	});
}
