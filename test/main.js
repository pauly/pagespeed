var should = require( 'should' );
var pagespeed = require( '../lib/main' );
describe( 'pagespeed', function( ) {

  describe( 'js to bottom', function( ) {

    it( 'does not change the output if there is no js', function( ) {
      var result = pagespeed.js_to_bottom( '<html><body></body></html>' );
      result.should.eql( '<html><body></body></html>' );
    } );

    it( 'moves a script tag down', function( ) {
      var result = pagespeed.js_to_bottom( '<html><body><script src="foo.js"></script><p>hello</p></body></html>' );
      result.should.eql( '<html><body><p>hello</p><script src="foo.js"></script></body></html>' );
    } );

    it( 'moves multiple script tag down', function( ) {
      var result = pagespeed.js_to_bottom( '<html><head><script src="foo.js"></script></head><body><p>hello</p><script src="bar.js"></script></body></html>' );
      result.should.eql( '<html><head></head><body><p>hello</p><script src="foo.js"></script><script src="bar.js"></script></body></html>' );
    } );

    it( 'does not touch a page with no /body', function( ) {
      var result = pagespeed.js_to_bottom( '<html><head><script src="foo.js"></script></head></html>' );
      result.should.eql( '<html><head><script src="foo.js"></script></head></html>' );
    } );

    it( 'does not mess with browser specific stuff', function ( ) {
      var result = pagespeed.js_to_bottom( '<html><body><!--[if lt IE 7 ]> <script src="foo.js"></script> <![endif]--><p>hello</p></body></html>' );
      result.should.eql( '<html><body><p>hello</p><!--[if lt IE 7 ]> <script src="foo.js"></script> <![endif]--></body></html>' );
    } );

  } );

} );
