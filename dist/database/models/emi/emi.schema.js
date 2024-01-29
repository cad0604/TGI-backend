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
import mongoose, { Types } from 'mongoose';
export var EmiSchema;
(function (EmiSchema) {
    const Emi = new mongoose.Schema({
        amount: {
            type: Number,
            default: null,
        },
        dueDate: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            enum: ['0', '1', '2'],
            default: '0',
        },
    });
    EmiSchema.ModuleOneSchema = new mongoose.Schema({
        user_id: {
            type: Types.ObjectId,
            ref: 'user_credentials',
        },
        emi: [Emi],
        status: {
            type: String,
            enum: ['0', '1', '2'],
            default: '0',
        },
    }, {
        timestamps: true,
        versionKey: false,
    });
})(EmiSchema || (EmiSchema = {}));
