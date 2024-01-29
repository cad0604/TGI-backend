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
import EventEmitter from 'events';
import { UserModel } from '../../database/models/user/user.model.js';
import moment from 'moment/moment.js';
import { OnboardedModel } from '../../database/models/onboarded/onboarded.model.js';
class ModuleOneEvent extends EventEmitter {
}
export const moduleOneEvent = new ModuleOneEvent();
const moduleOneSignUpParts = async (req, Credentials) => {
    try {
        const newUserAddress = new UserModel.AddressModel({
            user_id: Credentials._id,
            cityName: req?.body?.cityName,
            zipCode: req?.body?.zipCode,
            state: req?.body?.state,
        });
        const newUserDetails = new UserModel.IndividualDetailsModel({
            user_id: Credentials._id,
            firstName: req?.body?.firstName,
            lastName: req?.body?.lastName,
            gender: req?.body?.gender,
            dob: moment(req?.body?.dob).toISOString(),
        });
        const newIndividualIdentity = new UserModel.IndividualIdentityModel({
            user_id: Credentials._id,
            socialSecurityCardDetails: req?.body?.ssn,
        });
        const newModuleOneStatus = new OnboardedModel.ModuleOneModel({
            user_id: Credentials._id,
            signUp: true,
        });
        const userAddress = await newUserAddress.save();
        const userDetails = await newUserDetails.save();
        const individualIdentity = await newIndividualIdentity.save();
        const moduleOneStatus = await newModuleOneStatus.save();
        console.log('User Address saved:', userAddress);
        console.log('User Details saved:', userDetails);
        console.log('User Individual Identity saved:', individualIdentity);
        console.log('moduleOneStatus :', moduleOneStatus);
    }
    catch (e) {
        console.error('Error saving user data:', e);
    }
};
moduleOneEvent.on('PasswordSave', moduleOneSignUpParts);
