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
import { Request } from 'express';
import {
  LeadModel,
  OnboardedModel,
} from '../../../../database/models/index.js';

export namespace LeadServiceFour {
  export const Add = async (req: Request) => {
    try {
      const NewFourLeadRequest = new LeadModel.ModuleFourModel(req.body);
      const SaveFourLeadRequest = await NewFourLeadRequest.save();
      const NewOnboarded = new OnboardedModel.ModuleFourModel({
        user_id: SaveFourLeadRequest._id,
        ContactRequest: true,
      });
      const saveOnboarded = await NewOnboarded.save();
      return Promise.resolve({
        code: 200,
        Success: true,
        message: 'Lead saved successfully',
        data: saveOnboarded,
      });
    } catch (e) {
      return Promise.reject({
        code: 500,
        Success: false,
        message: 'Internal Server Error',
        error: e,
      });
    }
  };
}
