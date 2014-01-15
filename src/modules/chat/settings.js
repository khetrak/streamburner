var $ = require('../../jquery');

module.exports = function() {
	var $settingsmenu = $(".dmactions");
	if(!$settingsmenu.length) return;
	
	$settingsmenu.css('height','auto');

	var $div = $("<div/>").html('\
		<p class="chat_option" id="bjtv_clear" style="cursor: pointer"> \
			<span>Clear My Chat</span> \
		</p> \
	').appendTo($settingsmenu);

	$div.find('#bjtv_clear').click(function() {
		$('#chat_line_list').html('');
		CurrentChat.admin_message("You cleared your own chat (BetterJTV)");
	});

}
