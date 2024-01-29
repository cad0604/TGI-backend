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
import { LeadSchema } from './lead.schema.js';
export var LeadModel;
(function (LeadModel) {
    LeadModel.ModuleFourModel = mongoose.model('lead_for_digital_marketing', LeadSchema.DigitalMarketing);
    LeadModel.BusinessFundingBusinessDetailsModel = mongoose.model('business_funding_business_details', LeadSchema.BusinessFundingBusinessDetails);
    LeadModel.BusinessFundingApplicantDetailsModel = mongoose.model('business_funding_applicant_details', LeadSchema.BusinessFundingApplicantDetailsSchema);
    LeadModel.BusinessFundingLoanDetailsModel = mongoose.model('business_funding_loan_details', LeadSchema.BusinessFundingLoanDetailsSchema);
    LeadModel.BusinessFundingDocumentationModel = mongoose.model('business_funding_documentation', LeadSchema.BusinessFundingDocumentationSchema);
})(LeadModel || (LeadModel = {}));
