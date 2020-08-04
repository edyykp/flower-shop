import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String},
    email: {type: String, required: true, unique: true, dropDups: true},
    password: {type: String, required: true},
    isAdmin: { type: Boolean, required: true, default: false},
    confirmedEmail: {type: Boolean, default: false},
    address: {type: String, default: ""},
    companyName: {type: String, default: ""},
    cui: {type: String, default: ""},
    resetLink: {data: String, default:""}
}, {
    timestamps: true
  });

const userModel = mongoose.model("User", userSchema);

export default userModel;