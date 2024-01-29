import { AclRoleService } from './acl.role.service.js';
export var AclRoleController;
(function (AclRoleController) {
    AclRoleController.RoleAdd = async (req, res, next) => {
        try {
            res.status(201).json(await AclRoleService.RoleAdd(req));
        }
        catch (e) {
            next(e);
        }
    };
    AclRoleController.RoleEdit = async (req, res, next) => {
        try {
            res.status(201).json(await AclRoleService.RoleEdit(req));
        }
        catch (e) {
            next(e);
        }
    };
    AclRoleController.RoleRemove = async (req, res, next) => {
        try {
            res.status(201).json(await AclRoleService.RoleRemove(req));
        }
        catch (e) {
            next(e);
        }
    };
    AclRoleController.RoleList = async (req, res, next) => {
        try {
            res.status(204).json(await AclRoleService.RoleList(req));
        }
        catch (e) {
            next(e);
        }
    };
    AclRoleController.RoleView = async (req, res, next) => {
        try {
            res.status(200).json(await AclRoleService.RoleView(req));
        }
        catch (e) {
            next(e);
        }
    };
})(AclRoleController || (AclRoleController = {}));
