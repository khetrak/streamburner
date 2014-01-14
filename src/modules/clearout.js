module.exports = function() {
	var removefooter = !(!$('#live_site_player_flash'));

	var clearlist = [
		// Header
//		"#header_site_search",
		".managed_ad",
		"#FrontPageMedRectv2",
		"#fp_ad",
		"#ad",
		".ad_300x250",
		"#FPTakeoverHeaderv2",
		"#FPTakeoverHeaderv2_holder",
		"#FPTakeoverSkinv2_holder",
		"#FPTakeoverHeaderV3_holder",
		"#psAdsUrlGetter",
		"#ad_iframe",
		".a300",
		"#adDiv",
		".fp_ad",
		
		// Footer
		"#footer_search",
		"#footer_columns_container",
//		".meebo-215", // m_ad
		".footer_ad",
		".bottom-leaderboard-adslot",
		"#ad_holder",
		
		// iPhone Ads
		"#frontpage_takeover_banner",
		"#iphone_banner",
		'#iphone_banner_in',
		
		// Front page
		"#things_todo",
		"#fp-categories",
		"#portal_headlines",
		"#search_tags",
		".fp-section_desc",
		".frontpage-right-ad-hide",
		".frontpage-banner",
		".frontpage-header-ad",
		".advertisement",
		
		// Home
//		".home_search",
		".home_action_separator",
		"#home_actions_less",
		"#home-new_gifts",
//		"#home_fans",
		"#callout",
		".frontpage-social-block",
		
		"#advanced_callout", // advanced broadcast options on top of homepage
		"#go_pro_link",
		"#HomePageMedRect_holder", // under gopro
		
		// Directory
		"#producer_spotlight_holder",
		"#app_spotlight",
		".directory-title",
		".directory-player",
		
		// Channels
		 // Header
		"#next_live_channel",
		"#admin_nxtchan",
		"#channel_header",
		"#broadcast_banner",
		 // Related Channels
//		"#related",
		".details .apps", // "watch on ipad, iphone, etc"
		
		// Old Channels
		 // Left Side Containers
		"#dvr",
		"#channel_lists",
		 // Channel Info Cleanup
		".firstcolor_header",
		".channel_info",
		 // Right Side Containers
		"#channel_schedule_container",
		"#top_fans_container",
		
		// Gifts
		"#channel_gifts_container",
		"#chat_gifts",
		"#fp-new_gifts",
		".hint"
	];

	$.each(clearlist, function(k,search) {
		if(search == '') return;
		if(search == "footer_columns_container" && !removefooter) return;
		$(search).remove();
	});
	
	$('#header_site_search').hide();
	
	$('#taboola-div').parent('.channel-section').next('.spacer-transparent').remove();
	$('#taboola-div').parent('.channel-section').remove();

	// eat front page takeover
	bdebug.log("Checking for takeover");
	var $skin = $('#mantle_skin');
	if($skin.length) {
		$(skin).css({
			'background-image': 'none',
			'background-color': 'transparent'
		});
	}
};
