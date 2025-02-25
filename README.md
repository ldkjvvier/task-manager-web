# Sistema de Gestión de Tareas

Este proyecto es una aplicación web para gestionar tareas diarias, con funcionalidades como autenticación de usuarios, CRUD de tareas, categorización y notificaciones de tareas próximas a vencer.

## Requisitos Previos

Asegúrate de tener las siguientes herramientas instaladas en tu máquina:

- **Node.js** (versión 14 o superior)
- **MongoDB** (puede ser local o usar MongoDB Atlas)
- **Visual Studio Code**


### Abrir MongoDB Localmente

1. **Iniciar MongoDB Compass**  
   Abre MongoDB Compass en tu máquina. Si no lo tienes instalado, puedes descargarlo desde [aquí](https://www.mongodb.com/products/compass).

2. **Crear una Nueva Conexión**  
   Al abrir MongoDB Compass, selecciona la opción para crear una nueva conexión.

3. **Configurar la Conexión**  
   En el campo de **URL de conexión**, ingresa la siguiente URL para conectar a tu base de datos local: mongodb://localhost:27017

4. **Especificar el Nombre de la Base de Datos**  
En el campo correspondiente, ingresa el nombre de la base de datos: task_management_test

5. **Conectar y Verificar**  
Haz clic en el botón **Conectar**. Si la conexión es exitosa, verás la base de datos listada en el panel izquierdo y podrás empezar a trabajar con ella.


### Paso 1: Clonar el Repositorio FrontEnd

1. **Clonar repositorio**
   Clona el repositorio en tu máquina local utilizando el siguiente comando:
   git clone https://github.com/ldkjvvier/task-manager-web.git

2. **Navegar al directorio** 
    Abre una consola en tu editor de codigo y pega: cd task-manager-web

3. **Clonar repositorio**
   Instala las dependencias necesarias para el FrontEnd (React + Vite) ejecutando:

   npm install

4. **Configurar el Archivo .env**

   En el directorio frontend, crea un archivo .env (si no existe) y agrega la siguiente configuración:
   VITE_API_URL=http://localhost:5000
   Esto asegurará que tu aplicación FrontEnd se conecte al backend en el puerto 5000.

6. **Iniciar el FrontEnd**  
   Ya en directorio `FrontEnd` ejecuta el siguiente comando para iniciar el servidor: 
   npm run dev

### Paso 2: Clonar el Repositorio Backend

1. **Clonar repositorio**
   Clona el repositorio en tu máquina local utilizando el siguiente comando:
   git clone https://github.com/ldkjvvier/task-manager-backend.git

2. **Navegar al directorio** 
    Abre una consola en tu editor de codigo y pega: cd task-manager-backend

3. **Clonar repositorio**
   Instala las dependencias necesarias para el Backend (Node.js + Express) ejecutando:

   npm install

4. **Configurar el Archivo .env**

   En el directorio backend, crea un archivo .env (si no existe) y agrega la siguiente configuración:
   PORT=5000
   DB_CONNECTION_STRING=mongodb://localhost:27017/Javier_Madariaga
   Esto asegurará que tu aplicación Backend se conecte correctamente a la base de datos

6. **Iniciar el Backend**  
   Ya en directorio `backend` ejecuta el siguiente comando para iniciar el servidor: 
   npm run dev


### Verificación

1. **Verificar el Backend**  
   Accede a `http://localhost:5000` desde tu navegador o con herramientas como Postman para verificar que el Backend esté funcionando.

2. **Verificar el Frontend**  
   Abre tu navegador y accede a `http://localhost:3000` para ver la aplicación en funcionamiento.

3. **Probar las funcionalidades**  
   - **Autenticación**: Regístrate, haz login y asegúrate de que las rutas protegidas solo son accesibles para usuarios autenticados.
   - **CRUD de Tareas**: Crea, edita y elimina tareas. Verifica que se reflejen correctamente en la base de datos.
   - **Categorización de Tareas**: Asegúrate de que las tareas se puedan asignar a categorías.
   - **Notificaciones**: Verifica que las notificaciones de tareas próximas a vencer se muestren correctamente.
