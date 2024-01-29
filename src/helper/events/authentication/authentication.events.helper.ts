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

import EventEmitter from 'events';
import { DynamicTemplates } from '../../../services/email/templates/dynamic.template.js';
import { Template } from '../../../services/email/templates/types.js';
import { SessionModel } from '../../../database/models/session/session.model.js';

class AuthenticationEvent extends EventEmitter {}
export const authenticationEvent = new AuthenticationEvent();

authenticationEvent.on('forgotpassword', async (option: Template.Options) => {
  try {
    await DynamicTemplates.Authentication.forgotPassword({
      userId: option.userId,
      email: option.email,
      sessionLink: `${process?.env?.DEVUI}/authorization?verify=${option.sessionLink}&${process.env.PRODUI}/authorization?verify=${option.sessionLink}`,
    });
  } catch (e) {
    console.log(e);
  }
});
authenticationEvent.on('signinsession', async (user_id: any) => {
  try {
    const newSession = new SessionModel.User({
      user_id: user_id,
    });
    await newSession.save();
  } catch (e) {
    console.log(e);
  }
});
