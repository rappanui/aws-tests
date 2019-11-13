const AWS = require('aws-sdk')
const _ = require('lodash')
AWS.config.update({
    "region": "us-east-1",
    "accessKeyId": "AKIAWM4EHJCWZYXJGOMN",
    "secretAccessKey": "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"
   });

const Dynamo = require('dynamodb-operations')
const db = new Dynamo('dev-user-preferences')

main()

async function main(){
    var user = await getUser()
    getMatchedUsers(user)
    
}

async function getUser() {
    let params = {
        Key: {
            id: '20e23a60-8bfa-45df-a3ad-340eda49136c'
        }
    }
    var userLogged = await db.get(params)
    return userLogged;
}

async function getMatchedUsers(userInput){
    const preferences = userInput.Item.preferences
    let filter = "id <> :id AND ( "
    let attributes = {
        ":id" : userInput.Item.id
    }
    
    for (i=0; i < preferences.length; i++) {
        filter = filter + `contains (preferences, :pref${i})`
        attributes[`:pref${i}`] = preferences[i]
        if(preferences[i+1]){
            filter = filter + " OR "
        } else {
            filter = filter + ")"
        }
    }
    const params = {
        FilterExpression: filter,
        ExpressionAttributeValues: attributes
    }
    const {Items} = await db.scan(params)
    for(const item of Items){
        let equal = _.intersectionWith(preferences, item.preferences, _.isEqual);
        const percentage = Math.floor((equal.length / preferences.length) * 100) + '%'
        console.log("UserId: " + item.id)
        console.log("Porcentagem de match: " + percentage)
        console.log("-----")
    }
}