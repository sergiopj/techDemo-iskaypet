
# API REST Pets iskaypet

API REST desarrollada en Node.js y TypeScript para la exposición de datos de mascotas para iskaypet

## Levantar la Aplicación en entorno local:

Características a tener en cuenta si se quiere levantar la app en un entorno local:

* Aplicación realizada en Node version - v14.21.2
* Gestor de dependencias npm version - 6.14.17

Comandos a ejecutar:

```console
npm i
npm start
```

## Levantar la Aplicación con docker:

Requisitos previos si se quiere levantar la app en un contenedor docker:

* Tener instalado docker-compose y docker.

Finalmente para levantar el contenedor docker, simplemente en la raiz del proyecto, ejecutar el comando:

```console
docker-compose up --build
```
_Nota: Si se quiere acceder al sistema de archivos del contenedor para verificar por ejemplo los logs o la creación de la db, se ha de ejecutar el siguiente comando:_

```console
docker exec -it docker_image_name /bin/bash
```

## Endpoints

La API REST cuenta con los siguientes endpoints:

* GET /pets - Obtiene todas las mascotas registradas.

* GET /pets/:id - Obtiene la información de una mascota en particular, por el parámetro id.

* GET /pets/species/most_numerous_species - Obtiene la especie de mascota más numerosa.

* GET /pets/species/average_age?species_name='example' - Obtiene la edad promedio de las mascotas de la especie requerida.

* POST /pets - Registra una nueva mascota.
    * name (string, requerido): Nombre de la mascota.
    * species (string, requerido): Especie de la mascota.
    * gender (string, requerido, debe ser "male" o "female"): Género de la mascota.
    * birthdate (string, requerido, formato "YYYY-MM-DD"): Fecha de nacimiento de la mascota.   

* SWAGGER_DOCS /api-docs para poder probar los endpoints

## Test unitarios

Como lanzarlos de forma general:

```console
npm test
```

