var logger = require('../../logger'),
	env = require('../../env'),
	Util = require('../../util');

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
		message = Util.replaceAll(message, '___bjtv_emote_'+i+'___', '<img src="'+url+'">');
	}
	return message;
}

module.exports = function() {
	var emoticonize_old = Chat.prototype.emoticonize;
	Chat.prototype.emoticonize = function(orig) {
		try {
			var msg = smilize_pre(orig);
			msg = emoticonize_old.call(this,msg);
			msg = smilize_post(msg);
			return msg;
		} catch(e) {
			logger.error('Emoticonize exception',e.stack);
		}
		return emoticonize_old.call(this,orig);
	}
}
