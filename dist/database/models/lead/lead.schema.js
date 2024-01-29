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
export var LeadSchema;
(function (LeadSchema) {
    LeadSchema.DigitalMarketing = new mongoose.Schema({
        companyName: {
            type: String,
            required: true,
            default: null,
        },
        ownerName: {
            type: String,
            required: true,
            default: null,
        },
        email: {
            type: String,
            required: true,
            default: null,
        },
        phone: {
            type: String,
            required: true,
            default: null,
        },
        budget: {
            type: Number,
            required: true,
            default: null,
        },
        days: {
            type: Number,
            required: true,
            default: null,
        },
        status: {
            type: String,
            enum: ['0', '1', '2'],
            required: true,
            default: '0',
        },
    }, {
        timestamps: true,
        versionKey: false,
    });
    LeadSchema.BusinessFundingBusinessDetails = new mongoose.Schema({
        businessLegalName: { type: String, required: true },
        dba: { type: String, required: true },
        entityType: { type: String, required: true },
        startDate: { type: String, required: true },
        taxId: { type: String, required: true },
        businessType: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        status: {
            type: String,
            enum: ['0', '1', '2'],
            required: true,
            default: '0',
        },
    }, {
        timestamps: true,
        versionKey: false,
    });
    LeadSchema.BusinessFundingApplicantDetailsSchema = new mongoose.Schema({
        application_id: {
            type: Types.ObjectId,
            ref: 'business_funding_business_details',
        },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        creditScore: { type: String, required: true },
        dob: { type: String, required: true },
        ssn: { type: String, required: true },
        addressLine1: { type: String, required: true },
        addressLine2: { type: String },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
    }, {
        timestamps: true,
        versionKey: false,
    });
    LeadSchema.BusinessFundingLoanDetailsSchema = new mongoose.Schema({
        application_id: {
            type: Types.ObjectId,
            ref: 'business_funding_business_details',
        },
        loanAmount: { type: String, required: true },
        useOfFunds: { type: String, required: true },
        avgMonthlyRevenue: { type: String, required: true },
        desiredProduct: { type: String, required: true },
        existingLoan: { type: Boolean, default: false },
        balance: { type: String, default: '0' },
    }, {
        timestamps: true,
        versionKey: false,
    });
    LeadSchema.BusinessFundingDocumentationSchema = new mongoose.Schema({
        application_id: {
            type: Types.ObjectId,
            ref: 'business_funding_business_details',
        },
        bankStatement: { type: [], required: true },
        tAndC: { type: String, required: true },
        signature: { type: [], required: true },
        ownership: { type: String, required: true },
    }, {
        timestamps: true,
        versionKey: false,
    });
})(LeadSchema || (LeadSchema = {}));
