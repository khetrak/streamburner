module.exports = function() {
	if(!window.CurrentChat) {
		bdebug.log("Chat not present -- aborting");
		return;
	}

	bdebug.log("-timestamps");
	if(!CurrentChat.show_timestamps && CurrentChat.toggle_show_timestamps) {
		if(typeof toggle_checkbox != "undefined") {
			toggle_checkbox("toggle_chat_timestamps");
		}
		CurrentChat.toggle_show_timestamps();
	}
	
	bdebug.log("-icons");
	if(CurrentChat.set_mod_icons_visible)
		CurrentChat.set_mod_icons_visible(true);

	bdebug.log("-links");
	PP.channel_hide_chat_links = false;
/*
	var checkbox = $('#mod_icons');
	if(checkbox) checkbox = checkbox.parentNode;
	if(checkbox) checkbox.remove();
*/
/*
	bdebug.log("-menu");
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
	bdebug.log("-lines");
	var insert_chat_line_old = Chat.prototype.insert_chat_line;
	Chat.prototype.insert_chat_line=function(info)
	{
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

		return insert_chat_line_old.call(this,info);
	}

	bdebug.log("-emotes");


	bdebug.log("-clear_chat");
	function onClear(info) {
		if (info.target == "all") {
			CurrentChat.admin_message("Chat was cleared by a moderator (prevented by BetterJTV)");
		} else if (info.target == "user") {
			var nickname = CurrentChat.real_username(info.user);
			$('#chat_line_list .chat_from_' + info.user.replace(/%/g, '_').replace(/[<>,]/g, '')).css('color','#999');
			CurrentChat.admin_message(nickname+" has been timed out");
		}
	}
	if(is_twitch) {
		TMI.off('clear_chat');
		TMI.on('clear_chat', function(e,info) { onClear(info); });
	} else {
		CurrentChat.handlers.clear_chat = function(info) { onClear(info); };
	}

// move settings back up since the ad is gone
	bdebug.log("-move_settings");
	var settingsbox = document.getElementById("chat_settings_dropmenu");
	if(settingsbox)
		settingsbox.style.top = "auto";
}
