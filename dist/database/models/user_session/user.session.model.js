import mongoose, { Schema } from 'mongoose';
const UserSessionModel = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user_details',
    },
    deviceInfo: {
        type: Object,
    },
}, {
    timestamps: true,
    versionKey: false,
});
UserSessionModel.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });
export const userSessionModel = mongoose.model('user_session', UserSessionModel);
