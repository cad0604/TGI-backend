import mongoose from 'mongoose';
const RoleModel = new mongoose.Schema({
    groupName: {
        type: String,
        default: null,
    },
    groupCode: {
        type: String,
        default: null,
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
        default: '0',
    },
}, {
    timestamps: true,
    versionKey: false,
});
export const roleModel = mongoose.model('im_role', RoleModel);
