var contextDialog = '{}'

function sendMessageToAssistant() {
    var textMessage = document.chatForm.textMessage.value
    chat = document.getElementById('chat')

    if(textMessage === undefined || textMessage === '')
        textMessage = ''
    else 
        chat.innerHTML += 'Você: ' + textMessage + '<br><br>'

    document.chatForm.textMessage.value = ''

    $.post("/ibmWatson/assistant", 
        { text: textMessage, contextDialog },
        function(returnedData, statusRequest) {
            if(returnedData.status === 'ERRO')
                alert(returnedData.data)
            else {
                chat.innerHTML += 'Baymax: ' + returnedData.data.result.output.text + '<br><br>'
                contextDialog = JSON.stringify(returnedData.data.result.context)
            }
        }
    )
    .fail(function(returnedData) {
        alert('Erro: ' + returnedData.status + ' ' + returnedData.statusText)
    })
}

$(document).keypress(
    function(event) {
        if(event.which == '13') {
            event.preventDefault()
            sendMessageToAssistant()
        }
    }
)

$(document).ready(function(){
    sendMessageToAssistant()
})