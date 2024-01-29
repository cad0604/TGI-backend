import { LeadModel, OnboardedModel, } from '../../../../database/models/index.js';
export var LeadServiceThree;
(function (LeadServiceThree) {
    LeadServiceThree.BusinessDetails = async (req) => {
        try {
            const NewBusinessDetails = new LeadModel.BusinessFundingBusinessDetailsModel(req.body);
            const SaveBusinessDetails = await NewBusinessDetails.save();
            const NewOnboarded = new OnboardedModel.ModuleThreeModel({
                application_id: SaveBusinessDetails._id,
                BusinessDetails: true,
            });
            const saveOnboarded = await NewOnboarded.save();
            return Promise.resolve({
                code: 200,
                Success: true,
                message: 'Business details saved successfully',
                data: saveOnboarded,
            });
        }
        catch (e) {
            return Promise.reject({
                code: 500,
                Success: false,
                message: 'Internal Server Error',
                error: e,
            });
        }
    };
    LeadServiceThree.ApplicantDetails = async (req) => {
        try {
            const NewBusinessDetails = new LeadModel.BusinessFundingApplicantDetailsModel(req.body);
            await NewBusinessDetails.save();
            const saveOnboarded = await OnboardedModel.ModuleThreeModel.findOneAndUpdate({
                application_id: req.body.application_id,
            }, {
                $set: {
                    ApplicantDetails: true,
                },
            }, { new: true });
            return Promise.resolve({
                code: 200,
                Success: true,
                message: 'Applicant details saved successfully',
                data: saveOnboarded,
            });
        }
        catch (e) {
            return Promise.reject({
                code: 500,
                Success: false,
                message: 'Internal Server Error',
                error: e,
            });
        }
    };
    LeadServiceThree.LoanDetails = async (req) => {
        try {
            const NewLoanDetails = new LeadModel.BusinessFundingLoanDetailsModel(req.body);
            await NewLoanDetails.save();
            const saveOnboarded = await OnboardedModel.ModuleThreeModel.findOneAndUpdate({
                application_id: req.body.application_id,
            }, {
                $set: {
                    LoanDetails: true,
                },
            }, { new: true });
            return Promise.resolve({
                code: 200,
                Success: true,
                message: 'Business details saved successfully',
                data: saveOnboarded,
            });
        }
        catch (e) {
            return Promise.reject({
                code: 500,
                Success: false,
                message: 'Internal Server Error',
                error: e,
            });
        }
    };
    LeadServiceThree.Documentation = async (req) => {
        try {
            console.log(req.files);
            const NewDocumentation = new LeadModel.BusinessFundingDocumentationModel({
                application_id: req.body.application_id,
                tAndC: req.body.tAndC,
                ownership: req.body.tAndC,
                signature: Array.isArray(req.files)
                    ? req.files[0]
                    : req.files?.['signature']?.[0] || undefined,
                bankStatement: Array.isArray(req.files)
                    ? undefined
                    : req.files?.['bankStatement']?.[0] || undefined,
            });
            await NewDocumentation.save();
            const saveOnboarded = await OnboardedModel.ModuleThreeModel.findOneAndUpdate({
                application_id: req.body.application_id,
            }, {
                $set: {
                    documentation: true,
                },
            }, { new: true });
            return Promise.resolve({
                code: 200,
                Success: true,
                message: 'Documentation saved successfully',
                data: saveOnboarded,
            });
        }
        catch (e) {
            return Promise.reject({
                code: 500,
                Success: false,
                message: 'Internal Server Error',
                error: e,
            });
        }
    };
})(LeadServiceThree || (LeadServiceThree = {}));
