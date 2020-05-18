# AcamicaDelilah
Proyecto #3 de Acamica - Delilah-Resto
Delilah Restó es una aplicación para realizar delivery de comida: permite administrar listas de clientes, productos y ordenes del restaurant.  

Instalación de servidor Express:  
Instalar NodeJs
Instalar ExpressJS : npm i express
Configurar el servidor (como figura en el proyecto) : 
  const express = require('express')
  const app = express();
  app.listen(3000, () => {console.log('servidor iniciando...')}) 

Dependencias utilizadas:
-body-parser
-sequelize
-mysql2

Set up de la base de datos: 
Inicializar phpMyAdmin 
Crear una base de datos llamada "delilah"
Crear todo las tablas insertando manualmente las queries que se encuentran en el archivo delilah.sql 

Rutas/endpoints: 
/register (POST para registrarse, espera recibir "username", "fullname", "email", "phone", "address" y "password"
/login (POST para login de usuario, espera recibir "username" y "password")
/admin/:userId (PUT acceso exclusivo del admin, para denominar generar nuevos admins, espera recibir "isAdmin":1)
/users (GET acceso exclusivo del admin, para ver toda la informacion de los usuarios registrados) 
/users/:userId (PUT acceso exclusivo del admin, para modificar la informacion de un usuario especifico, espera recibir "address" y "phone")

/products (POST acceso exclusivo del admin, para crear nuevos productos, espera recibir "productsName" y "price")
/products (GET acceso exclusivo de un usuario registrado o admin, para visualizar todos los productos)
/products/:id (GET acceso exclusivo de un usuario registrado o admin, para visualizar un producto específico)
/products/:id (PUT acceso exclusivo del admin, para modificar la info de un producto, espera recibir "price")
/products/:id (DELETE acceso exclusivo del admin, para eliminar un producto especifico)

/orders (POST acceso exclusivo de un usuario registrado o admin, para crear un pedido, espera recibir "productsId" y "amount")
/orders (GET acceso exclusivo del admin, para visualizar todas las ordenes)
/orders/:ordersId (GET acceso exclusivo de un usuario registrado o admin, para visualizar una orden especifica)
/orders/:ordersId (PUT acceso exclusivo del admin, para modificar una order especifica, espera recibir "status")
/orders/:ordersId (DELETE acceso exclusivo del admin, para eliminar una orden especifica)
