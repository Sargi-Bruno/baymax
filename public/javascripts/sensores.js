function receberValores() {
    $.get('/sensores/receberValores', 
    function(returnedData, statusRequest) {
        if(returnedData === 'ERRO') {
            console.log('erro')
            alert('Erro: ' + returnedData.data)
        }
        else {
            exibirValor(returnedData.data)
        }
        
    })
}

function exibirValor(valor) {
    var temperatura = valor[0].temperatura
    var umidade = valor[0].umidade
    var co2 = valor[0].co2

    console.log('comeco')
    console.log(valor)
    console.log(valor[0].temperatura)
    console.log(temperatura)
    console.log('fim')

    document.getElementById('temperatura').innerHTML = temperatura
    document.getElementById('umidade').innerHTML = umidade
    document.getElementById('co2').innerHTML = co2
}