let AWS = require('aws-sdk');
AWS.config.update({
 "region": "us-east-1",
 "accessKeyId": "AKIAR4AJPA4BQ5JJUFUM",
 "secretAccessKey": "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"
});

let docClient = new AWS.DynamoDB.DocumentClient();

var params = {
    TableName: "dev-achievement",
    FilterExpression: "points <= :points",
        ExpressionAttributeValues: {
            ":points": new Number(1800)
        }
}

docClient.scan(params, onScan);

function onScan(err, data) {
    if (err) {
        console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
    } else {        
        console.log(JSON.stringify(data, null, 2))
    }
}