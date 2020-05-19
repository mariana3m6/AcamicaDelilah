const Sequelize = require ('sequelize')
const sequelize = new Sequelize('mysql://root@localhost:3306/delilah')

module.exports = {
    createProduct: (req, res) => sequelize.query('INSERT INTO products (productsName, price) VALUES (:productsName, :price)',{ replacements: req.body })    
        .then(result => res.status(201).send("el producto se ha cargado con éxito"))
        .catch(error => console.log('Error! ', error) || res.status(400).send("algo salio mal")),
    
    getProducts: (req, res) => sequelize.query('SELECT * FROM products', { type: Sequelize.QueryTypes.SELECT })
        .then(products => res.status(200).json(products))
        .catch(error => console.log('Error! ', error) || res.status(400).send("algo salio mal")),        

    getProduct: async (req, res) => {
        const id = req.params.id
        const products = await sequelize.query(`SELECT * FROM products WHERE productsId = ${id}`, { type: Sequelize.QueryTypes.SELECT })
            .then(products => res.status(200).json(products))
            .catch(error => console.log('Error! ', error) || res.status(400).send("algo salio mal"))
    },

    updateProduct: (req, res) => {
        const id = req.params.id
        const newPrice = req.body.price
        sequelize.query(`UPDATE products SET price = ${newPrice} WHERE productsId = ${id}`)
        if (!newPrice) {
            res.status(400).json({ error: "faltan datos" })
        } else {
            res.json("precio actualizado con éxito")
        }
    },

    deleteProduct: (req, res) => {
        const id = req.params.id
        sequelize.query(`DELETE FROM products WHERE productsId = ${id}`)
            .then(result => res.status(204).json())
            .catch(error => console.log(error) || res.status(400).send(error))
    }
}