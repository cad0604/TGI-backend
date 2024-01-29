/*******************************************************************************
 * Copyright (c) iamsouravganguli 2024.
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

export namespace LeadServiceThree {
  export const BusinessDetails = async (req: Request) => {
    try {
      const NewBusinessDetails =
        new LeadModel.BusinessFundingBusinessDetailsModel(req.body);
      const SaveBusinessDetails = await NewBusinessDetails.save();
      const NewOnboarded = new OnboardedModel.ModuleThreeModel({
        application_id: SaveBusinessDetails._id,
        BusinessDetails: true,
      });
      const saveOnboarded = await NewOnboarded.save();
      return Promise.resolve({
        code: 200,
        Success: true,
        message: 'Business details saved successfully',
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
  export const ApplicantDetails = async (req: Request) => {
    try {
      const NewBusinessDetails =
        new LeadModel.BusinessFundingApplicantDetailsModel(req.body);
      await NewBusinessDetails.save();

      const saveOnboarded =
        await OnboardedModel.ModuleThreeModel.findOneAndUpdate(
          {
            application_id: req.body.application_id,
          },
          {
            $set: {
              ApplicantDetails: true,
            },
          },
          { new: true },
        );

      return Promise.resolve({
        code: 200,
        Success: true,
        message: 'Applicant details saved successfully',
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

  export const LoanDetails = async (req: Request) => {
    try {
      const NewLoanDetails = new LeadModel.BusinessFundingLoanDetailsModel(
        req.body,
      );
      await NewLoanDetails.save();

      const saveOnboarded =
        await OnboardedModel.ModuleThreeModel.findOneAndUpdate(
          {
            application_id: req.body.application_id,
          },
          {
            $set: {
              LoanDetails: true,
            },
          },
          { new: true },
        );

      return Promise.resolve({
        code: 200,
        Success: true,
        message: 'Business details saved successfully',
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
  export const Documentation = async (req: Request) => {
    try {
      console.log(req.files);
      const NewDocumentation = new LeadModel.BusinessFundingDocumentationModel({
        application_id: req.body.application_id,
        tAndC: req.body.tAndC,
        ownership: req.body.tAndC,
        signature: Array.isArray(req.files)
          ? req.files[0]
          : req.files?.['signature']?.[0] || undefined,
        bankStatement: Array.isArray(req.files)
          ? undefined
          : req.files?.['bankStatement']?.[0] || undefined,
      });

      await NewDocumentation.save();

      const saveOnboarded =
        await OnboardedModel.ModuleThreeModel.findOneAndUpdate(
          {
            application_id: req.body.application_id,
          },
          {
            $set: {
              documentation: true,
            },
          },
          { new: true },
        );

      return Promise.resolve({
        code: 200,
        Success: true,
        message: 'Documentation saved successfully',
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
