var moment = require("moment");
moment.locale("es");
var formatoFechaNatural = "MMMM DD, YYYY";

module.exports = function(res,query){
    query = query.split("%20").join("");
    var unix = null;
    var fechaNatural = null;
    if (!isNaN(query) && moment(query, "X").isValid()){
       unix = query;
       fechaNatural = moment(query, "X").format(formatoFechaNatural);
    } else if (moment(query, formatoFechaNatural).isValid()){
       unix = moment(query, formatoFechaNatural).format("X");
       fechaNatural = moment(query, formatoFechaNatural).format(formatoFechaNatural);
    }
    var json = JSON.stringify({"unix": (unix)? +unix : null, "natural":fechaNatural});
    res.end(json);
}
