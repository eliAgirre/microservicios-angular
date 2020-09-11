# Microservicios con Angular

Es un pequeño proyecto siendo una SPA con Spring Cloud y Angular para gestionar los alumnos, los cursos y los exámenes. Se divide en dos partes, una es el front-end (Angular) y el otro es back-end (Java con Spring Cloud).<br><br>
El ecosistema Spring Cloud tiene el Servidor Eureka, el balanceo de carga y el Spring API Gateway. El **servidor Eureka** simpletemente es un servidor de nombre para registrar los microservicios mediante un nombre o un identificador único.<br><br>
El **balanceo de carga** es oro componente que tiene dos librerías. Una de ellas es Ribbon desarrollada por Netflix y la otra es, en este caso, **Spring Cloud Load Balancer**. Se puede utilizar ambas ya que las dependencias vienen en el servidor de Eureka.<br><br>
El **Spring API Gateway** es un servidor de enrutador dinámicos que está compuesto por filtros para que cada servicio realice una tarea en particular como la autorización, seguridad, monitorización, etc. Este servidor en concreto es el punto de entrada del ecosistema de microservicios, y será el encargado de enrutar cada uno de estos servicios a una URL base en la que se puede acceder, etc. En este caso existen dos librerías, una de ellas es **Zuul** desarrollada por Netflix y la otra es **Spring Cloud API Gateway** que sirve para trabajar con programación reactiva.<br><br><br><br>

## Base de datos

Se ha utilizado dos tipos de patrones de base de datos:
- **Compartida**. Es un enfoque que permite la integración de las diversas plataformas, aplicaciones o tecnologías que subsisten en una corporación. Este patrón indica que la integración de las aplicaciones construidas se manejan independiente almacenando sus datos en una misma y única base de datos. Este tipo de aplicación altamente concurrente quizás no sea buena opción de tener una base de datos transaccional que cumplan las características ACID.
- **Por servicio**. En este caso cada servicio o microservicio tiene su propia base de datos, son mucho más difíciles de manejar pero son más flexibles ya que tienen la misma arquitectura que las de microservicios. De esta forma es más robusto para el escalamiento, desarrollos independientes, relaciones distruibuídas, etc. En los sistemas distribuídos son muchó más difíciles de manejar que una sola base de datos compartida, ya que estos servicios se comunican de forma directa a la misma base de datos, con los mismos datos, etc.