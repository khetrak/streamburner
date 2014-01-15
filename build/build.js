var browserify = require('browserify'),
	UglifyJS = require('uglify-js'),
	path = require('path'),
	fs = require('fs');

var base = path.normalize(__dirname+'/..');

var b = browserify();
b.add(base+'/src/index.js');
b.bundle(function(e,src) {
	if(e) {
		console.error(e);
		return;
	}

	var toplevel = UglifyJS.parse(src);
	toplevel.figure_out_scope();
	var compressor = UglifyJS.Compressor();
	var compressed_ast = toplevel.transform(compressor);
	compressed_ast.figure_out_scope();
	compressed_ast.compute_char_frequency();
	compressed_ast.mangle_names();
	var compressed = compressed_ast.print_to_string();
	
	var license = '/*! StreamBurner | (c) 2014 StreamBurner Contributors | MIT License */\n';
	src = license+src;
	compressed = license+compressed;

	try {
		fs.mkdirSync(base+'/dist');
	} catch(e) {}
	fs.writeFileSync(base+'/dist/streamburner.js',src);
	console.log('Written to '+base+'/dist/streamburner.js');
	fs.writeFileSync(base+'/dist/streamburner.min.js',compressed);
	console.log('Written to '+base+'/dist/streamburner.min.js');
});
