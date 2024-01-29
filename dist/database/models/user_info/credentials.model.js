import mongoose, { Schema } from 'mongoose';
const CredentialsModel = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user_details',
    },
    email: {
        type: String,
        default: null,
        unique: true,
    },
    phone: {
        type: String,
        default: null,
        unique: true,
    },
    password: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum: ['0', '1', '2', '3'],
        //0 Draft
        //1 Active
        //2 Inactive
        //3 Permanent Disabled
        default: '0',
    },
    group: {
        type: [String],
        enum: ['0', '1', '2', '3'],
        default: [null],
    },
    roles: {
        type: [String],
        enum: ['0', '1', '2', '3'],
        default: [null],
    },
}, {
    versionKey: false,
    timestamps: true,
});
export const userCredentialsModel = mongoose.model('User_credentials', CredentialsModel);
