# Prueba técnica - Backend JavaScript
Se debe implementar el backend de un sistema de escritura anticipada simple utilizando prefix-tree
ordenado por popularidad.

## Endpoints 🚀
El sistema contiene dos enpoints:
* GET: /typeahead/{prefix}
_Recibe como dato un prefijo el cual es usado para realizar la busqueda de los nombres y retorna un JSON:
```
[{names:"name1", times:times1}, {names:"name2", times:times2},...]
```
