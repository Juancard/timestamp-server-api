var http = require('http');
var path = require('path');
var fs = require("fs");
var url = require("url");
var mime = require("mime");
var cache = {} // para guardar archivos leidos en memoria
var timestamp = require("./api/timestamp.js");

var server = http.createServer(function(req,res){
   if (req.url == "/"){
        var pathAbsoluto = "./client/index.html";
        enviarArchivoStatic(res,cache,pathAbsoluto);
   } else{
        timestamp(res,req.url.slice(1));
   }
});
server.listen(process.env.PORT || 3000);
/*
server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
*/

//Para manejo de archivos de diversos tipos
// funciones tomadas de Node.js in action.

function enviar404(resp) {
  resp.writeHead(404, {'Content-Type': 'text/plain'});
  resp.write('Error 404: resource not found.');
  resp.end();
}
function enviarArchivo(resp, archivoPath, archivoContenido) {
  resp.writeHead(
    200, 
    {"content-type": mime.lookup(path.basename(archivoPath))}
  );
  resp.end(archivoContenido);
}
function enviarArchivoStatic(resp, cache, pathAbsoluto) {
  if (cache[pathAbsoluto]) {
    enviarArchivo(resp, pathAbsoluto, cache[pathAbsoluto]);
  } else {
    fs.exists(pathAbsoluto, function(exists) {
      if (exists) {
        fs.readFile(pathAbsoluto, function(err, data) {
          if (err) {
            enviar404(resp);
          } else {
            cache[pathAbsoluto] = data;
            enviarArchivo(resp, pathAbsoluto, data);
          }
        });
      } else {
        enviar404(resp);
      }
    });
  }
}