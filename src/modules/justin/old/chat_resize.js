var $ = require('../../jquery'),
	env = require('../../env'),
	Util = require('../../util');

module.exports = function() {
	if(!env.is_twitch) {
		var height = 400;
		var width = 390;

		var hooks = Util.bhook({
			wrapper: '.wrapper',
			chat_column: '.chat_column',

			chat_bar: '#chat_bar',
			chat_title: '#cbtchat',
		});

		hooks['wrapper'].style.width="1140px";
		hooks['chat_column'].style.width="400px";
		
		hooks['chat_bar'].style.width="400px";
		hooks['chat_title'].style.width="236px";

		$('.jtv_chat_wrapper,#jtv_chat').css({
			height: height+'px',
			width: width+'px'
		});
		$('#chat_lines').css({
			height: (height-48)+'px',
			width: width+'px'
		});
		$('#chat_shim').css('margin-top', (height-11)+'px');
		$('#chat_text_input').css('width','100%');
		$('#speak').css('right','0');
	}
}
