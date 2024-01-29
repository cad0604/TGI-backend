import { LeadsService } from './leads.service.js';
export var LeadsController;
(function (LeadsController) {
    LeadsController.Leads = async (req, res, next) => {
        try {
            res.status(200).json(await LeadsService.Leads(req));
        }
        catch (e) {
            next(e);
        }
    };
})(LeadsController || (LeadsController = {}));
