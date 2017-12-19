const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const OrderEntrySchema = new Schema({
    product: { type: ObjectId, required: true, ref: 'Product' },
    productVariant: { type: ObjectId, required: true, ref: 'ProductVariant' },
    quantity: { type: Number }
});

const OrderSchema = new Schema({
    user: { type: ObjectId, required: true, ref: 'User' },
    totalPrice: { type: Number, required: true }
});

module.exports = { 
    OrderEntry: mongoose.model('OrderEntry', OrderEntrySchema),
    Order: mongoose.model('Order', OrderSchema)
};