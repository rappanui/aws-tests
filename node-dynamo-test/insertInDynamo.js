'use strict'
const ObjectUtils = require('./object-utils')
const Dynamo = require('./dynamo')
const fs = require("fs")

let raw = fs.readFileSync('./payload-with-offers-2.json');  
let obj = JSON.parse(raw)
generateIds(obj)

const db = new Dynamo("dev-partner-table")
db.insert(obj)
// console.log(obj)

function generateIds(body) {
    const utils = new ObjectUtils()
    const { name, offers } = body
  
    body.id = utils.generateIdBy(name)
    if (offers) {
        offers.forEach(offer => {
            offer.id = body.id.concat(utils.generateIdBy(offer.description))
        })
    }
  }