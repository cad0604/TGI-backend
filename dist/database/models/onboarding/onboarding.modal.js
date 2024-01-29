import mongoose, { Schema } from 'mongoose';
const onboardingModal = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user_credentials',
    },
    personal_credit_repair: {
        user_profile_details: {
            type: Boolean,
            default: false,
        },
        bureau_credentials: {
            type: Boolean,
            default: false,
        },
        buy_plan: {
            type: Boolean,
            default: false,
        },
        upload_documents: {
            type: Boolean,
            default: false,
        },
        positive_freeze_account: {
            type: Boolean,
            default: false,
        },
    },
}, {
    timestamps: true,
    versionKey: false,
});
export const onboarding = mongoose.model('onboarding_status', onboardingModal);
