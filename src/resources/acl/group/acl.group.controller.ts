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
import { AclGroupService } from './acl.group.service.js';

export namespace AclGroupController {
  export const GroupAdd = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(201).json(await AclGroupService.GroupAdd(req));
    } catch (e) {
      next(e);
    }
  };
  export const GroupEdit = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(201).json(await AclGroupService.GroupEdit(req));
    } catch (e) {
      next(e);
    }
  };
  export const GroupRemove = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(201).json(await AclGroupService.GroupRemove(req));
    } catch (e) {
      next(e);
    }
  };
  export const GroupList = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(204).json(await AclGroupService.GroupList(req));
    } catch (e) {
      next(e);
    }
  };
  export const GroupView = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(200).json(await AclGroupService.GroupView(req));
    } catch (e) {
      next(e);
    }
  };
}
