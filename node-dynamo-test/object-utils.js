'use strict'
const uuid = require('uuid/v4')
const crypto = require('crypto')
/**
 * Classe com métodos utilitários para trabalhar com objetos
 */
class ObjectUtils {

    /**
     * Gera um hash randomico e insere no objeto no campo id, caso
     * o objeto não possua
     * @param {Object} item o objeto que terá o ID inserido
     */
    generateRandomId(item) {
        if (!item.hasOwnProperty('id'))
            item.id = uuid()
    }
    /**
     * Gera um ID (hash) a partir de um campo da tabela
     * @param {String} field o campo usado como base para criar o ID
     */
    generateIdBy(field) {
        return crypto.createHash('md5').update(field).digest('hex')
    }
}

module.exports = ObjectUtils