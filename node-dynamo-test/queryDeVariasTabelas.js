// GET DA AWS É APENAS PARA BUSCAR POR PK
let AWS = require('aws-sdk');
AWS.config.update({
 "region": "us-east-1",
 "accessKeyId": "AKIAR4AJPA4BQ5JJUFUM",
 "secretAccessKey": "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"
});

run()

async function run() {
    let userName = '093d8062-0c27-4f99-8330-d466b4f2ca80';
    let params = {
        TableName: "dev-user-profile",
        Key: {
            user: decodeURI(userName)
        }
    }
    const { Item: { amount: amount, user: user } } = await busca(params)


    let params2 = {
        TableName: "dev-level-progression",
        FilterExpression: "#minPoints <= :points and #maxPoints >= :points",
        ExpressionAttributeNames: {
            "#minPoints": "min",
            "#maxPoints": "max"
        },
        ExpressionAttributeValues: {
            ":points": new Number(1800)
        }
    }
    const { Items: [{ level: level }] } = await scan(params2)

    console.log(profile = { user, amount, level });
}

async function busca(params) {
    let docClient = new AWS.DynamoDB.DocumentClient()
    return new Promise((resolve, reject) => { 
        docClient.get(params, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}

async function scan(params) {
    let docClient = new AWS.DynamoDB.DocumentClient()
    return new Promise((resolve, reject) => { 
        docClient.scan(params, function (err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}