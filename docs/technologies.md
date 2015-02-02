
Tecnologías del proyecto
========================

[Azure](http://azure.microsoft.com/es-es/)
------------------------------------------

Como ejemplo de despliegue del proyecto estamos usando servidores de Azure por tener una cuenta gratuita que podemos usar para las pruebas.

[Docker](https://www.docker.com/)
---------------------------------

Nuestra aplicación apuesta y se basa exclusivamente en las funcionalidades que Docker ofrece. Como tal tenemos que prepararnos para que nuestro método de instalación esté relacionado y sea simple para sistemas que ya lo están ejecutando.

En un principio hemos empezado generando el fichero ```cloud-config``` para inicializar el servidor. En un futuro el servicio que instala y ejecuta nuestra aplicación se podrá auto-conigurar desde ese fichero que generamos en la página online.
