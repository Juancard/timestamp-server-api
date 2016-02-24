# API: Servicio de Timestamp

## Historias de usuario:

1) Puedo pasar un string como parametro, y se va a chequear para ver si ese string 
contiene una fecha unix o una en lenguaje natural (ejemplo: Enero 1, 2016)
2) Si es asi, devuelve ambas, es decir la fecha en unix y en lenguaje natural.
3) Si no contiene una fecha Unix o natural, devuelve null para ambas propiedades.

## Example usage:

```url
https://timestamp-server-api.herokuapp.com/Diciembre%2015,%202015
https://timestamp-server-api.herokuapp.com/1450137600
```

## Example output:

```json
{ "unix": 1450137600, "natural": "Diciembre 15, 2015" }
```