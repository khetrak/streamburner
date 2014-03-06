var logger = require('../../logger'),
	env = require('../../env'),
	Util = require('../../util');

var smile_base = 'https://run.streamburner.net/emotes/';
var smile_list = [
	['sbTroll','trollface'],
	[/D\:/g,'aww'],
	[/\:D/g,'awesome'],
	[/;\(/g,'cry'],
	['sbPuke','puke'],
	['sbMoon','mooning'],
	['sbPool','poolparty']
];
function regexQuote(str)
{
	return (str+'').replace(/([.?*+^$[\]\\(){}|\-\:])/g, "\\$1");
}







function injectOld() {

	if(typeof window.CurrentChat === 'undefined')
		throw new Error();

	function smilize_pre(message)
	{
		var map = {};
		for(var i = 0; i < smile_list.length; i++) {
			var text = smile_list[i][0];
			if(!(text instanceof Array)) text = [text];
			for(var j = 0; j < text.length; j++) {
				var regex = text[j];
				if(!(regex instanceof RegExp)) regex = new RegExp('\\b'+regexQuote(regex)+'\\b', 'g');
				message = message.replace(regex,'___sb_emote_'+i+'___');
			}
		}
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

	Util.injectChat('emoticonize', function(old,args) {
		var str = args[0];
		var msg = smilize_pre(str);
		args[0] = msg;
		msg = old.apply(this,args);
		msg = smilize_post(msg);
		return msg;
	});
}

function injectNew() {
	var emoticonsController = window.App.__container__.lookup('controller:emoticons');
	var emoteSets = emoticonsController.emoticonSets;
	var defaultSet = emoteSets['default'];
	if(!defaultSet) throw new Error('Default emote set not loaded');
	
	var style = '';

	for(var i = 0; i < smile_list.length; i++) {
		var text = smile_list[i][0];
		var url = smile_base+smile_list[i][1]+'.png';
		var classname = 'emo-sb-'+i;
		style += '.'+classname+' { background-image: url('+url+'); height: 28px; width: 28px; margin: -5px 0; } ';

		if(!(text instanceof Array)) text = [text];
		for(var j = 0; j < text.length; j++) {
			var regex = text[j];
			if(!(regex instanceof RegExp)) regex = new RegExp('\\b'+regexQuote(regex)+'\\b', 'g');

			defaultSet.push({
				cls: classname,
				isEmoticon: true,
				regex: regex
			});
		}
	}

	$('<style type="text/css">').text(style).appendTo("head");
	logger.log('Emoticons injected with new method');
}

function inject() {
	try { return injectOld(); } catch(e) {}
	try { return injectNew(); } catch(e) {}

	logger.log('Waiting...');
	setTimeout(inject,500);
}

module.exports = inject;
