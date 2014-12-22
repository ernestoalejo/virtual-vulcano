
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

Como ejemplo de despliegue del proyecto estamos usando servidores de Azure por tener una cuenta gratuita que podemos usar para las pruebas.



[Docker](https://www.docker.com/)
---------------------------------

Nuestra aplicación apuesta y se basa exclusivamente en las funcionalidades que Docker ofrece. Como tal tenemos que prepararnos para que nuestro método de instalación esté relacionado y sea simple para sistemas que ya lo están ejecutando.

En un principio hemos empezado generando el fichero ```cloud-config``` para inicializar el servidor. En un futuro el servicio que instala y ejecuta nuestra aplicación se podrá auto-conigurar desde ese fichero que generamos en la página online.



[AngularJS](https://angularjs.org/)
-----------------------------------

Para hacer más sencillo el desarrollo del instalador online hemos tomado la decisión de tener páginas estáticas o casi estáticas en su totalidad donde la verdadera funcionalidad venga de dos frentes:

1. Las pocas y concretas llamadas a nuestra API (endpoints que devuelvan datos concretos y sencillos). Proporcionan datos externos o almacenados que no podemos obtener de otra manera.

2. Una aplicación dinámica que se ejecute en el cliente y que se encargue de las interacciones y de generar las cosas que el cliente necesita.



[Bower](http://bower.io/)
-------------------------

Gestor de paquetes para crear y desarrollar aplicaciones web. Nos permite instalar y mantener la lista de librerías del cliente de forma sencilla.



[MongoDB](http://www.mongodb.org/) y [Mongoose](http://mongoosejs.com/)
-----------------------------------------------------------------------

Por su simplicidad, especialmente al interactuar con Javascript; y la gran cantidad de cosas útiles que ofrece MongoDB nos hemos decidido a usarlo para almacenar los datos del panel de provisionamiento.



[Gulp](http://gulpjs.com/)
--------------------------

Para automatizar tareas de desarrollo y de construcción usamos Gulp que nos permite expresar esos requerimientos de forma explícita y automatizada en un sencillo fichero.



[Q](https://github.com/kriskowal/q)
-----------------------------------

Todo nuestro código Javascript usa el concepto de [promesa](https://promisesaplus.com/) para trabajar con código asíncrono. Esto nos permite realizar los tests unitarios de cada componente de una forma muy sencilla y además componer comportamientos casi sin esfuerzo para realizar cada una de las partes de nuestra aplicación.