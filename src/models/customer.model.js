import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

// Subdocument schema for cart item
const CartItemSchema = new Schema({
    marketItem: { type: Schema.Types.ObjectId, ref: 'MarketItem' },
    quantity: { type: Number, default: 1 },
    totalPrice: { type: Number, required: true },
});

// Customer schema
const CustomerSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [CartItemSchema], 
});

// Hash password before saving
CustomerSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords
CustomerSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const Customer = mongoose.model('Customer', CustomerSchema);

export default Customer;
