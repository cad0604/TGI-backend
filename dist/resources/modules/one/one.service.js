import bcrypt from 'bcrypt';
import { moduleOneEvent } from '../../../helper/events/modules.one.events.helper.js';
import jwt from 'jsonwebtoken';
import { Rsa } from '../../../vendor/index.js';
import { UserModel } from '../../../database/models/user/user.model.js';
import { deleteFilesForIdentity } from '../../../utils/delete/delete.utils.js';
import { OnboardedModel, PackageModel, } from '../../../database/models/index.js';
export var OneService;
(function (OneService) {
    OneService.SignUp = async (req) => {
        try {
            const checkUserCredentialEmail = await UserModel.CredentialModel.findOne({
                email: req?.body?.email,
            });
            const checkUserCredentialPhone = await UserModel.CredentialModel.findOne({
                phone: req?.body?.phone,
            });
            if (checkUserCredentialEmail) {
                return Promise.reject({
                    code: 400,
                    Success: false,
                    path: 'email',
                    message: 'Email already in use',
                });
            }
            if (checkUserCredentialPhone) {
                return Promise.reject({
                    code: 400,
                    Success: false,
                    path: 'phone',
                    message: 'Phone number already in use',
                });
            }
            const passwordEncryption = await bcrypt.hash(req?.body?.cnfPassword, 10);
            const newCredential = new UserModel.CredentialModel({
                email: req?.body?.email,
                phone: req?.body?.phone,
                role: 'PCR:Customer',
                group: 'PCR',
                password: passwordEncryption,
                permission_id: '1585',
                policy: req?.body?.policy,
            });
            const saveCredential = await newCredential.save();
            moduleOneEvent.emit('PasswordSave', req, saveCredential);
            const accessToken = jwt.sign({
                _id: saveCredential._id,
                role: saveCredential.role,
                group: saveCredential.group,
                permission_id: saveCredential.permission_id,
            }, Rsa.privateKey, {
                algorithm: 'RS256',
                expiresIn: '1d',
                issuer: 'Sourav Ganguli',
            });
            const refreshToken = jwt.sign({}, Rsa.privateKey, {
                algorithm: 'RS256',
                expiresIn: '30d',
                issuer: 'Sourav Ganguli',
            });
            return Promise.resolve({
                code: 201,
                Success: true,
                message: 'User Sign up successfully',
                accessToken: accessToken,
                refreshToken: refreshToken,
                urlPath: '/onboarding/pcr/pull-report',
            });
        }
        catch (e) {
            return Promise.reject(e);
        }
    };
    OneService.BureauCredential = async (req, res) => {
        try {
            const { provider, username, phone, password, notes } = req.body;
            const userId = res?.locals?._id;
            const existingBureauCredential = await UserModel.BureauCredentialModel.findOne({
                user_id: userId,
                provider: provider,
            });
            if (existingBureauCredential) {
                existingBureauCredential.username = username;
                existingBureauCredential.phone = phone;
                existingBureauCredential.password = password;
                existingBureauCredential.notes = notes;
                await existingBureauCredential.save();
                return Promise.resolve({
                    code: 200,
                    Success: true,
                    message: 'Bureau Credential updated successfully',
                    urlPath: '/onboarding/pcr/meeting',
                });
            }
            const newBureauCredential = new UserModel.BureauCredentialModel({
                user_id: userId,
                provider: provider,
                username: username,
                phone: phone,
                password: password,
                notes: notes,
            });
            const savedBureauCredential = await newBureauCredential.save();
            return Promise.resolve({
                code: 200,
                Success: true,
                message: 'Bureau Credential saved successfully',
                urlPath: '/onboarding/pcr/meeting',
            });
        }
        catch (e) {
            // Handle errors and reject the promise
            console.error('Error:', e);
            return Promise.reject({
                code: 500,
                Success: false,
                message: 'Internal Server Error',
            });
        }
    };
    OneService.Meeting = async (req, res) => {
        try {
            if (!res.locals.decode._id) {
                return Promise.reject({
                    code: 400,
                    Success: false,
                    message: 'User ID not available in the request',
                });
            }
            const userId = res.locals.decode._id;
            await OnboardedModel.ModuleOneModel.updateOne({ user_id: userId }, {
                $set: {
                    meeting: true,
                },
            });
            return Promise.resolve({
                code: 200,
                Success: true,
                message: 'Meeting status saved successfully',
                urlPath: '/onboarding/pcr/plans',
            });
        }
        catch (e) {
            console.error('Error:', e);
            return Promise.reject({
                code: 500,
                Success: false,
                message: 'Internal Server Error',
            });
        }
    };
    OneService.Plan = async () => {
        try {
            const Find = await PackageModel.MPackageModel.aggregate([
                {
                    $match: {
                        module: 'PCR',
                        status: '1',
                    },
                },
                {
                    $project: {
                        stripe: 0,
                        'pricing._id': 0,
                        'bulletPoints._id': 0,
                    },
                },
                {
                    $sort: {
                        'pricing.basePrice': -1,
                    },
                },
            ]).allowDiskUse(true);
            return Promise.resolve({
                code: 200,
                Success: true,
                message: 'Plan get successfully',
                data: Find,
            });
        }
        catch (e) {
            console.error('Error:', e);
            return Promise.reject({
                code: 500,
                Success: false,
                message: 'Internal Server Error',
                error: e,
            });
        }
    };
    OneService.Docs = async (req, res) => {
        try {
            const fileUploads = req.files;
            if (!fileUploads || !Object.keys(fileUploads).length) {
                return Promise.reject({
                    code: 400,
                    Success: false,
                    message: 'Files not available',
                });
            }
            const proofOfAddressArray1 = fileUploads?.proofOfAddress1?.map((file) => file);
            const socialSecurityCardArray1 = fileUploads?.socialSecurityCard1?.map((file) => file);
            const identityCardArray1 = fileUploads?.identityCard1?.map((file) => file);
            const proofOfAddressArray2 = fileUploads?.proofOfAddress2?.map((file) => file);
            const socialSecurityCardArray2 = fileUploads?.socialSecurityCard2?.map((file) => file);
            const identityCardArray2 = fileUploads?.identityCard2?.map((file) => file);
            const userId = res.locals.decode._id;
            const oldUserData = await UserModel.IndividualIdentityModel.findOne({
                user_id: userId,
            });
            if (oldUserData) {
                await deleteFilesForIdentity(oldUserData?.identityCard1?.map((file) => file?.filename), identityCardArray1?.map((file) => file?.filename));
                await deleteFilesForIdentity(oldUserData.socialSecurityCard1?.map((file) => file?.filename), socialSecurityCardArray1?.map((file) => file?.filename));
                await deleteFilesForIdentity(oldUserData.proofOfAddress1?.map((file) => file?.filename), proofOfAddressArray1?.map((file) => file?.filename));
                await deleteFilesForIdentity(oldUserData?.identityCard2?.map((file) => file?.filename), identityCardArray2?.map((file) => file?.filename));
                await deleteFilesForIdentity(oldUserData.socialSecurityCard2?.map((file) => file?.filename), socialSecurityCardArray2?.map((file) => file?.filename));
                await deleteFilesForIdentity(oldUserData.proofOfAddress2?.map((file) => file?.filename), proofOfAddressArray2?.map((file) => file?.filename));
            }
            const updatedUser = await UserModel.IndividualIdentityModel.findOneAndUpdate({ user_id: userId }, {
                $set: {
                    identityCard1: identityCardArray1,
                    socialSecurityCard1: socialSecurityCardArray1,
                    proofOfAddress1: proofOfAddressArray1,
                    identityCard2: identityCardArray2,
                    socialSecurityCard2: socialSecurityCardArray2,
                    proofOfAddress2: proofOfAddressArray2,
                },
            }, { new: true });
            if (!updatedUser) {
                return Promise.reject({
                    code: 404,
                    Success: false,
                    message: 'User not found',
                });
            }
            return Promise.resolve({
                code: 200,
                Success: true,
                message: 'File uploaded successfully',
                urlPath: '/onboarding/pcr/pf',
            });
        }
        catch (e) {
            console.error('Error:', e);
            return Promise.reject({
                code: 500,
                Success: false,
                message: 'Internal Server Error',
            });
        }
    };
    OneService.FPAccount = async (req, res) => {
        try {
            if (!res.locals.decode._id) {
                return Promise.reject({
                    code: 400,
                    Success: false,
                    message: 'User ID not available in the request',
                });
            }
            const { primaryAccounts, freezeAccount } = req.body;
            const userId = res.locals.decode._id;
            const existingFPAccount = await UserModel.FPAccountModel.findOne({
                user_id: userId,
            });
            if (existingFPAccount) {
                existingFPAccount.primaryAccounts = primaryAccounts;
                existingFPAccount.freezeAccount = freezeAccount;
                const updatedFPAccount = await existingFPAccount.save();
                return Promise.resolve({
                    code: 200,
                    Success: true,
                    message: 'FP Account updated successfully',
                    data: updatedFPAccount,
                    urlPath: '/dashboard/pcr',
                });
            }
            const newFPAccount = new UserModel.FPAccountModel({
                user_id: userId,
                primaryAccounts: primaryAccounts,
                freezeAccount: freezeAccount,
            });
            const savedFPAccount = await newFPAccount.save();
            return Promise.resolve({
                code: 200,
                Success: true,
                message: 'FP Account saved successfully',
                data: savedFPAccount,
            });
        }
        catch (e) {
            console.error('Error:', e);
            return Promise.reject({
                code: 500,
                Success: false,
                message: 'Internal Server Error',
            });
        }
    };
})(OneService || (OneService = {}));
