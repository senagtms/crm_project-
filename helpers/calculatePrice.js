const axios = require("axios")

const totalItemPrice = (piece,unitPrice,taxPercent) => {
    return ((piece * unitPrice ) + (piece * unitPrice* (taxPercent / 100)))
}


module.exports = {
    totalItemPrice
}