module.exports = function() {
	if(is_twitch) {
		if(has_body) {
			var chatboxheight = 550;

			var hooks = bhook({
				chat_lines: '#chat_lines',
				chat_column: '#chat_column',
				main: '.main',
				wrapper: '.wrapper'
			});
			
			var has_header = !!$('#header_banner');

			hooks['chat_lines'].style.height="430px";
			hooks['chat_lines'].style.maxHeight="";
			hooks['chat_lines'].style.marginTop = has_header ? "130px" : "-12px";
			hooks['chat_column'].style.width="400px";
			hooks['main'].style.width="1080px";
			hooks['wrapper'].style.width='auto';
		}

		var hooks = bhook({
			chat_line_list: '#chat_line_list',
		});

		hooks['chat_line_list'].style.width="auto";
	} else {
		var height = 400;
		var width = 390;

		var hooks = bhook({
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
