var express        = require( 'express' );
var nconf          = require( 'nconf' );
var routes         = require( __dirname + '/lib/routes' );

nconf.env();

var app = express();
app.use( express.json() )
   .use( express.urlencoded() );

app.get( '/'     , routes.count );
app.get( '/add'  , routes.add );
app.get( '/clear', routes.clear );

app.listen( nconf.get('PORT') );