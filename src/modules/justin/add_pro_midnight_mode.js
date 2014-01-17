var $ = require('../../jquery'),
	env = require('../../env'),
	logger = require('../../logger');

module.exports = function() {
	var $optUl = $('.player-options > ul').first();
	if(!$optUl.length) return;

	var $search = $('#toggle_midnight_mode');
	if($search.length) return;

	var $newLi = $('\
              <li >\
                <img class="option-icon midnight-mode-icon" src="http://www-cdn.jtvnw.net/static/images/channel/sun_icon_white.png" style="display:none" />\
                <img class="option-icon daytime-mode-icon" src="http://www-cdn.jtvnw.net/static/images/channel/moon_icon.png" style="display:block" />\
                <a id="toggle_midnight_mode" >\
                  <input type="hidden" value="False" id="midnight_mode_val" />\
                  <span id="floaty_text_admin">Midnight Mode</span>\
                </a>\
              </li>\
	');
	$newLi.find('#toggle_midnight_mode').click(function(e) {
		e.preventDefault();
		toggleMidnightMode();
	});
	$optUl.append($newLi);
}

// Copied from justin.tv source
var midnightMode = false;
var j = $;
function toggleMidnightMode() {
	midnightMode = !midnightMode;
	if (midnightMode) {
		// StreamBurner -- ALWAYS make background dark, even if there's an image
		//if (j('body').css('background-image') == 'none') {
			j('body').addClass('midnight_mode_body');
			j('body').css('background-image','none');
		//}
		j('.channel-description, .channel-section, .chat_column, .chat_text_inverse, .dropmenu_links_container, .player-options li').addClass('midnight_mode_containers');
		j('.dropmenu_links_container').addClass('midnight_mode_container_border');
		j('li.fromjtv, #chat_text_input, .channel_status').addClass('midnight_mode_wrapper');
		j('li.jtv .nick').each(function () {
			if (j(this).data('color') == 'black') {
				j(this).css('color', 'white');
				j(this).data('color', 'white');
			}
		});
		j('#chat_lines').addClass('midnight_mode_chat');
		j('#views_tab, #player-settings, .channel_status').addClass('midnight_mode_borderless');
		j('.player-options li a, h3.chan_sect_title').addClass('midnight_mode_text');
		j('#player-settings, #customize_live_embed').addClass('midnight_mode_gear');
		j('#report_form_wrapper .form_header, #report_form_wrapper .message, #report_form_wrapper .form_description, #report_form_wrapper .form_label, #report_form_wrapper .form_subtext').addClass('midnight_mode_text');
		j('.channel-category .orig_img').hide();
		j('.channel-category .midnight_mode_img').css('display', 'inline');
		j('.categories .arrow').addClass('midnight_mode_arrow');
		j('.categories .featured-plus').addClass('midnight_mode_plus');
		j('.categories .featured').addClass('midnight_mode_featured');
		j('#midnight_mode_val').val('True');
		j('#toggle_midnight_mode span').text('Daytime Mode');
		j('.daytime-mode-icon').hide();
		j('.midnight-mode-icon').show();
		j('.chat_bar_button').addClass('midnight_mode_chat_options');
		j('.dmoptions, .dmactions').addClass('midnight_mode_chat_settings');
		j('.chat_option span, .chat_timestampdiv label, h3.dropmenu_section_title, #chat_section_moderation label').addClass('midnight_mode_text');
		j('.chat_actions_orig').hide();
		j('.chat_actions_midnight').show();
		j('#cbchat .cbicon').addClass('midnight_mode_chat_icon');
		j('#cbtools .cbicon').addClass('midnight_mode_chat_tools');
		j('#cbviewers .cbicon').addClass('midnight_mode_chat_viewers');
		j('#chat_viewers_dropmenu .viewer_list li').addClass('midnight_mode_viewers_list');
		j('#chat_viewers_dropmenu .viewer_list li a').addClass('midnight_mode_viewers_username');
		j('#chat_viewers_dropmenu .drag_handle').addClass('midnight_mode_drag_handle');
		j('.player-options').hide();
		j("#about_me_container").contents().find('.ugc_html').addClass('midnight_mode_containers');
	} else {
		// StreamBurner -- Disable background image removal
		j('body').css('background-image','');
		j('body').removeClass('midnight_mode_body');
		j('.channel-description, .channel-section, .chat_column, .chat_text_inverse, .dropmenu_links_container, .player-options li').removeClass('midnight_mode_containers');
		j('.dropmenu_links_container').removeClass('midnight_mode_container_border');
		j('li.fromjtv, #chat_text_input, .channel_status').removeClass('midnight_mode_wrapper');
		j('li.jtv .nick').each(function () {
			if (j(this).data('color') == 'white') {
				j(this).css('color', 'black');
				j(this).data('color', 'black');
			}
		});
		j('#chat_lines').removeClass('midnight_mode_chat');
		j('#views_tab, #player-settings, .channel_status').removeClass('midnight_mode_borderless');
		j('.player-options li a, h3.chan_sect_title').removeClass('midnight_mode_text');
		j('#player-settings, #customize_live_embed').removeClass('midnight_mode_gear');
		j('#report_form_wrapper .form_header, #report_form_wrapper .message, #report_form_wrapper .form_description, #report_form_wrapper .form_label, #report_form_wrapper .form_subtext').removeClass('midnight_mode_text');
		j('.channel-category .orig_img').css('display', 'inline');
		j('.channel-category .midnight_mode_img').hide();
		j('.categories .arrow').removeClass('midnight_mode_arrow');
		j('.categories .featured-plus').removeClass('midnight_mode_plus');
		j('.categories .featured').removeClass('midnight_mode_featured');
		j('#midnight_mode_val').val('False');
		j('#toggle_midnight_mode span').text('Midnight Mode');
		j('.daytime-mode-icon').show();
		j('.midnight-mode-icon').hide();
		j('.chat_bar_button').removeClass('midnight_mode_chat_options');
		j('.dmoptions, .dmactions').removeClass('midnight_mode_chat_settings');
		j('.chat_option span, .chat_timestampdiv label, h3.dropmenu_section_title, #chat_section_moderation label').removeClass('midnight_mode_text');
		j('.chat_actions_orig').show();
		j('.chat_actions_midnight').hide();
		j('#cbchat .cbicon').removeClass('midnight_mode_chat_icon');
		j('#cbtools .cbicon').removeClass('midnight_mode_chat_tools');
		j('#cbviewers .cbicon').removeClass('midnight_mode_chat_viewers');
		j('#chat_viewers_dropmenu .viewer_list li').removeClass('midnight_mode_viewers_list');
		j('#chat_viewers_dropmenu .viewer_list li a').removeClass('midnight_mode_viewers_username');
		j('#chat_viewers_dropmenu .drag_handle').removeClass('midnight_mode_drag_handle');
		j('.player-options').hide();
		j("#about_me_container").contents().find('.ugc_html').removeClass('midnight_mode_containers');
	}
}




