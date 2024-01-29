import { LeadServiceThree } from './lead.service.js';
export var LeadControllerThree;
(function (LeadControllerThree) {
    LeadControllerThree.BusinessDetails = async (req, res, next) => {
        try {
            res.status(201).json(await LeadServiceThree.BusinessDetails(req));
        }
        catch (e) {
            next(e);
        }
    };
    LeadControllerThree.ApplicantDetails = async (req, res, next) => {
        try {
            res.status(201).json(await LeadServiceThree.ApplicantDetails(req));
        }
        catch (e) {
            next(e);
        }
    };
    LeadControllerThree.LoanDetails = async (req, res, next) => {
        try {
            res.status(201).json(await LeadServiceThree.LoanDetails(req));
        }
        catch (e) {
            next(e);
        }
    };
    LeadControllerThree.Documentation = async (req, res, next) => {
        try {
            res.status(201).json(await LeadServiceThree.Documentation(req));
        }
        catch (e) {
            next(e);
        }
    };
})(LeadControllerThree || (LeadControllerThree = {}));
