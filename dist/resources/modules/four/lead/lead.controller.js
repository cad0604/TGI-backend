import { LeadServiceFour } from './lead.service.js';
export var LeadControllerFour;
(function (LeadControllerFour) {
    LeadControllerFour.Add = async (req, res, next) => {
        try {
            res.status(201).json(await LeadServiceFour.Add(req));
        }
        catch (e) {
            next(e);
        }
    };
})(LeadControllerFour || (LeadControllerFour = {}));
