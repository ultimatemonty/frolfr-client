/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
	var app = new EmberApp(defaults, {
		fingerprint: {
			prepend: "http://s3.amazonaws.com/frolfr-assets/"
		}
	});

	var pickFiles = require('broccoli-static-compiler');

	app.import('bower_components/moment/moment.js');
	app.import('bower_components/jquery-cookie/jquery.cookie.js');
	app.import('bower_components/typeahead.js/dist/typeahead.jquery.js');
	app.import('bower_components/highcharts/highcharts.js');
	app.import('bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js');
	app.import('bower_components/components-font-awesome/css/font-awesome.css');
	app.import('bower_components/ember-uploader/dist/ember-uploader.js');
	app.import('bower_components/floatThead/dist/jquery.floatThead.js');


	var fontAwesome = pickFiles('bower_components/components-font-awesome/fonts', {
	    srcDir: '/',
	    destDir: '/fonts'
	});

	return app.toTree([fontAwesome]);
};
