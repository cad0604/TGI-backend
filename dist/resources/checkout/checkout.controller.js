import { CheckoutService } from './checkout.service.js';
export var CheckoutController;
(function (CheckoutController) {
    CheckoutController.ModuleOne = async (req, res, next) => {
        try {
            res.status(201).json(await CheckoutService.ModuleOne(req, res));
        }
        catch (e) {
            next(e);
        }
    };
    CheckoutController.BillingDetails = async (req, res, next) => {
        try {
            res.status(201).json(await CheckoutService.Billing(req, res));
        }
        catch (e) {
            next(e);
        }
    };
    CheckoutController.CheckOut = async (req, res, next) => {
        try {
            res.status(200).json(await CheckoutService.CheckoutNew(req, res));
        }
        catch (e) {
            next(e);
        }
    };
})(CheckoutController || (CheckoutController = {}));
