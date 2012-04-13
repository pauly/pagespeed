function pagespeed ( ) {
};

module.exports = pagespeed;

var match_script_tags = /<script(?! data="(head|inline)")[\s\S]*?script>/ig;
var match_end_of_body = /(<\/body.*)/i;
var match_space_between_tags = />\s*?</g;

function log ( message ) {
  console.info( '[pagespeed] %s', message );
}

pagespeed.js_to_bottom = function ( output ) {
  var tags = [], tag;
  while ( tag = match_script_tags.exec( output )) {
    tags.push( tag[0] );
  }
  output = output.replace( match_script_tags, '' );
  var self = this;
  output = output.replace( match_end_of_body, function ( str, end_of_body ) {
    return tags.join('') + end_of_body;
  } );
  return output;
}

pagespeed.css_to_head = function ( output ) {
  return output;
}

pagespeed.strip = function ( output ) {
  return output.replace( match_space_between_tags, '><' );
}

pagespeed.middleware = function ( req, res, next ) {
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
}
