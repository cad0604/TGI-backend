import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
const GroupModel = new mongoose.Schema({
    groupName: {
        type: String,
        default: null,
        unique: true,
    },
    groupCode: {
        type: String,
        default: () => nanoid(),
        unique: true,
    },
    description: {
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
        default: '1',
    },
}, {
    timestamps: true,
    versionKey: false,
});
export const groupModel = mongoose.model('iam_group', GroupModel);
