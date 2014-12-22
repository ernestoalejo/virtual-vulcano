
Arquitectura
============

Nuestra aplicación tiene dos partes importantes que se relacionan en el momento de la instalación en el servidor del cliente; pero que nosotros tenemos que preparar y programar independientemente.


Instalador online
-----------------

Por una parte necesitamos ser capaces de iniciar lo más mínimo (un contenedor) de nuestra aplicación en un servidor al que no tenemos acceso ninguno (eso corresponde al usuario). Con eso en mente hemos construido una pequeña aplicación dinámica (se ejecuta en el servidor) que pide un código para el cluster y genera el fichero ```cloud-config```.

Ese fichero lo tiene que usar el propio usuario para provisionar la primera máquina que cree en el servidor, donde se descargará y ejecutará nuestra aplicación.

El código de este instalador lo tenemos en la carpeta ```appengine```.



Aplicación en un contenedor
---------------------------

Por otra parte necesitamos preparar el contenedor que ejecutará nuestra aplicación en el servidor del cliente. De momento y por simplificar hemos implementado un script sencillo que no usa ningún servidor por el momento; aunque iremos extendiéndolo a medida que se vaya realizando la práctica.

El código correspondiente a la aplicación del contenedor está en la carpeta ```container```.
