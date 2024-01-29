import mongoose, { Schema } from 'mongoose';
import { USAGovernmentIssuedID } from '../../../data/usa.governmentIssued.id.list.js';
const PersonalIdentityModel = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user_credentials',
    },
    identityCard: {
        typeOfCard: {
            type: String,
            enum: Object.values(USAGovernmentIssuedID),
            default: null,
        },
        idNumber: {
            type: String,
            default: null,
        },
        filePath: {
            type: String,
            default: null,
        },
        approved: {
            type: String,
            enum: ['0', '1', '2'],
            default: 0,
        },
    },
}, {
    timestamps: true,
    versionKey: false,
});
export const userPersonalIdentityModel = mongoose.model('personal_identities', PersonalIdentityModel);
