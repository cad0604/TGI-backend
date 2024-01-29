import mongoose, { Schema } from 'mongoose';
const BureauCredentialModel = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user_details',
        unique: true,
    },
    bureauName: {
        type: String,
        default: null,
        enum: ['identifyIQ', 'smartCredit'],
    },
    userName: {
        type: String,
        default: null,
    },
    password: {
        type: String,
        default: null,
    },
    phoneNumber: {
        type: String,
        default: null,
    },
    securityWord: {
        type: String,
        default: null,
    },
}, {
    timestamps: true,
    versionKey: false,
});
export const bureauCredentialModel = mongoose.model('bureau_credential', BureauCredentialModel);
