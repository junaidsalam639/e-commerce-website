import { Schema, model, models } from 'mongoose';


const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Category = (models.Category) || model('Category', categorySchema);

export default Category;

