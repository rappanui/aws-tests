'use strict'
const jwtDecoder = require('jwt-decode')

class Decoder {

    constructor(token) {
        this.token = token
    }

    getAccountId() {
        const decoded = decodeJwt(this.token)
        return decoded.ACCOUNT_ID
    }
}

/**
 * Decodifica um jwt token
 */
function decodeJwt(token) {
    return jwtDecoder(token)
}


module.exports = Decoder