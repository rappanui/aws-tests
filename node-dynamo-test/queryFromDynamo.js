// GET DA AWS É APENAS PARA BUSCAR POR PK
let AWS = require('aws-sdk');
AWS.config.update({
 "region": "us-east-1",
 "accessKeyId": "AKIAR4AJPA4BQ5JJUFUM",
 "secretAccessKey": "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"
});

let docClient = new AWS.DynamoDB.DocumentClient();

let table = "dev-partner-offers-table";
let pId = '1da4cc300ba0536793427d6b8dc06208';
let params = {
    TableName: table,
    IndexName: "byPartner",
    KeyConditionExpression: "partner = :partnerId",
    ExpressionAttributeValues: {
        ":partnerId": pId
    }
};


docClient.query(params, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        if (data) {
            console.log(JSON.stringify(data, null, 2));
        } else {
            console.log("No offers for this partner.")
        }
    }
});
