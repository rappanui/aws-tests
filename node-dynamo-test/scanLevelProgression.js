let AWS = require('aws-sdk');
AWS.config.update({
 "region": "us-east-1",
 "accessKeyId": "AKIAR4AJPA4BQ5JJUFUM",
 "secretAccessKey": "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"
});

run()

async function run() {
    let docClient = new AWS.DynamoDB.DocumentClient();

    let params = {
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

    const { Items } = await scan(params)
    console.log(Items[0])
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