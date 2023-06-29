var http = require('http'),
    fs = require('fs'),
    ccav = require('./ccavutil.js'),
    crypto = require('crypto'),
    qs = require('querystring');

exports.postReq = function(request,response){
    var body = '',
	workingKey = '',	//Put in the 32-Bit key shared by CCAvenues.
	accessCode = '',			//Put in the Access Code shared by CCAvenues.
	encRequest = '',
	formbody = '';

    //Generate Md5 hash for the key and then convert in base64 string
    var md5 = crypto.createHash('md5').update(workingKey).digest();
    var keyBase64 = Buffer.from(md5).toString('base64');

    //Initializing Vector and then convert in base64 string
    var ivBase64 = Buffer.from([0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d,0x0e, 0x0f]).toString('base64');

    request.on('data', function (data) {
	body += data;
	encRequest = ccav.encrypt(body, keyBase64, ivBase64); 
	formbody = '<form id="nonseamless" method="post" name="redirect" action="https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction"/> <input type="hidden" id="encRequest" name="encRequest" value="' + encRequest + '"><input type="hidden" name="access_code" id="access_code" value="' + accessCode + '"><script language="javascript">document.redirect.submit();</script></form>';
    });
				
    request.on('end', function () {
        response.writeHeader(200, {"Content-Type": "text/html"});
	response.write(formbody);
	response.end();
    });
   return; 
};
