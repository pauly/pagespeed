var should = require( 'should' );
var pagespeed = require( '../lib/main' );
describe( 'pagespeed', function( ) {

  describe( 'strip', function( ) {

    it( 'does not change the output if there is no white space', function( ) {
      var result = pagespeed.strip( '<html><body></body></html>' );
      result.should.eql( '<html><body></body></html>' );
    } );

    it( 'strips white spacebetween tags', function( ) {
      var result = pagespeed.strip( '<html>   <body>  </body> </html>' );
      result.should.eql( '<html><body></body></html>' );
    } );

    it( 'does not strip white space within tags', function( ) {
      var result = pagespeed.strip( '<html><body class="foo bar">  </body> </html>' );
      result.should.eql( '<html><body class="foo bar"></body></html>' );
    } );

  } );

} );
