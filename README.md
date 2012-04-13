Page speed for node + express, move your javascript, set headers, etc.

To install;

    $ npm install pagespeed

To use:

    var pagespeed = require('pagespeed');
    app.configure( function( ) {
      ...
      app.use( pagespeed.middleware( { debug: true } ));
      ...

Continuous integration: <a href="http://travis-ci.org/pauly/pagespeed"><img src="https://secure.travis-ci.org/pauly/pagespeed.png" alt="Build Status"></a>
