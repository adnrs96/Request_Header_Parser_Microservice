var express = require('express');
var ip = require('ip');
var acceptLanguage = require('accept-language');
var UAParser = require('ua-parser-js');
var app = express();
var parser = new UAParser();

app.set('port', (process.env.PORT || 5000));
app.use('/whoami',function(req,res){
	var ua = req.headers['user-agent'];
	var os = parser.setUA(ua).getOS()["name"];
	var language = acceptLanguage.parse(req.headers["accept-language"])[0].value;
	var ip = ip.address();
	var rhpm = {"ipaddress":ip,"language":language,"software":os};
	res.json(rhpm);
});
app.use('/',function(req,res){
	res.sendFile(__dirname+'/index.html');
});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
