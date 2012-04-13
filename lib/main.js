function pagespeed ( ) {
};

module.exports = pagespeed;

pagespeed.js_to_bottom = function ( output ) {
  return pagespeed.move_tags( output, /<script(?! data="(head|inline)")[\s\S]*?script>/ig, /(<\/body.*)/i );
}

pagespeed.css_to_head = function ( output ) {
  return pagespeed.move_tags( output, /(<link[^>]+href=[^>]+(\.css)[^>]+>|<style[\s\S]*?style>)/ig, /(<\/head.*)/i );
}

pagespeed.move_tags = function ( output, match_tags, match_destination ) {
  var tags = [], tag;
  while ( tag = match_tags.exec( output )) {
    tags.push( tag[0] );
  }
  return output.replace( match_tags, '').replace( match_destination, function( str, destination ) {
    return tags.join('') + destination;
  } );
}

pagespeed.strip = function ( output ) {
  return output.replace( />\s*?</g, '><' );
}

pagespeed.middleware = function ( options ) {
  return function ( req, res, next ) {
    var send = res.send; 
    res.send = function ( output ) {
      if ( match_end_of_body.test( output )) {
        output = pagespeed.js_to_bottom( output );
        output = pagespeed.css_to_head( output );
        output = pagespeed.strip( output );
      }
      res.send = send;
      res.send( output );
    };
    next( );
  };
}
