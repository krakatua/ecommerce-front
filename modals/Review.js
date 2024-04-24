const { Schema, models, model, default: mongoose } = require("mongoose");


const reviewSchema = new Schema({
    productId: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true 
    },
    rating: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
    
})

export const Review = models?.Review || model("Review", reviewSchema);