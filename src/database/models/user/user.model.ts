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
import mongoose from 'mongoose';
import { User } from './types.js';
import { UserSchema } from './user.schema.js';

export namespace UserModel {
  export const CredentialModel = mongoose.model<User.Credentials>(
    'user_credentials',
    UserSchema.CredentialSchema,
  );
  export const BureauCredentialModel = mongoose.model<User.BureauCredential>(
    'bureau_credential_individual',
    UserSchema.BureauCredentialSchema,
  );
  export const IndividualDetailsModel = mongoose.model<User.IndividualDetails>(
    'user_details_individual',
    UserSchema.IndividualDetailsSchema,
  );
  export const AddressModel = mongoose.model<User.Address>(
    'user_address_individual',
    UserSchema.AddressSchema,
  );
  export const IndividualIdentityModel =
    mongoose.model<User.IndividualIdentity>(
      'individual_identity',
      UserSchema.IndividualIdentitySchema,
    );
  export const FPAccountModel = mongoose.model<User.FPAccount>(
    'FPAccount_individual',
    UserSchema.FPAccountSchema,
  );
}
