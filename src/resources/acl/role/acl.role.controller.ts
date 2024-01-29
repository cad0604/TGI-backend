/*******************************************************************************
 * Copyright (c) iamsouravganguli 2023.
 * @author Sourav Ganguli <mysganguli@gmail.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 ******************************************************************************/
import { NextFunction, Request, Response } from 'express';
import { AclRoleService } from './acl.role.service.js';

export namespace AclRoleController {
  export const RoleAdd = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(201).json(await AclRoleService.RoleAdd(req));
    } catch (e) {
      next(e);
    }
  };
  export const RoleEdit = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(201).json(await AclRoleService.RoleEdit(req));
    } catch (e) {
      next(e);
    }
  };
  export const RoleRemove = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(201).json(await AclRoleService.RoleRemove(req));
    } catch (e) {
      next(e);
    }
  };
  export const RoleList = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(204).json(await AclRoleService.RoleList(req));
    } catch (e) {
      next(e);
    }
  };
  export const RoleView = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(200).json(await AclRoleService.RoleView(req));
    } catch (e) {
      next(e);
    }
  };
}
