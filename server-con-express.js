var http = require('http');
var path = require('path');
var fs = require("fs");

var express = require('express');

var router = express();
var server = http.createServer(router);

//router.use(express.static(path.resolve(__dirname, 'client')));
   router.get('/', function(req, res) {
      var src = fs.createReadStream(path.resolve(__dirname, 'client/index.html'));
      src.pipe(res);
    })
    router.get('/:query',function(req, res) {
      var src = fs.createReadStream(path.resolve(__dirname, 'client/index.html'));
      console.log()
      src.pipe(res);
    })


server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
