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
import { Router } from 'express';
import { validateRequest } from 'zod-express-middleware';
import { LeadValidation } from './lead.validation.js';
import { LeadControllerThree } from './lead.controller.js';
import { ThreeUpload } from '../../../../vendor/multer/config.js';
export var ThreeLeadRoutes;
(function (ThreeLeadRoutes) {
    ThreeLeadRoutes.index = Router();
    ThreeLeadRoutes.index.post('/modules/three.lead.business_details', [
        validateRequest(LeadValidation.BusinessDetails),
        LeadControllerThree.BusinessDetails,
    ]);
    ThreeLeadRoutes.index.post('/modules/three.lead.applicant_details', [
        validateRequest(LeadValidation.ApplicantDetail),
        LeadControllerThree.ApplicantDetails,
    ]);
    ThreeLeadRoutes.index.post('/modules/three.lead.loan_details', [
        validateRequest(LeadValidation.LoanDetails),
        LeadControllerThree.LoanDetails,
    ]);
    ThreeLeadRoutes.index.post('/modules/three.lead.documentation', [
        ThreeUpload.fields([
            {
                name: 'bankStatement',
                maxCount: 1,
            },
            {
                name: 'signature',
                maxCount: 1,
            },
        ]),
        validateRequest(LeadValidation.Documentation),
        LeadControllerThree.Documentation,
    ]);
})(ThreeLeadRoutes || (ThreeLeadRoutes = {}));
