# Job Search


<h3>Frontend deploy: <a href="https://jobsearch-ar.vercel.app/">Frontend</a> </h3>
<h3>Backend deploy: <a href="https://jobsearch.up.railway.app/">Backend</a> </h3>
<h3>Documentacion Postman: <a href="https://documenter.getpostman.com/view/20685324/VUqrMGEy">Postman</a> </h3>

<br>
<hr>

## Pagina Web - Búsqueda de trabajo - MERN
**Pagina: <a href="https://jobsearch-ar.vercel.app/">Job Search </a>** <br><br>
Pagina de busqueda de Empleo, que podremos ver todos los empleos disponibles, nuestras postulaciones y nuestras ofertas. 
Vamos a necesitar un usuario, el cual podemos registrarnos y despues podemos iniciar sesion.
Los usuarios se dividen en aplicantes y empleadores (applicant and employer). 
En caso de ser tipo de usuario applicant vas a poder aplicar a ofertas de empleo (y también quitar tu postulación). 
Si sos usuario employer vas a poder publicar empleos para que los usuarios puedan postularse. <br> <br>
Pagina realizada: Backend con NodeJS + Express, Base de datos MongoDB y Frontend React + Tailwind <br>

## Backend
**Usando NodeJs con Express y MongoDB para la base de datos. Token encriptado con JSONWebToken** <br>
*Usuarios con rol de admin tienen acceso a todas las peticiones*

<br>

### Usuarios

El usuario requiere nombre, email y password <br>
En caso de tener una cuenta podemos logearnos con el mail y la contraseña, en caso que no tengamos cuenta podemos registrarnos  <br>
La sesion es un token que se guarda por 7 dias, se almacena en el Local Storage <br>
*Solo el admin puede ver todos los usuarios y tambien puede eliminar usuarios* <br>


### Empleos

Los empleos requieren de titulo, descripcion, categoria, pais, provincia, ciudad y salario. <br>
Podemos ver todos los empleos publicados, y acceder a un empleo en particular para ver los detalles. <br>
Tambien podemos filtrar los empleos por categoria o por ubicación <br>
Podemos aplicar a todos los empleos mientras el usuario sea de tipo applicant <br>
Cada usuario puede ver los empleos postulados, y en caso de ser una empresa se puede ver los empleos publicados. <br>



<br>
<hr>
