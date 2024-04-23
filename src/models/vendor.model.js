import mongoose from 'mongoose';

// The Vendor schema
const vendorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true 
    },
    password: {
        type: String,
        required: true
    },
    vendorType: {
        type: String,
        enum: ['GMO', 'Natural'], 
        required: true
    },
    generalRank: {
        type: Number,
        default: 0 // Initial
    },
    productRank: {
        type: Number,
        default: 0 // Initial 
    },
    sales: {
        type: Number,
        default: 0 // Initial 
    }
});

export default Vendor = mongoose.model('Vendor', vendorSchema);
