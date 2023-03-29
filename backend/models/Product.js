const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    createdOn: { 
        type: Date, 
        default: Date.now 
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['SKIN', 'MAKEUP', 'NAILS', 'HAIR'],
        default: 'SKIN'
    },
    imagesrc: { 
        type: String 
    },
    type: { 
        type: String, 
        default: 'product' 
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'user' 
    },
   
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
