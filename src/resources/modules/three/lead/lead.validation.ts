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
import { z } from 'zod';

export namespace LeadValidation {
  export const BusinessDetails = {
    body: z
      .object({
        businessLegalName: z.string(),
        dba: z.string(),
        entityType: z.string(),
        startDate: z.string(),
        taxId: z.string(),
        businessType: z.string(),
        phone: z.string(),
        email: z.string().email(),
        addressLine1: z.string(),
        addressLine2: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
      })
      .strict(),
  };
  export const ApplicantDetail = {
    body: z
      .object({
        application_id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        creditScore: z.string(),
        dob: z.string(),
        ssn: z.string(),
        addressLine1: z.string(),
        addressLine2: z.string().nullable(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
      })
      .strict(),
  };
  export const LoanDetails = {
    body: z
      .object({
        application_id: z.string(),
        loanAmount: z.string(),
        useOfFunds: z.string(),
        avgMonthlyRevenue: z.string(),
        desiredProduct: z.string(),
        existingLoan: z.boolean(),
        balance: z.string().nullable(),
      })
      .strict(),
  };
  export const Documentation = {
    body: z.object({
      application_id: z.string(),
      bankStatement: z.custom<File>(),
      tAndC: z.string(),
      signature: z.custom<File>(),
      ownership: z.string(),
    }),
  };
}
