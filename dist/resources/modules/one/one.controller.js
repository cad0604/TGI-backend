import { OneService } from './one.service.js';
export var OneController;
(function (OneController) {
    OneController.SignUp = async (req, res, next) => {
        try {
            res.status(201).json(await OneService.SignUp(req));
        }
        catch (e) {
            next(e);
        }
    };
    OneController.BureauCredential = async (req, res, next) => {
        try {
            res.status(201).json(await OneService.BureauCredential(req, res));
        }
        catch (e) {
            next(e);
        }
    };
    OneController.Meeting = async (req, res, next) => {
        try {
            res.status(200).json(await OneService.Meeting(req, res));
        }
        catch (e) {
            next(e);
        }
    };
    OneController.Plan = async (req, res, next) => {
        try {
            res.status(200).json(await OneService.Plan());
        }
        catch (e) {
            next(e);
        }
    };
    OneController.Docs = async (req, res, next) => {
        try {
            res.status(200).json(await OneService.Docs(req, res));
        }
        catch (e) {
            next(e);
        }
    };
    OneController.FPAccount = async (req, res, next) => {
        try {
            res.status(200).json(await OneService.FPAccount(req, res));
        }
        catch (e) {
            next(e);
        }
    };
})(OneController || (OneController = {}));
