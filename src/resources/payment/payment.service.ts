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
import { Request, Response } from 'express';
import { BillingModel } from '../../database/models/billing/billing.model.js';
import mongoose from 'mongoose';
import { stripe } from '../../vendor/index.js';

export namespace PaymentService {
  export const Initiate = async (req: Request, res: Response) => {
    try {
      console.log(req.body.payment_id);
      const billing = await BillingModel.ModuleOne.aggregate([
        {
          $match: {
            payment_id: new mongoose.Types.ObjectId(req.body.payment_id),
          },
        },
        {
          $lookup: {
            from: 'user_credentials',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user_data',
          },
        },
        { $unwind: '$user_data' },
        {
          $lookup: {
            from: 'moduleone_payments',
            localField: 'payment_id',
            foreignField: '_id',
            as: 'payment_data',
          },
        },
        { $unwind: '$payment_data' },

        {
          $lookup: {
            from: 'm_packages',
            localField: 'package_id',
            foreignField: '_id',
            as: 'package_data',
          },
        },
        { $unwind: '$package_data' },

        {
          $project: {
            _id: 1,
            PaymentOption: 1,
            payment_data: {
              amount: '$payment_data.amount',
            },
            package_data: {
              package_id: '$package_data._id',
              package_name: '$package_data.name',
            },
            user_data: {
              user_id: '$user_data._id',
              user_email: '$user_data.email',
            },
          },
        },
      ]);
      console.log(billing);

      const checkoutSessions = await stripe.checkout.sessions.create({
        mode: 'payment',
        customer_email: billing[0].user_data.user_email,
        cancel_url: 'https://google.com',
        success_url: 'https://google.com',
        metadata: {
          billing_id: billing[0]._id,
          user_id: billing[0].user_data.user_id,
          package_name: billing[0].package_data.package_name,
          package_id: billing[0].package_data.package_id,
        },
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: 'INR',
              unit_amount_decimal: billing[0].payment_data.amount,
              product: 'prod_P7Ac2pgqe8rpft',
            },
          },
        ],
      });
      res.status(201).json({
        code: 201,
        Success: true,
        message: 'Payment initiate successfully',
        urlPath: checkoutSessions.url,
      });
    } catch (e) {
      return Promise.reject({
        code: 500,
        Success: false,
        message: 'Internal Server Error',
        error: e,
      });
    }
  };
}
