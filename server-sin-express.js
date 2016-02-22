var http = require('http');
var path = require('path');
var fs = require("fs");
/*
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
*/
var url = require("url");
var moment = require("moment");
moment.locale("es");
var formatoFechaNatural = "MMMM DD, YYYY";
var server = http.createServer(function(req,res){
    var objetoUrl = url.parse(req.url,true);
   if (req.url == "/"){
        fs.createReadStream(path.resolve(__dirname, 'client/index.html')).pipe(res)
   } else{
       var valorDado = objetoUrl.pathname.slice(1).split("%20").join(" ");
       var unix = null;
       var fechaNatural = null;
       if (!isNaN(valorDado) && moment(valorDado, "X").isValid()){
           unix = valorDado;
           fechaNatural = moment(valorDado, "X").format(formatoFechaNatural);
       } else if (moment(valorDado, formatoFechaNatural).isValid()){
           unix = moment(valorDado, formatoFechaNatural).format("X");
           fechaNatural = moment(valorDado, formatoFechaNatural).format(formatoFechaNatural);
       }
        var json = JSON.stringify({"unix": (unix)? +unix : null, "natural":fechaNatural});
        res.end(json);
   }
});
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
