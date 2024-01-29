import { IamService } from '../../services/iam/iam.service.js';
export var IamController;
(function (IamController) {
    IamController.add = async (req, res, next) => {
        try {
            res.status(201).json(await IamService.group.add(req));
        }
        catch (e) {
            next(e);
        }
    };
    IamController.update = async (req, res, next) => {
        try {
        }
        catch (e) {
            next(e);
        }
    };
    IamController.remove = async (req, res, next) => {
        try {
            res.status(200).json(await IamService.group.remove(req));
        }
        catch (e) {
            next(e);
        }
    };
    IamController.list = async (req, res, next) => {
        try {
            res.status(204).json({
                data: req.headers,
            });
        }
        catch (e) {
            next(e);
        }
    };
})(IamController || (IamController = {}));
