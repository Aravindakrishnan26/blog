const mongoose = require('mongoose');

const postschema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    author: { type: String, required: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
    UpadatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('post', postschema);