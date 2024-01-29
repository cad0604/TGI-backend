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
import { Types } from 'mongoose';

export namespace Type {
  type TString = string | null | undefined;
  type TNumber = Number | null | undefined;
  type TStatus = '0' | '1' | '2';
  type TFileInfo = {
    fieldname: TString;
    originalname: TString;
    encoding: TString;
    mimetype: TString;
    destination: TString;
    filename: TString;
    path: TString;
    size: number;
  };
  interface IDigitalMarketing {
    companyName: TString;
    ownerName: TString;
    email: TString;
    phone: TString;
    days: TNumber;
    budget: TNumber;
    status: TStatus;
  }
  interface IBusinessFundingBusinessDetails {
    businessLegalName: TString;
    dba: TString;
    entityType: TString;
    startDate: TString;
    taxId: TString;
    businessType: TString;
    phone: TString;
    email: TString;
    addressLine1: TString;
    addressLine2: TString;
    city: TString;
    state: TString;
    zipCode: TString;
    status: TStatus;
  }
  interface IBusinessFundingApplicantDetails {
    application_id: Types.ObjectId | null | undefined;
    firstName: TString;
    lastName: TString;
    creditScore: TString;
    dob: TString;
    ssn: TString;
    addressLine1: TString;
    addressLine2: TString;
    city: TString;
    state: TString;
    zipCode: TString;
  }
  interface IBusinessFundingLoanDetails {
    application_id: Types.ObjectId | null | undefined;
    loanAmount: TString;
    useOfFunds: TString;
    avgMonthlyRevenue: TString;
    desiredProduct: TString;
    existingLoan: Boolean;
    balance: TString;
  }
  interface IBusinessFundingDocumentation {
    application_id: Types.ObjectId | null | undefined;
    bankStatement: [TString];
    tAndC: TString;
    signature: [TString];
    ownership: TString;
  }
}
