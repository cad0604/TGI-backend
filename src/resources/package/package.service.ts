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
import { Request, Response } from 'express';
import { PackageModel } from '../../database/models/index.js';

export namespace PackageService {
  export const PackageAdd = async (req: Request, res: Response) => {
    try {
      const existingPackage = await PackageModel.MPackageModel.findOne({
        name: req?.body?.name,
      });

      if (existingPackage) {
        return Promise.reject({
          code: 409,
          Success: false,
          message: 'Package with the same name already exists',
        });
      }
      if (req?.body?.module == 'PCR') {
        const limitModulePcr = await PackageModel.MPackageModel.find({
          module: req?.body?.module,
        });
        if (limitModulePcr.length >= 3) {
          return Promise.reject({
            code: 409,
            Success: false,
            message: 'Maximum 3 Packages Crossed ',
          });
        }
      }
      const newPackage = new PackageModel.MPackageModel(req?.body);

      const savedPackage = await newPackage.save();

      return Promise.resolve({
        code: 201,
        Success: true,
        message: 'Package added successfully',
        data: savedPackage,
      });
    } catch (e) {
      console.error('Error:', e);
      return Promise.reject({
        code: 500,
        Success: false,
        message: 'Internal Server Error',
        error: e,
      });
    }
  };
  export const PackageUpdate = async (req: Request, res: Response) => {
    try {
      const packageId = req.params.id;

      const existingPackage = await PackageModel.MPackageModel.findById(
        packageId,
      );

      if (!existingPackage) {
        return Promise.reject({
          code: 404,
          Success: false,
          message: 'Package not found',
        });
      }

      // If the package exists, update its properties
      Object.assign(existingPackage, req.body);

      const updatedPackage = await existingPackage.save();

      return Promise.resolve({
        code: 200,
        Success: true,
        message: 'Package updated successfully',
        data: updatedPackage,
      });
    } catch (e) {
      console.error('Error:', e);
      return Promise.reject({
        code: 500,
        Success: false,
        message: 'Internal Server Error',
        error: e,
      });
    }
  };
  export const PackageList = async () => {
    try {
      const Find = await PackageModel.MPackageModel.aggregate([
        {
          $match: {
            module: 'PCR',
            status: '1',
          },
        },
        {
          $project: {
            'pricing._id': 0,
            'bulletPoints._id': 0,
          },
        },
        {
          $sort: {
            'pricing.basePrice': -1,
          },
        },
      ]).allowDiskUse(true);

      return Promise.resolve({
        code: 200,
        Success: true,
        message: 'Package get successfully',
        data: Find,
      });
    } catch (e) {
      console.error('Error:', e);
      return Promise.reject({
        code: 500,
        Success: false,
        message: 'Internal Server Error',
        error: e,
      });
    }
  };
}
