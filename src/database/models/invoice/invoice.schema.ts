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
import { Invoice } from './types.js';

export namespace InvoiceSchema {
  export const ModuleOneSchema = new mongoose.Schema<Invoice.ModuleOne>(
    {
      user_id: {
        type: Types.ObjectId,
        ref: 'user_credentials',
      },
      billing_id: {
        type: Types.ObjectId,
        ref: 'user_credentials',
      },
      serviceDetails: {},
    },
    {
      timestamps: true,
      versionKey: true,
    },
  );
}
