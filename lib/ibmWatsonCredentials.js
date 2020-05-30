const AssistantV1 = require('ibm-watson/assistant/v1')
const { IamAuthenticator } = require('ibm-watson/auth')

const assistant = new AssistantV1({
  url: 'https://api.us-east.assistant.watson.cloud.ibm.com/instances/91bc7707-fe4e-49f4-975c-289901f3f3e3',
  version: '2020-01-04',
  authenticator: new IamAuthenticator({ apikey: 'aiJg8K8_hvdhtdqoZg8xAnDpctWuy4-6yBVK1NDR2h95' })
})

module.exports = {assistant}