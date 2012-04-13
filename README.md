Page speed for node + express, move your javascript, set headers, etc.

To install;

    $ nmp install pagespeed

To use:

  var pagespeed = require('pagespeed');
  app.configure( function( ) {
    app.use( pagespeed( { debug: false, no_strip: false } ));

