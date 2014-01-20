var logger = require('../logger'),
	$ = require('../jquery');

module.exports = function() {
	console.log("jQuery",$);
	var clearlist = [
		// Obvious Advertising
		".managed_ad",
		"#fp_ad",
		"#ad",
		".ad_300x250",
		"#FPTakeoverHeaderv2",
		"#FPTakeoverHeaderv2_holder",
		"#FPTakeoverSkinv2_holder",
		"#FPTakeoverHeaderV3_holder",
		"#psAdsUrlGetter",
		"#ad_iframe",
		"#FrontPageMedRectv2",
		".a300",
		"#adDiv",
		".fp_ad",
		".directory-house-ad",
		".footer_ad",
		".bottom-leaderboard-adslot",
		"#ad_holder",
		".frontpage-right-ad-hide",
		".frontpage-header-ad",
		".advertisement",
		".directory-left-ad",
		".frontpage-right-ad",
		".dashboard-house-ad",
		".directory-pro-banner-wrapper",
		".advertisement",
		
		// Used for advertising at some point
		".iphone_banner", // google ads at top of directory page

		// Front page
		".frontpage-banner", // GIANT MAIN banner that pretty much just shows ads
		".frontpage-social-block", // facebook and twitter buttons
		
		// Directory
		".directory-title", // part 1 of "featured video" in directory
		".directory-player", // part 2

		// Channels
		".details .apps", // "watch on ipad, iphone, etc"
		".channel_status_tabs #api_tab", // facebook and twitter share buttons
	];

	$.each(clearlist, function(k,search) {
		if(search == '') return;
		$(search).remove();
	});
	
	$('#header_site_search').hide();
	
	$('#taboola-div').parent('.channel-section').next('.spacer-transparent').remove();
	$('#taboola-div').parent('.channel-section').remove();

	// eat front page takeover
	logger.log("Checking for takeover");
	var $skin = $('#mantle_skin');
	if($skin.length) {
		$skin.css({
			'background-image': 'none',
			'background-color': 'transparent'
		});
	}
};
