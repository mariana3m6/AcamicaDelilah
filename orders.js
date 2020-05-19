const Sequelize = require ('sequelize')
const sequelize = new Sequelize('mysql://root@localhost:3306/delilah')

module.exports = {

    createOrder: async (req, res) => {  
        try {
            const userIdarray = req.username.userId
            const userId = userIdarray[0].userId
            sequelize.query(`INSERT INTO orders (userId, status) VALUES (${userId}, "nuevo")`)

            const allOrdersId = await sequelize.query(`SELECT ordersId FROM orders WHERE userId = ${userId} and status = "nuevo" ORDER BY time DESC`, { type: Sequelize.QueryTypes.SELECT })
            const ordersIdok = allOrdersId[0].ordersId

            const startCreate = async z => {
                const ordersArray = req.body
                await asyncForEach(ordersArray, async (x) => {
                    const productsId = x.productsId
                    const amount = x.amount
                    const paymentMethod = x.paymentMethod
                    const price = await sequelize.query(`SELECT price FROM products WHERE productsId = ${productsId}`, { type: Sequelize.QueryTypes.SELECT })
                    const priceOK = price[0].price
                    const partialPriceok = partialPrice(priceOK, amount)
                    await sequelize.query(`INSERT INTO ordersDetails (ordersId, productsId, amount, partialPrice, paymentMethod) VALUES (${ordersIdok}, ${productsId}, ${amount}, ${partialPriceok}, "${paymentMethod}")`,{ replacements: req.body })
                })
                .then(response => res.status(201).json("la orden se ha cargado con éxito"))
                .catch(error => console.log('Error! ', error) || res.status(400).json({ error: "no se ha podido cargar el pedido" }))
            }
            startCreate()

        } catch(error){
            return error
        }
    },

    seeOrders: async (req, res) => {
        const ordersByUsers = await sequelize.query(`SELECT orders.ordersId, orders.status, orders.time, users.fullname, users.address FROM orders
        INNER JOIN users ON users.userId = orders.userId`, { type: Sequelize.QueryTypes.SELECT })

        const startSee = async z => {
            await asyncForEach(ordersByUsers, async (x) => {
                const ordersId = x.ordersId
                const orderDetail = await sequelize.query(`SELECT products.productsName, ordersDetails.amount, ordersDetails.paymentMethod FROM orders
                    INNER JOIN users ON users.userId = orders.userId
                    INNER JOIN ordersDetails ON ordersDetails.ordersId = orders.ordersId
                    INNER JOIN products ON products.productsId = ordersDetails.productsId
                    WHERE orders.ordersId = ${ordersId}`, { type: Sequelize.QueryTypes.SELECT })  
                x.ordersDetails = orderDetail

                const getFinalPrice = await sequelize.query(`SELECT SUM (partialPrice) FROM ordersDetails
                    WHERE ordersDetails.ordersId = ${ordersId}`, { type: Sequelize.QueryTypes.SELECT })
                x.finalPrice = getFinalPrice

                })
            .then(response => res.status(200).send(ordersByUsers))
            .catch(error => console.log('Error! ', error) || res.status(400).json({ error: "error" }))
        }
        startSee()
    },

    seeOrderByOrderId: async (req, res) => {
        try {
            const ordersId = req.params.ordersId
            
            const orderInfo = await sequelize.query(`SELECT orders.status, orders.time, users.fullname, users.address FROM orders
                INNER JOIN users ON users.userId = orders.userId
                WHERE ordersId = ${ordersId}`, { type: Sequelize.QueryTypes.SELECT })

            const ordersDetails = await sequelize.query(`SELECT products.productsName, products.price, ordersDetails.amount, ordersDetails.paymentMethod FROM orders
                INNER JOIN users ON users.userId = orders.userId
                INNER JOIN ordersDetails ON ordersDetails.ordersId = orders.ordersId
                INNER JOIN products ON products.productsId = ordersDetails.productsId
                WHERE orders.ordersId = ${ordersId}`, { type: Sequelize.QueryTypes.SELECT })  
            
            orderInfo[0].orderDetail = ordersDetails
            res.status(200).send(orderInfo)
        } catch(error){
            return error
        }

    },

    updateOrderStatus: (req, res) => {
        const status = req.body.status
        const ordersId = req.params.ordersId
        sequelize.query(`UPDATE orders SET status = '${status}' WHERE ordersId = ${ordersId}`)
            .then(result => console.log(result) || res.status(200).json({result: 'status actualizado'}))
            .catch(error => console.log(error) || res.status(400).json({error : 'no se pudo actualizar'}))
    },

    deleteOrder: async (req, res) => {
        const ordersId = req.params.ordersId
        const deleteDetails = await sequelize.query(`DELETE FROM ordersDetails WHERE ordersId = ${ordersId}`)
        sequelize.query(`DELETE FROM orders WHERE ordersId = ${ordersId}`)
            .then(result => res.status(204).json())
            .catch(error => console.log('Error! ', error) || res.status(400).send("algo salio mal"))
    }
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

function partialPrice (priceOK, amount) {
    return priceOK * amount
}