const Sequelize = require ('sequelize')
const sequelize = new Sequelize('mysql://root@localhost:3306/delilah')

const jwt = require('jsonwebtoken')
const jwtSign = 'secretoJWT#shh'

module.exports = { 
    validarId: async (req, res, next) => {
        const id = req.params.id
        const seqId = await sequelize.query(`SELECT productsId FROM products WHERE productsId = ${id}`, { type: Sequelize.QueryTypes.SELECT })
        const busqueda = seqId.find(item => item.productsId == id)
        console.log(busqueda)
        if(busqueda == undefined) {
            res.status(400).json("el id del producto no existe")
        }
        else {
            next()
        }
    },

    validarUserId: async (req, res, next) => {
        const userId = req.params.userId
        const seqUserId = await sequelize.query(`SELECT userId FROM users WHERE userId = ${userId}`, { type: Sequelize.QueryTypes.SELECT })
        const busqueda = seqUserId.find(item => item.userId == userId)
        console.log(busqueda)
        if(busqueda == undefined) {
            res.status(400).json("el usuario no existe")
        }
        else {
            next()
        }
    },

    validarOrdersId: async (req, res, next) => {
        const ordersId = req.params.ordersId
        const seqOrdersId = await sequelize.query(`SELECT ordersId FROM orders WHERE ordersId = ${ordersId}`, { type: Sequelize.QueryTypes.SELECT })
        const busqueda = seqOrdersId.find(item => item.ordersId == ordersId)
        console.log(busqueda)
        if(busqueda == undefined) {
            res.status(400).json("la orden no existe")
        }
        else {
            next()
        }
    },

    autenticarUsuario: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const verificartoken = jwt.verify(token, jwtSign)
            if (verificartoken) {
                req.username = verificartoken
                // console.log(verificartoken)
                return next()
            }
        } catch(err) {
            const response = {
                status_code: 400,
                message: "error al validar usuario"
            }
            return res.status(401).json({ response })
        }
    },

    autenticarAdmin: async (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const verificartoken = jwt.verify(token, jwtSign)
            if (verificartoken.busquedaAdmin.isAdmin === 1) {
                return next()
            }
        } catch(err) {
                const response = {
                status_code: 401,
                message: "el usuario no tiene permisos"
            }
            return res.status(401).json({ response })
        }
    },

    checkOrderStatus: async (req, res, next) => {
        const ordersId = req.params.ordersId
        const orderStatus = await sequelize.query(`SELECT status FROM orders WHERE ordersId = ${ordersId}`, { type: Sequelize.QueryTypes.SELECT})
        const orderStatusOK = orderStatus[0].status
        console.log(orderStatusOK)
        if (orderStatusOK === 'entregado' || orderStatusOK === 'cancelado'){
            return next()
        } else {
            const response = {
                status_code: 400,
                message: "la orden no puede ser eliminada"
            }
            return res.status(400).json({ response })
        }
    }    
}