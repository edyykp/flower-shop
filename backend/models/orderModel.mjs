import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: String, required: true },
        textGift: {type: String},
        product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
        },
  });

const orderSchema = new mongoose.Schema({
    user: { type: String },
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
    date: {type: String, required: true},
    hour: {type: String, required: true},
    anonym: {type: String, required: true},
    methoddelivery: {type: String, required: true},
    payment: {type: String, required: true},
    comments: {type: String},
    totalPrice: {type: String, required: true},
    companyName:{type:String, default: ""},
    cui:{type:String, default: ""},
    state: {type: Number, default: 0}
}, {
  timestamps: true
});

const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;