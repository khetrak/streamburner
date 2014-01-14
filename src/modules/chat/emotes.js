var smile_base = 'http://run.betterjtv.com/emotes/';
var smile_list = [
	[[':trollface:',':tf:'],'trollface'],
	['D:','aww'],
	[':D','mw.jpg'],
	[';(','cry'],
	['(puke)','puke'],
	['(mooning)','mooning'],
	['(poolparty)','poolparty']
];
function regexQuote(str)
{
	return (str+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
}
function smilize_pre(message)
{
	var map = {};
	for(var i = 0; i < smile_list.length; i++) {
		var text = smile_list[i][0];
		if(!(text instanceof Array)) text = [text];
		for(var j = 0; j < text.length; j++) {
			map[text[j]] = i;
		}
	}
	
	var split = message.split(' ');
	for(var i = 0; i < split.length; i++) {
		if(map.hasOwnProperty(split[i]))
			split[i] = '___bjtv_emote_'+map[split[i]]+'___';
	}
	message = split.join(' ');
	return message;
}
function smilize_post(message)
{
	for(var i = 0; i < smile_list.length; i++) {
		var filename = smile_list[i][1];
		if(filename.indexOf('.') == -1) filename = filename+'.png';
		var url = smile_base+filename;
		message = replaceAll(message, '___bjtv_emote_'+i+'___', '<img src="'+url+'">');
	}
	return message;
}

module.exports = function() {
	var emoticonize_old = Chat.prototype.emoticonize;
	Chat.prototype.emoticonize = function(msg) {
	//		msg = replaceAll(msg, "<wbr />", "");
		msg = smilize_pre(msg);
		msg = emoticonize_old.call(this,msg);
		msg = smilize_post(msg);
	//		msg = "<span style=\"word-wrap: break-word;\">"+msg+"</span>";
	//		bdebug.log(msg);
	//		if(is_twitch) {
	//			msg = msg.replace(/<span class="emo-([a-z0-9]*)"><\/span>/g, "<img src=\"http://www-cdn.jtvnw.net/images/emoticons/$1.gif\"/>");
	//		}
		return msg;
	}
}
