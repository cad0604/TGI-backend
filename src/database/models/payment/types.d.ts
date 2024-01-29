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
import { Types } from 'mongoose';

export namespace Payment {
  export type TString = string | null | undefined | number;
  export type TStatus = string | null | undefined | '0' | '1' | '2';
  export type TIntervalType = 'day' | 'month' | 'week' | 'year';
  export type IPaymentOption = 'full' | 'downPayment' | 'emi' | null;
  export interface IModuleOnPayment {
    _id: TString;

    user_id: Types.ObjectId | null | undefined;
    billing_id: Types.ObjectId | null | undefined;
    emi_id: Types.ObjectId | null | undefined;
    package_id: Types.ObjectId | null | undefined;
    stripe: {
      stripe_checkout_session_id: TStatus;
      stripe_payment_id: TStatus;
      stripe_payment_status: TStatus;
    };
    paymentOption: IPaymentOption;
    amount: TString;
    paymentMode: 'cash | card | bankTransfer';
    status: TStatus;
    createdAt?: boolean | string;
    updatedAt?: boolean | string;
  }
}