const mongoose = require('../../config/database/index')
const Schema = mongoose.Schema;

const salao = new Schema({
    create: {type: Date, default: Date.now},
    cortes: {
        cabelo: {
            dinheiro: {type: String, default: 0},
            cartao: {type: String, default: 0},
        },
        barba: {
            dinheiro: {type: String, default: 0},
            cartao: {type: String, default: 0},
        }
    },
    bebidas: {
        coca: {
            quantidade: {type: String, default: 0},
        },
        budweiser: {
            quantidade: {type: String, default: 0},
        },
        skol: {
            quantidade: {type: String, default: 0},
        },
        stella: {
            quantidade: {type: String, default: 0},
        },
        bonafont: {
            quantidade: {type: String, default: 0},
        },
    },
    produtos: {
        gel: {
            quantidade: {type: String, default: 0},
        },
        cera: {
            quantidade: {type: String, default: 0},
        }
    }
})

const barbearia = mongoose.model('tbl_barbearia', salao)

module.exports = {
    barbearia
}
