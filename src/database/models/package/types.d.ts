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

export namespace Package {
  export type TString = string | null | undefined | number;
  export type TStatus = string | null | undefined | '0' | '1' | '2';
  export type TIntervalType = 'day' | 'month' | 'week' | 'year';
  export type TBulletPoints = {
    value: TString;
    highlight: boolean;
  };
  export interface IPackage {
    _id: string;
    name: TString;
    marketingTag: TString;
    position: TString;
    module: TString;
    stripe: {
      productId: TString;
      fullPriceId: TString;
      emiPriceId: TString;
    };
    pricing: {
      fullPrice: TString;
      emiPrice: TString;
      intervalType: TIntervalType;
      intervalCount: TString;
    };
    bulletPoints: TBulletPoints[];
    status: TStatus;
    createdAt?: boolean | string;
    updatedAt?: boolean | string;
  }
}
