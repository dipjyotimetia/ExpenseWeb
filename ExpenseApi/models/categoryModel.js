const mongoose = require('mongoose');
const { Schema } = mongoose;

let categoryModel = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        isActive: { type: Boolean, required: true, default: false },
        createdAt: { type: Date, default: Date.now },
        subCategory: {
            name: { type: String, required: true },
            description: { type: String, required: true },
            isActive: { type: Boolean, required: true, default: false }
        }
    },
    {
        versionKey: false,
    }
);

categoryModel.pre('save', next => {
    now = new Date();
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
})

module.exports = mongoose.model('Category', categoryModel);