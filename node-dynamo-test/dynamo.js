'use strict'
let AWS = require('aws-sdk')
AWS.config.update({
    "region": "us-east-1",
    "accessKeyId": "AKIAR4AJPA4BQ5JJUFUM",
    "secretAccessKey": "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"
   });
const client = new AWS.DynamoDB.DocumentClient()

class Dynamo {

    constructor(table) {
        this.table = table
    }
  
    async insert(item) {
        const params = {
            TableName: this.table,
            Item: item
        }

        return new Promise((resolve, reject) => {
            client.put(params, (err, data) => {
                if (err)
                    reject(err)
                else
                    resolve(data)
            })
        })
    }
}

module.exports = Dynamo