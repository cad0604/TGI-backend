import mongoose, { Schema } from 'mongoose';
const EmailModel = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user_details',
    },
    email: {
        type: BigInt,
        default: null,
    },
}, {
    timestamps: true,
    versionKey: false,
});
export const emailModel = mongoose.model('sent_emails', EmailModel);
