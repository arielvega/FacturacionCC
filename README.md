# FacturacionCC
Tercer práctico del sexto modulo de la Maestria MDEIS, usando Clean Architecture.

Clean Architecture es una arquitectura que describió Uncle Bob en su blog y aunque existen otras muchas todas tienen el mismo objetivo, que es la separación de intereses o principios (separation of concerns).

![Diagrama Clean Architecture del Tio Bob](doc/UncleBobCA.png?raw=true "Diagrama Clean Architecture del Tio Bob")

## Guia de inicio rápido (< 2mn)

```
git clone https://github.com/arielvega/FacturacionCC.git
cd FacturacionCC
npm install
node server.js
```

Luego, en el navegador web abrir [http://localhost:3000/](http://localhost:3000/).

## Requisitos
Para poder ejecutar el proyecto se necesita tener instalado NodeJS

### NodeJS
Puede descargarlo en: https://nodejs.org/es/

### Descargar las fuentes
Puede descargar el proyecto desde: https://github.com/arielvega/FacturacionCC/archive/master.zip

### Instale las dependencias del proyecto

Luego de descargar y descomprimir, abra una consola, muevase hacia la carpeta del proyecto y ejecute el siguiente comando:

```
npm install
```

## Ejecutar servicios
Para ejecutar el servidor de la API debe ejecutar en la carpeta raiz del proyecto el siguiente comando:

```
npm start
```

## Modulos desarrollados
En el presente proyecto se han desarrollado los modulos de Personas


### Modulo de personas
Para probar el funcionamiento debe ingresar a http://localhost:3000/personas/

#### Agregar personas

Con postman, usando el metodo POST se puede enviar un objeto JSON que contenga nit y nombre a la direccion http://localhost:3000/personas/

#### Consultar personas

Con postman, usando el metodo GET se puede ingresar a la direccion http://localhost:3000/personas/{NIT}, en donde {NIT} se reemplaza con el nit de la persona

#### Listar personas

Con postman, usando el metodo GET se puede ingresar a la direccion http://localhost:3000/personas/, el cual retorna la lista de todas las personas registradas

## Diagrama
![Diagrama de los modulos](doc/diagrama.png?raw=true "Diagrama event storming")

## Analisis de la estructura del proyecto

```
FacturacionCC 
 └ CA/ 
 |  └ domain/                       → Objetos del dominio
 |  |  └ enums/                     → Enumeraciones del sistema
 |  |  |  └ estado.js               → Estados posibles de los objetos
 |  |  |  └ monedas.js              → Monedas admitidas en el sistema
 |  |  └ events/                    → Eventos del sistema
 |  |  |  └ factura.js              → Eventos relacionados a las facturas
 |  |  |  └ persona.js              → Eventos relacionados a las personas
 |  |  |  └ systemevents.js         → Clase base de los eventos del sistema
 |  |  └ repository/                → Repositorios del sistema
 |  |  |  └ repository.js           → Clase base para los repositorios del sistema
 |  |  └ valueobjects/              → Patrón ValueObject
 |  |  |  └ facturaid.js            → ValueObject de los IDs de las facturas
 |  |  |  └ monedaiso4217.js        → ValueObject de las monedas que cumplen la ISO4217
 |  |  |  └ montonumeropositivo.js  → ValueObject de los montos de las facturas
 |  |  |  └ nitenteropositivo.js    → ValueObject de los numeros de NIT
 |  |  |  └ nombre500.js            → ValueObject de los nombres de las personas
 |  |  |  └ personaid.js            → ValueObject de los IDs de las personas
 |  |  └ factura.js                 → AggregateRoot de Facturas
 |  |  └ persona.js                 → AggregateRoot de Personas
 |  └ framework/                    → Clases de apoyo para el sistema
 |  |  └ aggregate.js               → Clases base para los AggregateRoot
 |  |  └ checker.js                 → Clase que agrupa las comprobaciones de tipos
 |  |  └ events.js                  → Clases base para el patron Listener
 |  |  └ tester.js                  → Clase que agrupa las pruebas de tipos de datos
 |  |  └ valueobjects.js            → Clases base para los ValueObjects
 |  └ infraestructure/              → Clases de la infraestructura del sistema
 |  |  └ commands/                  → Comandos del sistema
 |  |  |  └ v1/                     → Version 1 de los comandos del sistema
 |  |  |  |  └ facturas.js          → Comandos relativos a las facturas
 |  |  |  |  └ personas.js          → Comandos relativos a las personas
 |  |  |  └ commands.js             → Clases de apoyo para los comandos del sistema
 |  |  └ handlers/                  → Manejadores de los comandos del sistema
 |  |  |  └ v1/                     → Version 1 de los manejadores de los comandos del sistema
 |  |  |  |  └ facturas.js          → Manejadores de los comandos relativos a las facturas
 |  |  |  |  └ personas.js          → Manejadores de los comandos relativos a las personas
 |  |  |  └ factory.js              → Fabrica abstracta de manejadores de los comandos del sistema
 |  |  └ persistence/               → Controladores para la persistencia del sistema
 |  |  |  └ facturasrepository.js   → Repositorio de las facturas
 |  |  |  └ personasrepository.js   → Repositorio de personas a las que se hacen las facturas
 |  └ webapi/                       → Clases relacionadas a los servicios web de la API
 |     └ routes/                    → Controladores de rutas de la API
 |     |  └ facturas.js             → Rutas para la API de facturas
 |     |  └ personas.js             → Rutas para la API de personas
 |     └ server.js                  → Archivo ejecutable del servidor principal 
 └ data/                            → Folder de las bases de datos
 |  └ data.db                       → Base de datos principal
 └ doc/                             → Folder de los diagramas del sistema
 |  └ diagrama.png                  → Diagrama del Eventstorming del sistema
 └ node_modules/ (autogenerado)     → Dependencias de NPM
 └ .gitignore                       → Archivo de configuracion de GIT
 └ README.md                        → Este archivo
 └ package-lock.json                → Archivo de configuracion de paquetes de NPM
 └ package.json                     → Archivo de configuracion de paquetes de NPM
```
