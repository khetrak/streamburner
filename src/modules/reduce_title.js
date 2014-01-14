module.exports = function() {
	if(!is_twitch) return;
	
	var title = $('#broadcast_title');
	if(!title) return;
	
	title.style.fontSize = '16px';
	title.style.fontWeight = 'normal';
	title.style.whiteSpace = 'nowrap';
	title.style.textOverflow = 'ellipsis';
	title.style.overflow = 'hidden';
}
