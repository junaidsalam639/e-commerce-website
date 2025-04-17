import { Schema, model, models } from 'mongoose';


const signupSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Signup = (models.Signup) || model('Signup', signupSchema);

export default Signup;

