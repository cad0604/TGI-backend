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

export namespace User {
  type TString = string | null | undefined;
  type TProviders = 'IdentityfyIQ' | 'SmartCredit';
  type TGenderEnum = 'male' | 'female' | 'other';
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
  export interface Credentials {
    _id: TString;
    email: TString;
    phone: TString;
    password: TString;
    policy: boolean;
    group: TString;
    role: TString | TString[];
    permission_id: string;
    status: '0' | '1' | '2';
    createdAt?: boolean | string;
    updatedAt?: boolean | string;
  }
  export interface BureauCredential {
    _id: TString;
    user_id: Types.ObjectId | null | undefined;
    provider: TProviders;
    username: TString;
    phone: TString;
    password: TString;
    notes: TString;
  }
  export interface IndividualDetails {
    _id: TString;
    user_id: Types.ObjectId | null | undefined;
    photo: TString;
    firstName: TString;
    lastName: TString;
    gender: TGenderEnum;
    dob: TString;
    createdAt?: boolean | string;
    updatedAt?: boolean | string;
  }
  export interface CompanyDetails {
    _id: TString;
    user_id: string;
    photo: TString;
    createdAt?: boolean | string;
    updatedAt?: boolean | string;
  }
  export interface Address {
    _id: TString;
    user_id: Types.ObjectId | null | undefined;
    cityName: TString;
    zipCode: TString;
    state: TString;
    isDefault: boolean;
    createdAt?: boolean | string;
    updatedAt?: boolean | string;
  }
  export interface IndividualIdentity {
    user_id: Types.ObjectId | null | undefined;
    identityCard1: [TFileInfo];
    identityCard2: [TFileInfo];
    identityCardDetails: TString;
    proofOfAddress1: [TFileInfo];
    proofOfAddress2: [TFileInfo];
    proofOfAddressDetails: TString;
    socialSecurityCard1: [TFileInfo];
    socialSecurityCard2: [TFileInfo];
    socialSecurityCardDetails: TString;
  }

  export interface FPAccount {
    _id: TString;
    user_id: Types.ObjectId | null | undefined;
    primaryAccounts: string[];
    freezeAccount: string[];
    createdAt?: boolean | string;
    updatedAt?: boolean | string;
  }
}
