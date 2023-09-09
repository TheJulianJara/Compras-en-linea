const { model, Schema } = require('mongoose');

const productSchema = new Schema({
    name: String,
    price: Number,
    description: String,
    id: String,
});

module.exports = model('Products', productSchema);