import mongoose, { Schema } from 'mongoose';
const PasswordSessionModel = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user_details',
    },
    typeOfSession: {
        type: String,
        enum: ['newUserPassword', 'newSetPassword', 'newForgotPassword'],
    },
}, {
    timestamps: true,
    versionKey: false,
});
export const passwordSessionModel = mongoose.model('password_session', PasswordSessionModel);
