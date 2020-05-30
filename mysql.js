const mysql = require('mysql') 

var config = 
{
    host: 'sql10.freemysqlhosting.net', //servidor do banco mysql (server name do serviço)
    user: 'sql10344004', //usuario (server adm login name do serviço)
    password: 'VeitjwTEvt', //senha do servidor configurada no serviço
    database: 'sql10344004', //nome da base de dados (esquema criado)
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

enviarValores()

function selectAll() {

    console.log('Buscar todos os dados do banco')
    conn.query('SELECT * FROM Envio;', 
    function(err, results, fields) {
        if(err) throw err
        else console.log('Encontrado: ' + results.length + ' linha(s)')

        for(i = 0; i < results.length; i++) {
            console.log('Linha: ' + JSON.stringify(results[i]))
        }
    })

    conn.end(
        function(err) {
            if(err) throw err
        }
    )
}

function deleteAll() {

    conn.query('DELETE FROM Envio', 
    function(err, results, fields) {
        if(err) throw err
        else console.log('Dados deletados com sucesso!!')
    })
}

function enviarValores() {
    var x

    x = setInterval(valores, 10000)
}

function valores() {

    var t = 22
    var h = 50
    var ppm = 450

    var dt = Math.random()
    var dh = Math.random()
    var dppm = Math.random()

    if(t == 34) {
        t = t - 1
    }
    else if(t == 16) {
        t = t + 1
    }
    else if(dt < 0.6) {
        t = t
    }
    else if(dt < 0.8) {
        t = t + 1
    }
    else {
        t = t - 1
    }

    if(h == 80) {
        h = h - 1
    }
    else if(h == 30) {
        h = h + 1
    }
    else if(dh < 0.6) {
        h = h
    }
    else if(dh < 0.8) {
        h = h + 1
    }
    else {
        h = h - 1
    }

    if(ppm == 1200) {
        ppm = ppm - 1
    }
    else if(ppm == 200) {
        ppm = ppm + 1
    }
    else if(dppm < 0.4) {
        ppm = ppm
    }
    else if(dppm < 0.6) {
        ppm = ppm + 1
    }
    else {
        ppm = ppm - 1
    }

    conn.query('INSERT INTO Envio (temperatura, umidade, co2) VALUES (?, ?, ?);', [t, h, ppm],
    function(err, results, fields) {
        if(err) throw err

        console.log('Inserido ' + results.affectedRows + ' linha(s).')
    })
}
