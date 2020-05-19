const Sequelize = require ('sequelize')
const sequelize = new Sequelize('mysql://root@localhost:3306/delilah')

const jwt = require('jsonwebtoken')
const jwtSign = 'secretoJWT#shh'

module.exports = {
    register: (req, res) => {
        sequelize.query('INSERT INTO users (username, fullname, email, phone, address, password) VALUES (:username, :fullname, :email, :phone, :address, :password)',
            { replacements: req.body })
        .then(result => console.log(result) || res.status(201).json({result: "el usuario se ha registrado con éxito"}))
        .catch(error => console.log('Error! ', error) || res.status(400).send("los datos ingresados son incorrectos"))
    },
    
    login: async (req, res) => {
        const { username, password } = req.body
        const seqPass = await sequelize.query(`SELECT password FROM users WHERE username = "${username}"`, { type: Sequelize.QueryTypes.SELECT })
        const isAdmin = await sequelize.query(`SELECT isAdmin FROM users WHERE username = "${username}"`, { type: Sequelize.QueryTypes.SELECT })
        const userId = await sequelize.query(`SELECT userId FROM users WHERE username = "${username}"`, { type: Sequelize.QueryTypes.SELECT })     
        const busquedaPass = seqPass.find(item => item.password == password)
        const busquedaAdmin = isAdmin.find(item => item.isAdmin === 1)
        if(busquedaPass == undefined) {
            res.status(400).send("usuario o contraseña incorrecta")
        }
        else if (busquedaAdmin == undefined) {
            const username = req.body
            const token = jwt.sign({
                userId,
                username
            }, jwtSign)
            res.json({ token})
        }
        else {
            const username = req.body
            const token = jwt.sign({
                userId,
                username,
                busquedaAdmin
            }, jwtSign)
            res.json({ token})
        }
    },

    getUsers: (req,res) => {
        sequelize.query(`SELECT * FROM users`, { type: Sequelize.QueryTypes.SELECT })
            .then(result => console.log(result) || res.status(200).json(result).end())
            .catch(error => console.log('error ' + error) || res.status(400).json({error : 'no hay usuarios registrados'}))
    },

    updateUserData: (req,res) => {
        const userId = req.params.userId
        const newAddress = req.body.address
        const newPhone = req.body.phone
        sequelize.query(`UPDATE users SET address = '${newAddress}', phone = ${newPhone} WHERE userId = ${userId}`, { type: Sequelize.QueryTypes.UPDATE })
            .then(result => console.log(result) || res.status(200).json({result: 'Informacion actualizada'}))
            .catch(error => console.log('error ' + error) || res.status(400).json({error : "algo salio mal"}))
    },

    upgradeToAdmin: (req,res) => {
        const userId = req.params.userId
        const isAdmin = req.body.isAdmin
        sequelize.query(`UPDATE users SET isAdmin = '${isAdmin}' WHERE userId = ${userId}`, { type: Sequelize.QueryTypes.UPDATE })
            .then(result => console.log(result) || res.status(200).json({result: 'Informacion actualizada'}))
            .catch(error => console.log('error ' + error) || res.status(400).json({error : "algo salio mal"}))
    }
}