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
export var OnboardedSchema;
(function (OnboardedSchema) {
    OnboardedSchema.OnboardedModuleOneSchema = new mongoose.Schema({
        user_id: {
            type: Types.ObjectId,
            ref: 'user_credentials',
        },
        signUp: {
            type: Boolean,
            default: false,
        },
        BureauCredential: {
            type: Boolean,
            default: false,
        },
        meeting: {
            type: Boolean,
            default: false,
        },
        Plan: {
            type: Boolean,
            default: false,
        },
        Docs: {
            type: Boolean,
            default: false,
        },
        pfAccount: {
            type: Boolean,
            default: false,
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
    }, {
        timestamps: true,
        versionKey: false,
    });
    OnboardedSchema.OnboardedModuleThreeSchema = new mongoose.Schema({
        application_id: { type: mongoose.Schema.Types.ObjectId, default: null },
        BusinessDetails: { type: Boolean, default: false },
        ApplicantDetails: { type: Boolean, default: false },
        LoanDetails: { type: Boolean, default: false },
        documentation: { type: Boolean, default: false },
    }, {
        timestamps: true,
        versionKey: false,
    });
    OnboardedSchema.OnboardedModuleFourSchema = new mongoose.Schema({
        user_id: {
            type: Types.ObjectId,
            ref: 'user_credentials',
        },
        ContactRequest: {
            type: Boolean,
            default: false,
        },
        callBack: {
            type: Boolean,
            default: false,
        },
    }, {
        timestamps: true,
        versionKey: false,
    });
})(OnboardedSchema || (OnboardedSchema = {}));
