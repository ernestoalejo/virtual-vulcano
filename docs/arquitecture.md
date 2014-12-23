
Arquitectura general
====================

> En este documento se explica la organización y el funcionamiento de la aplicación desde el punto de vista más abstracto. Sirve para entender y justificar las decisiones de diseño que hemos tomado. Si lo que quieres es usar la aplicación es preferible pasar directamente a los documentos de instalación.

Para conseguir el objetivo que hemos reflejado en el [planteamiento](planteamiento.md) necesitamos que tres componentes independientes actuen correcta y coordinadamente para el mismo fin.



Instalador online
-----------------

La aplicación es un contenedor que se ejecuta en cualquier máquina que tenga instalada CoreOS. Para facilitar este paso hemos preparado una [página centralizada](http://virtual-vulcano.appspot.com/) online que permite generar un fichero ```cloud-config.yaml``` que instale correctamente el contenedor sin intervención alguna del usuario.

Ese fichero servirá para iniciar una máquina pequeña en algún sitio; puede estar incluso dentro del propio cluster que vamos a administrar. Esta máquina la llamaremos de *provisionamiento* porque nos servirá como trampolín para preparar el resto del cluster.

Se están realizando esfuerzos en estos momentos para [añadir memoria](https://github.com/ernestoalejo/virtual-vulcano/issues/23) a este instalador de forma que lo podamos usar como punto de referencia al iniciar una máquina en Azure por ejemplo.

El código de este instalador lo tenemos en la carpeta ```appengine```.



Aplicación web de provisionamiento
----------------------------------

Nos referimos al panel administrativo con el que realmente tendrá contacto el usuario de nuestro proyecto. Se instala automáticamente con el ```cloud-config.yaml``` que genera nuestro instalador online.

Permite administrar los clústeres: crearlos, eliminarlos, etc. Además se encarga de generar a configuración para iniciar todos las máquinas del clúster.

Desde el panel podemos lanzar servicios en un cluster concreto. Los servicios no son más que un pequeño fichero que se ejecuta en todas o algunas de las máquinas según la configuración que tenga en el fichero. El servicio *fleetctl* se encarga de lanzar los servicios en las máquinas pertinentes.

Para acceder al cluster y a fleetctl se necesita acceso SSH al menos a alguna de las máquinas; y eso es algo que se configura en el cluster al decirle la IP.

El código correspondiente a la aplicación web está en la carpeta ```container```.



Monitor
-------

La tercera parte que debe coordinarse es un monitor del estado de las máquinas que *fleetctl* se encarga de mantener. Esta última parte está todavía pendiente de implementar.
