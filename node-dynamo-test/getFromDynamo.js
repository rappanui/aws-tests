let AWS = require('aws-sdk');
AWS.config.update({
 "region": "us-east-1",
 "accessKeyId": "AKIAR4AJPA4BQ5JJUFUM",
 "secretAccessKey": "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"
});

let docClient = new AWS.DynamoDB.DocumentClient();

let table = "dev-partner-table";
let pId = 'c389543eae0d7adb20be4a304e98c6f3';
let params = {
    TableName: table,
    Key: {
        id: pId
    }
};


docClient.get(params, function (err, data) {
    if (err) {
        console.log(err);
    } else {
        if (data.Item.offers) {
            console.log(JSON.stringify(data.Item.offers, null, 2));
        } else {
            console.log("No offers for this partner.")
        }
    }
});
