var $ = require('../jquery');

module.exports = function() {
	var $inputs = $('input');
	$inputs.each(function(k,input) {
		if(input.name == 'over_18' && input.value == "Continue Anyway") {
			input.click();
			return false;
		}
	});

	var button = $('#roadblock_button');
	if(button) button.click();
}
