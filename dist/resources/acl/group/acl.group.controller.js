import { AclGroupService } from './acl.group.service.js';
export var AclGroupController;
(function (AclGroupController) {
    AclGroupController.GroupAdd = async (req, res, next) => {
        try {
            res.status(201).json(await AclGroupService.GroupAdd(req));
        }
        catch (e) {
            next(e);
        }
    };
    AclGroupController.GroupEdit = async (req, res, next) => {
        try {
            res.status(201).json(await AclGroupService.GroupEdit(req));
        }
        catch (e) {
            next(e);
        }
    };
    AclGroupController.GroupRemove = async (req, res, next) => {
        try {
            res.status(201).json(await AclGroupService.GroupRemove(req));
        }
        catch (e) {
            next(e);
        }
    };
    AclGroupController.GroupList = async (req, res, next) => {
        try {
            res.status(204).json(await AclGroupService.GroupList(req));
        }
        catch (e) {
            next(e);
        }
    };
    AclGroupController.GroupView = async (req, res, next) => {
        try {
            res.status(200).json(await AclGroupService.GroupView(req));
        }
        catch (e) {
            next(e);
        }
    };
})(AclGroupController || (AclGroupController = {}));
