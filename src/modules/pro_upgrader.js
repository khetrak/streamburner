module.exports = function() {
	// tweak globals
	if(typeof PP != "undefined") {
		PP['is_pro'] = true;
		PP['turbo'] = true;
		PP['turbo_exempt'] = false;
		PP['active_channel_subscriber'] = true;
		PP.pro_account_activated = true;
	}
	
	// potential ad completion call?
	if(typeof iab_rma_video_complete == "function") {
		iab_rma_video_complete();
	}
	
	// replace jtv embed with pro version
	var $player = $('#live_site_player_flash, #live_frontpage_player_flash');
	$player.each(function() {
		var $fv = $(this).find('[name=flashvars]');
		var oldval = $fv.val();
		var newval = oldval.replace("&pro=false","&pro=true");
		if(newval.indexOf('&pro=true') == -1) newval += '&pro=true';
		if(oldval != newval) {
			bdebug.log("Updating player flashvars to",newval);
			$fv.val(newval);
			var $parent = $(this).parent();
			$(this).remove().appendTo($parent);
		}
	});
	
	// Nope.
	try {
		Twitch.storage.set("adblock_enabled", false, {storage: 'sessionStorage'});
	} catch(e) {}
	
	// Make twitch think ads are disabled
	try {
		Twitch.ads.enabled = function() { return false; }
		Twitch.ads.ready = function() {}
	} catch(e) {}

	// fix twitch chat offset due to advertisement
	$('#right_col').css('top','0');
	
	// remove twitch tracking
	try {
		Twitch.tracking.sendComscoreBeacon =
		Twitch.tracking.sendComscoreBeacons =
		Twitch.tracking.mixpanel.track_with_swf = function() {};
	} catch(e) {}
}
