const express = require ('express')
const server = express ();

const bodyParser = require('body-parser').json()
server.use(bodyParser)

server.get('/health', (req, res) => {
    res.status(200).send({ code: 'OK', message: `API up and running` });
})

// middleware
const { validarId, validarUserId, validarOrdersId, autenticarUsuario, autenticarAdmin, checkOrderStatus } = require('./middlewares')

// Users
const { register, login, getUsers, updateUserData, upgradeToAdmin } = require('./users')
server.post('/register', register)
server.post('/login', login)
server.put('/admin/:userId', autenticarAdmin, validarUserId, upgradeToAdmin)
server.get('/users', autenticarAdmin, getUsers)
server.put('/users/:userId', autenticarAdmin, validarUserId, updateUserData)

// Products
const { createProduct, updateProduct, deleteProduct, getProducts, getProduct } = require('./products')
server.post('/products', autenticarAdmin, createProduct)
server.put('/products/:id', autenticarAdmin, validarId, updateProduct)
server.delete('/products/:id', autenticarAdmin, validarId, deleteProduct)
server.get('/products', autenticarUsuario, getProducts)
server.get('/products/:id', autenticarUsuario, validarId, getProduct)

// Pedidos
const { createOrder, seeOrders, seeOrderByOrderId, updateOrderStatus, deleteOrder } = require('./orders')
server.post('/orders', autenticarUsuario, createOrder)
server.get('/orders', autenticarAdmin, seeOrders)
server.get('/orders/:ordersId', autenticarUsuario, validarOrdersId, seeOrderByOrderId)
server.put('/orders/:ordersId', autenticarAdmin, validarOrdersId, updateOrderStatus)
server.delete('/orders/:ordersId', autenticarAdmin, validarOrdersId, checkOrderStatus, deleteOrder)

server.listen(3000, () => {
    console.log('servidor iniciado...')
})