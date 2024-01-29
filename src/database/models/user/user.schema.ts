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
import mongoose, { Types } from 'mongoose';
import { User } from './types.js';

export namespace UserSchema {
  export const CredentialSchema = new mongoose.Schema<User.Credentials>(
    {
      email: {
        type: String,
        default: null,
        unique: true,
      },
      phone: {
        type: String,
        default: null,
        unique: true,
      },
      password: {
        type: String,
        default: null,
      },
      group: {
        type: String,
        default: null,
      },
      role: {
        type: String || Array,
        default: null,
      },
      status: {
        type: String,
        enum: ['0', '1', '2'],
        default: '0',
      },
      policy: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );
  export const BureauCredentialSchema =
    new mongoose.Schema<User.BureauCredential>(
      {
        user_id: {
          type: Types.ObjectId,
          ref: 'user_credentials',
        },
        provider: {
          type: String,
          enum: ['IdentityfyIQ', 'SmartCredit'],
        },
        username: {
          type: String,
          default: null,
        },
        phone: {
          type: String,
          default: null,
          unique: true,
        },
        password: {
          type: String,
          default: null,
        },
      },
      {
        timestamps: true,
        versionKey: false,
      },
    );
  export const IndividualDetailsSchema =
    new mongoose.Schema<User.IndividualDetails>(
      {
        user_id: {
          type: Types.ObjectId,
          ref: 'user_credentials',
        },
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        gender: {
          type: String,
          enum: ['male', 'female', 'other'],
        },
        dob: {
          type: String,
        },
      },
      {
        timestamps: true,
        versionKey: false,
      },
    );
  export const AddressSchema = new mongoose.Schema<User.Address>({
    user_id: {
      type: Types.ObjectId,
      ref: 'user_credentials',
    },
    cityName: {
      type: String,
      default: null,
    },
    zipCode: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  });
  export const IndividualIdentitySchema =
    new mongoose.Schema<User.IndividualIdentity>(
      {
        user_id: {
          type: Types.ObjectId,
          ref: 'user_credentials',
        },
        proofOfAddress1: [],
        proofOfAddress2: [],
        proofOfAddressDetails: {
          type: String,
          default: null,
        },
        identityCard1: [],
        identityCard2: [],
        identityCardDetails: {
          type: String,
          default: null,
        },
        socialSecurityCard1: [],
        socialSecurityCard2: [],
        socialSecurityCardDetails: {
          type: String,
          default: null,
        },
      },
      {
        timestamps: true,
        versionKey: false,
      },
    );
  export const FPAccountSchema = new mongoose.Schema<User.FPAccount>(
    {
      user_id: {
        type: Types.ObjectId,
        ref: 'user_credentials',
      },
      freezeAccount: [],
      primaryAccounts: [],
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );
}
