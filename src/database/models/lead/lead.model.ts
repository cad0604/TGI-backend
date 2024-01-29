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
import mongoose from 'mongoose';
import { Type } from './type.js';
import { LeadSchema } from './lead.schema.js';

export namespace LeadModel {
  export const ModuleFourModel = mongoose.model<Type.IDigitalMarketing>(
    'lead_for_digital_marketing',
    LeadSchema.DigitalMarketing,
  );
  export const BusinessFundingBusinessDetailsModel =
    mongoose.model<Type.IBusinessFundingBusinessDetails>(
      'business_funding_business_details',
      LeadSchema.BusinessFundingBusinessDetails,
    );
  export const BusinessFundingApplicantDetailsModel =
    mongoose.model<Type.IBusinessFundingApplicantDetails>(
      'business_funding_applicant_details',
      LeadSchema.BusinessFundingApplicantDetailsSchema,
    );
  export const BusinessFundingLoanDetailsModel =
    mongoose.model<Type.IBusinessFundingLoanDetails>(
      'business_funding_loan_details',
      LeadSchema.BusinessFundingLoanDetailsSchema,
    );
  export const BusinessFundingDocumentationModel =
    mongoose.model<Type.IBusinessFundingDocumentation>(
      'business_funding_documentation',
      LeadSchema.BusinessFundingDocumentationSchema,
    );
}
