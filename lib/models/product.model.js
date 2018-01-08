const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const ProductSizeSchema = new Schema({
  label: { type: String },
  inStock: { type: Number }
});

const ProductVariantSchema = new Schema({
  nameSuffix: { type: String },
  color: { type: String },
  sizes: { type: [ProductSizeSchema] },
  imageUrl: { type: String }
});

const ProductSchema = new Schema({
  name: { type: String },
  category: { type: String, index: true },
  gender: { type: String, index: true },
  price: { type: Number },
  productVariants: { type: [ProductVariantSchema], index: true }
});

module.exports = {
  ProductSize: mongoose.model('ProductSize', ProductSizeSchema),
  ProductVariant: mongoose.model('ProductVariant', ProductVariantSchema),
  Product: mongoose.model('Product', ProductSchema)
};