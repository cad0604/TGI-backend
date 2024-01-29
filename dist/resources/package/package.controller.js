import { PackageService } from './package.service.js';
export var PackageController;
(function (PackageController) {
    PackageController.PackageAdd = async (req, res, next) => {
        try {
            res.status(201).json(await PackageService.PackageAdd(req, res));
        }
        catch (e) {
            next(e);
        }
    };
    PackageController.PackageUpdate = async (req, res, next) => {
        try {
            res.status(200).json(await PackageService.PackageUpdate(req, res));
        }
        catch (e) {
            next(e);
        }
    };
    PackageController.PackageList = async (req, res, next) => {
        try {
            res.status(200).json(await PackageService.PackageList());
        }
        catch (e) {
            next(e);
        }
    };
})(PackageController || (PackageController = {}));
