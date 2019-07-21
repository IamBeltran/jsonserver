# JSON-Server

![Logotipo de proyecto](doc/PROJECT.LOGO.png)

## Tabla de contenido
<details>
  <summary><b>Expandir para mostrar tabla de contenido</b></summary>

<!-- toc -->

- [Caracteristicas](#Caracteristicas)
  * [JS Ecosystem Demos](#js-ecosystem-demos)
  * [Optional Modules](#optional-modules)
  * [ECMAScript 5 Compatibility](#ecmascript-5-compatibility)

- [To do List](#to-do-list)
- [Documentación](#documentación)

<!-- tocstop -->

</details>

## Caracteristicas
## JSON-SERVER
## Scripts
## Concurrently

Se usa el modulo de `concurrently` para el uso de comandos en paralelo, se debe de instalar globalmente para poder hacer uso de la interfaz de línea de comandos de la propia libreria **CLI** (**command-line** interface).
el proyecto tiene una carpeta con el nombre **concurrently** que contiene cuatro archivos:

```bash
+ concurrently
  - commands.js
  - index.js
  - middleware.js
  - task.js
```


#### COMMANDS.JS

Archivo `commands.js` tiene todos los comandos que se usaran en el proyecto.

```javascript

    // 0
    {
      command: 'node script_01.js',
      name: 'comando-1',
      prefixColor:'green'
    },
    // 1
    {
      command: 'node script_02.js',
      name: 'comando-2',
      prefixColor:'green'
    },
    // 2
    {
      command: 'node script_03.js',
      name: 'comando-3',
      prefixColor:'green'
    },
    // 3
    {
      command: 'cli_paquete_1 archivo_de_configuracion_script.js',
      name: 'paquete-1',
      prefixColor:'green'
    },
    // 4
    {
      command: 'cli_paquete_1 archivo_de_configuracion_script.js',
      name: 'paquete-1',
      prefixColor:'green'
    },
```

Json server cli configuration
```json
{
  "port": 3001,
  "watch": true,
  "host": "localhost",
  "id": "id",
  "delay": 0,
  "logger":false,
  "quiet": false,
  "static": "./src/public_html/",
  "routes": "./src/json/configuration/jsonserver-routes.json",
  "snapshots": "./src/snapshots"
}
```
```json
{
  "name":"Gustavo A. Cerati Clark",
  "nickname": "dipeper",
  "pass": "Mabel560",
  "role": "administrator",
  "level": 15,
}
```
## To do List

1. JSON-SERVER
  - [x] Agregar un servidor de prueba con `json-server`
    * [x] Archivo `.json` de configuración para desplegar un servidor sencillo
    * [x] Archivo `.js` de configuración para desplegar un servidor mas robusto para el uso de middelwares y algunas caracteristicas como JWT, o encryptamiento de caracteres.
2. CONCURRENTLY
  - [x] Agregar concurrently al proyecto para correr proyectos paralelos
    * [x] agregar archivo con tareas predefinidas

## Documentación

1. [CHANGELOG](docs/CHANGELOG.md)
2. [HISTORY](docs/HISTORY.md)
3. [LICENSE](docs/LICENSE.md)
