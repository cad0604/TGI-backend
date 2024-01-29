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
import { AclResourceService } from './acl.resource.service.js';

export namespace AclResourceController {
  export const ResourceAdd = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(201).json(await AclResourceService.ResourceAdd(req));
    } catch (e) {
      next(e);
    }
  };
  export const ResourceEdit = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(201).json(await AclResourceService.ResourceEdit(req));
    } catch (e) {
      next(e);
    }
  };
  export const ResourceRemove = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(201).json(await AclResourceService.ResourceRemove(req));
    } catch (e) {
      next(e);
    }
  };
  export const ResourceList = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(204).json(await AclResourceService.ResourceList(req));
    } catch (e) {
      next(e);
    }
  };
  export const ResourceView = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      res.status(200).json(await AclResourceService.ResourceView(req));
    } catch (e) {
      next(e);
    }
  };
}
