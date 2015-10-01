var nconf  = require( 'nconf' );
var moment = require( 'moment' );
var solr   = require( __dirname + '/solr' );
var auth   = require( __dirname + '/webSolrAuth' );

nconf.env();

var oSolr = solr.createClient( { host: 'index.websolr.com'
							   , port: '80'
							   , core: nconf.get('WEBSOLR_CORE')
							   , path: '/solr/'
							   , authMechanism: new auth( nconf.get('WEBSOLR_SECRET' ) )
							   } );

exports.add = function( req, res ) {
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
	res.header("Pragma", "no-cache");
	res.header("Expires", 0);
	oSolr.add( { key         : (new Date()).valueOf().toString()
			   , updated_date: moment().format( 'YYYY-MM-DD[T]HH:mm:[00Z]' )
			   }
			 , function( err ) {
				 if( err ) {
					res.send( 500, err.message );
					return;
				 }
				 oSolr.commit( function( err ) {
					 if( err ) {
						 res.send( 500, err.message );
						 return;
					 }
					 res.redirect( '/' );
				 } );
			  } );
};

exports.clear = function( req, res ) {
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
	res.header("Pragma", "no-cache");
	res.header("Expires", 0);
	oSolr.del( false
			 , '*:*'
			 , function( err ) {
				if( err ) {
					res.send( 500, err.message );
					return;
				}
				oSolr.commit( function( err, response ) {
					if( err ) {
						res.send( 500, err.message );
						return;
					}
					res.set( 'Content-Type', 'application/xml' );
					res.send( 200, response );
				} );
			 } );
};

exports.del = function( req, res ) {
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
	res.header("Pragma", "no-cache");
	res.header("Expires", 0);
	oSolr.del( req.param( 'key' )
			 , false
			 , function( err ) {
				if( err ) {
					res.send( 500, err.message );
					return;
				}
				oSolr.commit( function( err, response ) {
					if( err ) {
						res.send( 500, err.message );
						return;
					}
					res.set( 'Content-Type', 'application/xml' );
					res.send( 200, response );
				} );
			 } );
};

exports.count = function( req, res ) {
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
	res.header("Pragma", "no-cache");
	res.header("Expires", 0);
	oSolr.query( '*:*'
			   , {}
			   , function( err, response ) {
				   if( err ) {
					   res.send( 500, err.message );
					   return;
				   }
				   var oRes = JSON.parse( response );
				   res.set( 'Content-Type', 'application/json' );
				   res.send( 200, JSON.stringify( oRes, null, '\t' ) );
			   } );
};

exports.query = function( req, res ) {
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
	res.header("Pragma", "no-cache");
	res.header("Expires", 0);

	oSolr.query( 'a'.repeat( req.param( 'size' ) || 1 )
			   , {}
			   , function( err, response ) {
				   if( err ) {
					   res.send( 500, err.message );
					   return;
				   }
				   var oRes = JSON.parse( response );
				   res.set( 'Content-Type', 'application/json' );
				   res.send( 200, JSON.stringify( oRes, null, '\t' ) );
			   } );
};