
virtual-vulcano
===============

El objetivo principal es facilitar y centralizar la administración de clústeres de máquinas ejecutando CoreOS y contenedores en Docker para la aplicaciones usando una plataforma web que se pueda consultar online y ejecutarse dentro del propio servidor.

Queremos enfocar el proyecto para que siga la siguiente ruta:

1. Administrar clústeres de CoreOS generando los ficheros `cloud-config` que necesitan para inicializarse.

2. Administrar, encender y apagar contenedores dentro de los clústeres.

3. Monitorizar el estado de los contenedores para saber cuando están en ejecución y cuando se han cerrado.


Además queremos ampliar las funcionalidades de nuestro panel en la medida en que sea posible añadiendo:

- Monitorización de contenedores para recibir por email notificaciones cuando fallan y se cierran.

- Visualizar los logs de los containers directamente desde la página online.

- Llevar un histórico de la CPU, la RAM y otras medidas interesantes que se gastan dentro de cada uno de los containers.

- Llevar un histórico con medidas interesantes de las propias máquinas.
