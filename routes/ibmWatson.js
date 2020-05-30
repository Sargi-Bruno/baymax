const express = require('express')
const ibmWatson = require('../lib/ibmWatsonCredentials')

const routes = express.Router()

routes.post('/assistant', (req, res) => {
  const { text, contextDialog } = req.body
  context = JSON.parse(contextDialog)
  const params = {
    input: { text },
    workspaceId: '87be3810-a5db-48bd-9218-9680a8326d2f',
    context
  }
  ibmWatson.assistant.message(
    params,
    function (err, response) {
      if (err)
        res.json({ status: 'ERRO', data: err.toString() })
      else
        res.json({ status: 'OK', data: response })
    }
  )
})

module.exports = routes