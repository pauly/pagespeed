var should = require( 'should' );
var pagespeed = require( '../lib/main' );
describe( 'pagespeed', function( ) {

  describe( 'css to head', function( ) {

    it( 'does not change the output if there is no css', function( ) {
      var result = pagespeed.css_to_head( '<html><body></body></html>' );
      result.should.eql( '<html><body></body></html>' );
    } );

    it( 'moves css to the head', function( ) {
      var result = pagespeed.css_to_head( '<html><head></head><body><link rel="stylesheet" type="text/css" href="foo.css" /></body></html>' );
      result.should.eql( '<html><head><link rel="stylesheet" type="text/css" href="foo.css" /></head><body></body></html>' );
    } );

    it( 'only moves the css', function ( ) {
      var result = pagespeed.css_to_head( '<html><head></head><body></body><h1>Title</h1><script src="foo.js"></script><link href="foo.css" rel="stylesheet" type=text/css /></html>' );
      result.should.eql( '<html><head><link href="foo.css" rel="stylesheet" type=text/css /></head><body></body><h1>Title</h1><script src="foo.js"></script></html>' );
    } );

    it( 'only moves css if a css file is in the href', function ( ) {
      var result = pagespeed.css_to_head( '<html><head></head><body><link rel="stylesheet"/></body></html>' );
      result.should.eql( '<html><head></head><body><link rel="stylesheet"/></body></html>' );
    } );

    it( 'moves inline styles too', function ( ) {
      var result = pagespeed.css_to_head( '<html><head></head><body><style>div { width: 1 }</style></body></html>' );
      result.should.eql( '<html><head><style>div { width: 1 }</style></head><body></body></html>' );
    } );

    it( 'does not mess with things between style tags', function ( ) {
      var result = pagespeed.css_to_head( '<html><head></head><body><style>div { width: 1 }</style><p>some content</p><style>p { width: 2 }</style></body></html>' );
      result.should.eql( '<html><head><style>div { width: 1 }</style><style>p { width: 2 }</style></head><body><p>some content</p></body></html>' );
    } );

    it( 'does not mess with browser specific stuff', function ( ) {
      var result = pagespeed.css_to_head( '<html><head></head><body><!--[if lt IE 7 ]> <link rel="stylesheet" type="text/css" href="foo.css" /> <![endif]--></body></html>' );
      result.should.eql( '<html><head><!--[if lt IE 7 ]> <link rel="stylesheet" type="text/css" href="foo.css" /> <![endif]--></head><body></body></html>' );
      result = pagespeed.css_to_head( "<html><head></head><body><!--[if lt IE 7 ]>\n\t" + '<link rel="stylesheet" type="text/css" href="foo.css" /><![endif]--></body></html>' );
      result.should.eql( "<html><head><!--[if lt IE 7 ]>\n\t" + '<link rel="stylesheet" type="text/css" href="foo.css" /><![endif]--></head><body></body></html>' );
    } );

  } );

} );
