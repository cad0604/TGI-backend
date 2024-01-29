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
import { PackageModel } from '../../database/models/index.js';
import { UserModel } from '../../database/models/user/user.model.js';
import { BillingModel } from '../../database/models/billing/billing.model.js';
import { PaymentModal } from '../../database/models/payment/payment.modal.js';
import { stripe } from '../../vendor/index.js';

export namespace CheckoutService {
  export const ModuleOne = async (req: Request, res: Response) => {
    try {
      const paymentOption = req.body.paymentOption;
      const decode = res.locals.decode;
      const user = await UserModel.CredentialModel.findById(decode._id);
      const findPackage = await PackageModel.MPackageModel.findById(
        req.body?.package_id,
      );
      // const FindBilling = await BillingModel.ModuleOne.findOne({
      //   user_id: user?._id,
      //   package_id: findPackage?._id,
      //   status: 1,
      // });
      // console.log(FindBilling);
      const newBilling = new BillingModel.ModuleOne({
        user_id: user?._id,
        package_id: findPackage?._id,
        billingType: paymentOption,
      });

      if (paymentOption === 'full') {
        const saveBilling = await newBilling.save();
        const newFullPayment = new PaymentModal.ModuleOne({
          user_id: user?._id,
          billing_id: saveBilling?._id,
          package_id: findPackage?._id,
          amount: findPackage?.pricing?.fullPrice,
          paymentOption: paymentOption,
          status: '0',
        });
        const saveFullPayment = await newFullPayment.save();
        await saveBilling.updateOne({
          payment_id: saveFullPayment?._id,
        });
        return Promise.resolve({
          code: 200,
          Success: true,
          message: 'Internal Checkout Session Created',
          data: {
            payment_id: saveFullPayment?._id,
          },
        });
      }
      if (paymentOption === 'emi') {
        await newBilling.save();
        return;
      }
    } catch (e) {
      console.error('Error:', e);
      return Promise.reject({
        code: 500,
        Success: false,
        message: 'Internal Server Error',
        error: e,
      });
    }
  };
  export const Billing = async (req: Request, res: Response) => {
    try {
      const { type, _id, paytype } = req.query;
      if (['module1', 'module1'].includes(String(type))) {
        console.log('ok');
      }
      console.log('not oky');
      const packageFind = await PackageModel.MPackageModel.findById(_id);

      if (paytype === 'full') {
        const billingDetails = {
          paytype: 'full',
          name: packageFind?.name,
          oty: 1,
          total: packageFind?.pricing.fullPrice,
          emi: [],
        };

        return Promise.resolve({
          code: 200,
          Success: true,
          message: 'Process successfully',
          data: billingDetails,
        });
      }
      if (paytype === 'emi') {
        const billingDetails = {
          paytype: 'emi',
          name: 'Emi',
          oty: 1,
          total: packageFind?.pricing.emiPrice,
          emi: [],
        };

        return Promise.resolve({
          code: 200,
          Success: true,
          message: 'Process successfully',
          data: billingDetails,
        });
      }
      return Promise.reject({
        code: 400,
        Success: false,
        message: 'PayType Invaild',
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

  export const CheckoutNew = async (req: Request, res: Response) => {
    try {
      const { paymentType, packageId } = req.body;

      if (!paymentType || !packageId) {
        return Promise.reject({
          code: 400,
          Success: false,
          message: 'Bad Request: paymentOption and packageId are required.',
        });
      }
      const decode = res.locals.decode;

      const findPackage = await PackageModel.MPackageModel.findById(
        req.body?.packageId,
      );

      if (paymentType === 'full') {
        const test = await stripe.checkout.sessions.create({
          customer_email: decode?.email,
          locale: 'en',
          mode: 'payment',
          line_items: [
            {
              price: findPackage?.stripe.fullPriceId as string,
              quantity: 1,
            },
          ],
          success_url:
            'https://loan-client.vercel.app/onboarding/pcr/docs-upload',
          cancel_url: 'https://loan-client.vercel.app/onboarding/pcr/plans',
          currency: 'USD',
        });
        return Promise.resolve({
          code: 200,
          Success: true,
          message: 'Process successfully',
          data: test,
        });
      }
      if (paymentType === 'emi') {
        console.log(decode?.email);
        const test = await stripe.checkout.sessions.create({
          customer_email: decode?.email,
          locale: 'en',
          mode: 'subscription',

          line_items: [
            {
              price: findPackage?.stripe.emiPriceId as string,
              quantity: 1,
            },
          ],
          success_url:
            'https://loan-client.vercel.app/onboarding/pcr/docs-upload',
          cancel_url: 'https://loan-client.vercel.app/onboarding/pcr/plans',
          currency: 'USD',
        });

        return Promise.resolve({
          code: 200,
          Success: true,
          message: 'Process successfully',
          data: test,
        });
      }

      return Promise.reject({
        code: 500,
        Success: false,
        message: 'Internal Server Error',
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
// line_items: [
//   { price: findPackage?.stripe.fullPriceId, quantity: '1' },
// ],
