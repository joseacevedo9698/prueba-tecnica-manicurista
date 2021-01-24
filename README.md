# Prueba técnica - Backend JavaScript
Se debe implementar el backend de un sistema de escritura anticipada simple utilizando prefix-tree
ordenado por popularidad.

## Endpoints 🚀
El sistema contiene dos enpoints:
### GET: /typeahead/{prefix}
_Recibe un prefijo en la ruta y devuelve un array de objetos, cada uno de los cuales tiene los
atributos name y times. El resultado contiene todos los nombres que tienen el prefijo dado,
hasta un máximo de nombres correspondiente al límite SUGGESTION_NUMBER, ordenados por
mayor popularidad (times), y el name en orden ascendente si tienen la misma popularidad,
siempre dejando la coincidencia exacta en el principio:
#### Ejemplo
```
$ curl -X GET http://host:port/typeahead/ja
[{"name":"Janetta","times":973,{"name":"Janel","times":955},{"name":"Ja
zmin","times":951},{"name":"Janette","times":947},{"name":"Janet","time
s":936},{"name":"Janeva","times":929},{"name":"Janella","times":916},{"
name":"Janeczka","times":915},{"name":"Jaquelin","times":889},{"name":"
Janaya","times":878}]
```

### POST: /typeahead:
_Recibe un objeto JSON con un nombre como cuerpo de la solicitud (ejemplo: {"name":"
Joanna"}), aumenta la popularidad de ese nombre en 1 y devuelve un objeto con las
propiedades name y times considerando el nuevo estado. Si el nombre de pila no existe en los datos (names.json), entonces
este extremo debería devolver un error HTTP 400 (por lo que no se agregarán nuevos nombres,
solo aumentará la popularidad de los nombres existentes).
Este endpoint debe distinguir entre mayúsculas y minúsculas, según la descripción inicial.
#### Ejemplo
```
$ curl -X POST -H "Content-Type: application/json" -d '{"name":
"Joanna"}' http://localhost:8080/typeahead
{"name":"Joanna","times":441}
```

## Iniciar el sistema ⚙️
```
npm start
```

## Construido con 🛠️


* [Express](https://www.npmjs.com/package/express) - marco de aplicación web de back-end para Node.js
* [Trie-Search](https://www.npmjs.com/package/trie-search) - Libreria encargada de realizar la busqueda usando prefix-tree

## Autor ✒️

_Menciona a todos aquellos que ayudaron a levantar el proyecto desde sus inicios_

* **Jose David Acevedo Camacho** - [joseacevedo9698](https://github.com/joseacevedo9698)