
Tecnologías del proyecto
========================


[Google App Engine](https://cloud.google.com/appengine/)
--------------------------------------------------------

Hemos elegido AppEngine para preparar nuestro instalador online por la facilidad que
nos ofrece a la hora de preparar los pequeños scripts que necesitamos para inicializar
los clústeres de los clientes que usen nuestra aplicación.

En un principio para este inicio tan sencillo solamente hemos necesitado que GAE se ocupe
de encender las instancias cuando lleguen peticiones y de resolver las peticiones al servicio
de Discovery de CoreOS (ver [documentación sobre la arquitectura](arquitectura.md) para más información).

Además con el uso tan liviano que hacemos de la plataforma es previsible que no superemos
los límites de uso gratuito que se establecen para todas las cuentas.



[Azure](http://azure.microsoft.com/es-es/)
------------------------------------------

Aprovechando una cuenta gratuita de Azure, hemos desplegado nuestra máquina CoreOS en ella, que se encargará de administrar, encender y apagar contenedores dentro de los clústeres, en este enlace podemos ver como hemos creado la máquina en [Azure](instalation.md)  


[Docker](https://www.docker.com/)
---------------------------------

Nuestra aplicación apuesta y se basa exclusivamente en las funcionalidades que Docker ofrece. Como tal tenemos que prepararnos para que nuestro método de instalación esté relacionado y sea simple para sistemas que ya lo están ejecutando.

En un principio hemos empezado generando el fichero ```cloud-config``` para inicializar el servidor. En un futuro el servicio que instala y ejecuta nuestra aplicación se podrá auto-conigurar desde ese fichero que generamos en la página online.



[AngularJS](https://angularjs.org/)
-----------------------------------

Para hacer más sencillo el desarrollo del instalador online hemos tomado la decisión de tener páginas estáticas o casi estáticas en su totalidad donde la verdadera funcionalidad venga de dos frentes:

1. Las pocas y concretas llamadas a nuestra API (endpoints que devuelvan datos concretos y sencillos). Proporcionan datos externos o almacenados que no podemos obtener de otra manera.

2. Una aplicación dinámica que se ejecute en el cliente y que se encargue de las interacciones y de generar las cosas que el cliente necesita.

[NodeJS](http://nodejs.org/)
-----------------------------------

Hemos decidido utilizar nodejs como framework porque puede utilizar una amplia variedad de plugins que nos van a facilitar el desarrollo. Además, este, nos proporciona una arquitectura orientada a eventos y optimiza el rendimiento y la escalabilidad de la aplicación.

Nodejs tambien nos permite utilizar el gestor de paquetes npm el cual describiremos más adelante.

[Npm](http://nodejs.org/)
-----------------------------------

Utilizamos npm que es un gestor de paquetes para facilitarnos la compilación, instalación y actualización de módulos así como la gestión de las dependencias.
Alguno de los módulos que utilizamos son:

1. [Express](http://expressjs.com/) Web framework sencillo y rapido para node.js.

2. [Mongoose](http://mongoosejs.com/) Herramienta de modelado de objetos de MongoDB para trabajar de forma asíncrona.

3. [Bower](http://bower.io/): Gestor de paquetes web.

4. [Gulp](http://gulpjs.com/): Gestor para automatizar tareas comunes de un sitio web, como los tests.

5. [Lodash](https://lodash.com/): Una biblioteca de utilidades que ofrece consistencia, personalización, rendimiento, y extras.

6. [Q](https://www.npmjs.com/package/q): Herramienta para hacer promesas asíncronas en JavaScript.

