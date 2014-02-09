var logger = require('../../logger'),
	env = require('../../env'),
	Util = require('../../util');

var smile_base = 'https://run.streamburner.net/emotes/';
var smile_list = [
	[[':trollface:',':tf:'],'trollface'],
	['D:','aww'],
	[':D','awesome'],
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
			split[i] = '___sb_emote_'+map[split[i]]+'___';
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
		if(env.is_twitch)
			message = Util.replaceAll(message, '___sb_emote_'+i+'___', '<img style="margin: -5px 0;" src="'+url+'">');
		else
			message = Util.replaceAll(message, '___sb_emote_'+i+'___', '<img style="max-width: 22px; max-height: 22px;" src="'+url+'">');
	}
	return message;
}

module.exports = function(core) {
	Util.injectChat('emoticonize', function(old,args) {
		var str = args[0];
		var msg = smilize_pre(str);
		args[0] = msg;
		msg = old.apply(this,args);
		msg = smilize_post(msg);
		return msg;
	});
}
