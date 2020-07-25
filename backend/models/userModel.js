import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String},
    email: {type: String, required: true, unique: true, dropDups: true},
    password: {type: String, required: true},
    isAdmin: { type: Boolean, required: true, default: false},
    confirmedEmail: {type: Boolean, default: false}
});

const userModel = mongoose.model("User", userSchema);

export default userModel;