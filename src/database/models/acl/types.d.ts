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

export namespace Acl {
  export type TString = string | null | undefined;
  export type TStatus = string | null | undefined | '0' | '1' | '2';
  export type TAccess = 'allow' | 'deny';
  export type TPrivileges =
    | 'null'
    | 'view'
    | 'edit'
    | 'add'
    | 'remove'
    | 'details';

  export type TRules = {
    access: TAccess;
    role: string;
    privileges: TPrivileges[] | null;
    resources: string[] | null;
  };

  export interface Group {
    _id: string;
    name: TString;
    description: TString;
    importantMessage: TString;
    status: TStatus;
    createdAt?: boolean | string;
    updatedAt?: boolean | string;
  }

  export interface Role {
    _id: string;
    groupName_id: Types.ObjectId;
    name: TString;
    parent: TString;
    description: TString;
    importantMessage: TString;
    status: TStatus;
    createdAt?: boolean | string;
    updatedAt?: boolean | string;
  }

  export interface Rules {
    _id: string;
    name: TString;
    description: TString;
    importantMessage: TString;
    rules: TRules[];
    status: TStatus;
    createdAt?: boolean | string;
    updatedAt?: boolean | string;
  }

  export interface Resources {
    _id: string;
    name: TString;
    description: TString;
    importantMessage: TString;
    status: TStatus;
    createdAt?: boolean | string;
    updatedAt?: boolean | string;
  }
}
