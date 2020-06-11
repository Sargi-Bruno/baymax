const express = require('express')
const mysql = require('mysql') 

const routes = express.Router()

var config = 
{
    host: 'sql10.freemysqlhosting.net', //servidor do banco mysql (server name do serviço)
    user: 'sql10347665', //usuario (server adm login name do serviço)
    password: 'vUqPUZqUpn', //senha do servidor configurada no serviço
    database: 'sql10347665', //nome da base de dados (esquema criado)
    port: 3306 //porta do mysql, normalmente 3306
}

const conn = new mysql.createConnection(config)

conn.connect(
    function(err) {
        if(err) {
            console.log('Erro: ')
            throw err
        }
        else {
            console.log('Conexão com o banco estabelecida!')
        }
    }
)

routes.get('/receberValores', (req, res) => {

    conn.query('select * from Envio order by id desc limit 1;',
    function(err, rows) {
        if(err) 
        res.json({ status: 'ERRO', data: err.toString()})

        else 
        res.json({ status: 'OK', data: rows})
    })
})

module.exports = routes
