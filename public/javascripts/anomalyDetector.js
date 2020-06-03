const fs = require('fs')
const parse = require("csv-parse/lib/sync");
const AnomalyDetector = require('@azure/cognitiveservices-anomalydetector')
const msRest = require('@azure/ms-rest-js')

let CSV_FILE = './baymax-data.csv'

let key = 'a60c099710d04b1e954cc02e644c3cd1'
let endpoint = 'https://westus2.api.cognitive.microsoft.com/anomalydetector'
let credentials = new msRest.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } })

let points = []

console.log(endpoint)

let anomalyDetectorClient = new AnomalyDetector.AnomalyDetectorClient(credentials, endpoint)

function readFile(){
    let input = fs.readFileSync(CSV_FILE).toString();
    let parsed = parse(input, {skip_empty_lines:true});
    parsed.forEach(function(e){
      points.push({timestamp:new Date(e[0]), value: parseFloat(e[1])});
    });
}
readFile()

async function batchCall(){
    let body = { series: points, granularity: 'daily' }

    await anomalyDetectorClient.entireDetect(body)
        .then((response) => {
            console.log("Verificando anomalias nos dados: ")
            for (let item = 0; item < response.isAnomaly.length; item++) {
                if (response.isAnomaly[item]) {
                    console.log("Uma anomalia foi detectada na linha: " + item)
                } 
            }
        }).catch((error) => {
            console.log(error)
        })  
    
}
batchCall()

async function lastDetection(){
    let body = { series: points, granularity: 'daily' }

        await anomalyDetectorClient.lastDetect(body)
            .then((response) => {
                console.log("Último ponto onde uma anomalia foi detectada: ")
                if (response.isAnomaly) {
                    console.log("Último ponto na linha " + points.length + " foi detectado como anomalia")
                } else {
                    console.log("Último ponto na linha " + points.length + " não foi detectado como anomalia")
                }
            }).catch((error) => {
                console.log(error)
            })  
}
lastDetection()