var $ = require('../jquery');

module.exports = function() {
	var $inputs = $('input');
	$inputs.each(function(k,input) {
		if(input.value == "I am 18 or older") {
			input.click();
			return false;
		}
	});

	var button = $('#roadblock_button');
	if(button) button.click();
}
