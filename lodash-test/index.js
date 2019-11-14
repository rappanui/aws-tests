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
    const {preferences, id} = userInput.Item
    let filter = "id <> :id AND ( "
    let attributes = {
        ":id" : id
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

    var userData = {
        id: id,
        MatchedUsers:[]
    }
    
    for (const item of Items) {
        currentUser = {}
        const percentual = getMatchPercentual(preferences, item.preferences)
        // console.info(`User: ${id} matches ${percentual}% with user: ${item.id}`)
        
        currentUser = {
            id: item.id,
            percentual: percentual
        }
        userData.MatchedUsers.push(currentUser)
    }
    console.log(userData)
    insertMatchedUsers(userData)
}

function getMatchPercentual(userPreferences, currentUserPreferences) {
    const equal = _.intersectionWith(userPreferences, currentUserPreferences, _.isEqual)
    return Math.floor((equal.length / userPreferences.length) * 100)
}

function insertMatchedUsers(userData){
    const db = new Dynamo('dev-user-profile')
    db.insert(userData)
}