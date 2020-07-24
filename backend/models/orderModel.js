import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: String, required: true },
        product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
        },
  });

const orderSchema = new mongoose.Schema({
    cartItems: [orderItemSchema],
    firstName: { type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String},
    address: {type: String, required: true},
    facturare: {type: String, required: true},
    country: {type: String, required: true},
    destinationRegion: {type: String, requried: true},
    destinationPhone: {type: String},
    destinationAddress: {type: String, required: true},
    destinationName: {type: String},
    date: {type: String},
    hour: {type: String},
    anonym: {type: String},
    methoddelivery: {type: String, required: true},
    payment: {type: String, required: true},
    comments: {type: String},
    totalPrice: {type: String, required: true}
});

const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;