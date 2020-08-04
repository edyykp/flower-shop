import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, default: 0, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  madeOf: {type: String, required: true}
}, {
  timestamps: true
});

const productModel = mongoose.model('Product', productSchema);

export default productModel;