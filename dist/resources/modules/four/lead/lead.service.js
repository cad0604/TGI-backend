import { LeadModel, OnboardedModel, } from '../../../../database/models/index.js';
export var LeadServiceFour;
(function (LeadServiceFour) {
    LeadServiceFour.Add = async (req) => {
        try {
            const NewFourLeadRequest = new LeadModel.ModuleFourModel(req.body);
            const SaveFourLeadRequest = await NewFourLeadRequest.save();
            const NewOnboarded = new OnboardedModel.ModuleFourModel({
                user_id: SaveFourLeadRequest._id,
                ContactRequest: true,
            });
            const saveOnboarded = await NewOnboarded.save();
            return Promise.resolve({
                code: 200,
                Success: true,
                message: 'Lead saved successfully',
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
})(LeadServiceFour || (LeadServiceFour = {}));
