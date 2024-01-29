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
import { Request } from 'express';

export const FilterUtils = (req: Request) => {
  return {
    limit: Number(req.query.limit) || 10,
    page: Number(req.query.limit) || 1,
    search: String(req.query.search) || '',
    sorting:
      req.query.sorting === 'new' ? -1 : req.query.sorting === 'old' ? 1 : -1,
  };
};
