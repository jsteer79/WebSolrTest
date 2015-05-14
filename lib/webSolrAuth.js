var crypto = require('crypto');

exports = module.exports = webSolrAuth;

function webSolrAuth( sKey ) {
	this.sSecretKey = sKey;
}

webSolrAuth.prototype.getHeaders = function() {
	var iNow   =  Math.round( new Date().getTime() / 1000 );
	var sNonce = crypto.randomBytes(30).toString('hex');
	
	var hmac = crypto.createHmac( 'sha1', this.sSecretKey );
	hmac.setEncoding( 'hex' );
	hmac.write( iNow + sNonce );
	hmac.end();
	return { 'X-Websolr-Time'  : iNow
		   , 'X-Websolr-Nonce' : sNonce
		   , 'X-Websolr-Auth'  : hmac.read()
		   };
};