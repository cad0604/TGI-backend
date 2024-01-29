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
import { Package } from './types.js';

export namespace PackageSchema {
  const bulletPointSchema = new mongoose.Schema({
    value: {
      type: String,
      required: true,
    },
    highlight: {
      type: Boolean,
      default: false,
    },
  });

  const pricingSchema = new mongoose.Schema({
    fullPrice: {
      type: Number,
      default: null,
    },
    emiPrice: {
      type: Number,
      default: null,
    },
    intervalType: {
      type: String,
      enum: ['day', 'month', 'week', 'year'],
      default: 'month',
    },
    intervalCount: {
      type: Number,
      default: null,
    },
  });
  export const MPackageSchema = new mongoose.Schema<Package.IPackage>(
    {
      name: {
        type: String,
        required: true,
        unique: true,
      },
      marketingTag: {
        type: String,
        default: null,
      },
      module: {
        type: String,
        default: null,
      },
      stripe: {
        productId: {
          type: String,
          default: null,
        },
        fullPriceId: {
          type: String,
          default: null,
        },
        emiPriceId: {
          type: String,
          default: null,
        },
      },
      position: {
        type: String,
        default: null,
      },
      pricing: pricingSchema,
      bulletPoints: [bulletPointSchema],

      status: {
        type: String,
        enum: ['0', '1', '2'],
        default: '0',
      },
    },
    {
      timestamps: true,
      versionKey: false,
    },
  );
}
