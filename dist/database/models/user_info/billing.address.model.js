import mongoose, { Schema } from 'mongoose';
import { USAStates } from '../../../data/states.js';
const BillingAddressModel = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user_credentials',
    },
    cityName: {
        type: String,
        default: null,
    },
    zipCode: {
        type: String,
        default: null,
    },
    state: {
        type: String,
        enum: Object.values(USAStates),
        default: null,
    },
    default: {
        type: Boolean,
        default: false,
    },
});
export const userBillingAddressModel = mongoose.model('user_billing_address', BillingAddressModel);
