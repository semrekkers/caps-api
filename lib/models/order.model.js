const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const OrderEntrySchema = new Schema({
  product: { type: ObjectId, required: true, ref: 'Product' },
  productSize: { type: String, required: true },
  quantity: { type: Number }
});

const OrderSchema = new Schema({
  user: { type: ObjectId, required: true, ref: 'User' },
  entries: { type: [OrderEntrySchema], required: true },
  totalPrice: { type: Number, required: true },
  status: { type: String, required: true }
});

module.exports = {
  OrderEntry: mongoose.model('OrderEntry', OrderEntrySchema),
  Order: mongoose.model('Order', OrderSchema)
};
