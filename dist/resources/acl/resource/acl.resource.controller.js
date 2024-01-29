import { AclResourceService } from './acl.resource.service.js';
export var AclResourceController;
(function (AclResourceController) {
    AclResourceController.ResourceAdd = async (req, res, next) => {
        try {
            res.status(201).json(await AclResourceService.ResourceAdd(req));
        }
        catch (e) {
            next(e);
        }
    };
    AclResourceController.ResourceEdit = async (req, res, next) => {
        try {
            res.status(201).json(await AclResourceService.ResourceEdit(req));
        }
        catch (e) {
            next(e);
        }
    };
    AclResourceController.ResourceRemove = async (req, res, next) => {
        try {
            res.status(201).json(await AclResourceService.ResourceRemove(req));
        }
        catch (e) {
            next(e);
        }
    };
    AclResourceController.ResourceList = async (req, res, next) => {
        try {
            res.status(204).json(await AclResourceService.ResourceList(req));
        }
        catch (e) {
            next(e);
        }
    };
    AclResourceController.ResourceView = async (req, res, next) => {
        try {
            res.status(200).json(await AclResourceService.ResourceView(req));
        }
        catch (e) {
            next(e);
        }
    };
})(AclResourceController || (AclResourceController = {}));
