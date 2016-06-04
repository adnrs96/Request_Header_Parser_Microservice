var express = require('express');
var ip = require('ip');
var useragent = require('express-useragent');
var acceptLanguage = require('accept-language');
var app = express();
app.use(useragent.express());
app.set('port', (process.env.PORT || 5000));
app.use('/whoami',function(req,res){
	var ua = req.headers['user-agent'];
	var os = req.useragent.os;
	var language = acceptLanguage.parse(req.headers["accept-language"])[0].value;
	var ipa = ip.address();
	var rhpm = {"ipaddress":ipa,"language":language,"software":os};
	res.json(rhpm);
});
app.use('/',function(req,res){
	res.sendFile(__dirname+'/index.html');
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
