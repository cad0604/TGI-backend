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
import { LeadModel } from '../../../database/models/index.js';
import { FilterUtils } from '../../../utils/filter/filter.utils.js';
export var LeadsService;
(function (LeadsService) {
    LeadsService.Leads = async (req) => {
        try {
            const Filters = FilterUtils(req);
            if (req.query.type === 'DM') {
                const FindLeads = await LeadModel.ModuleFourModel.aggregate([
                    {
                        $match: {
                            $or: [
                                { companyName: { $regex: new RegExp(Filters.search, 'i') } },
                                { ownerName: { $regex: new RegExp(Filters.search, 'i') } },
                                { email: { $regex: new RegExp(Filters.search, 'i') } },
                                { phone: { $regex: new RegExp(Filters.search, 'i') } },
                            ],
                        },
                    },
                    {
                        $sort: {
                            createdAt: Filters.sorting,
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            results: { $push: '$$ROOT' },
                            totalCount: { $sum: 1 },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            data: '$results',
                            meta: {
                                totalCount: '$totalCount',
                                currentPage: {
                                    $cond: {
                                        if: {
                                            $lte: [
                                                Filters.page,
                                                {
                                                    $ceil: {
                                                        $divide: ['$totalCount', Filters.limit],
                                                    },
                                                },
                                            ],
                                        },
                                        then: Filters.page,
                                        else: {
                                            $ceil: {
                                                $divide: ['$totalCount', Filters.limit],
                                            },
                                        },
                                    },
                                },
                                totalPages: {
                                    $ceil: {
                                        $divide: ['$totalCount', Filters.limit],
                                    },
                                },
                            },
                        },
                    },
                    {
                        $project: {
                            data: 1,
                            'meta.totalCount': 1,
                            'meta.currentPage': '$meta.currentPage',
                            'meta.totalPages': '$meta.totalPages',
                        },
                    },
                ]).allowDiskUse(true);
                return Promise.resolve(FindLeads);
            }
            if (req.query.type === 'BF') {
                const FindLeads = await LeadModel.BusinessFundingBusinessDetailsModel.aggregate([
                    {
                        $match: {
                            $or: [
                                {
                                    businessLegalName: {
                                        $regex: new RegExp(Filters.search, 'i'),
                                    },
                                },
                                { taxId: { $regex: new RegExp(Filters.search, 'i') } },
                                { email: { $regex: new RegExp(Filters.search, 'i') } },
                                { phone: { $regex: new RegExp(Filters.search, 'i') } },
                            ],
                        },
                    },
                    {
                        $sort: {
                            createdAt: Filters.sorting,
                        },
                    },
                    {
                        $group: {
                            _id: null,
                            results: { $push: '$$ROOT' },
                            totalCount: { $sum: 1 },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            data: '$results',
                            meta: {
                                totalCount: '$totalCount',
                                currentPage: {
                                    $cond: {
                                        if: {
                                            $lte: [
                                                Filters.page,
                                                {
                                                    $ceil: {
                                                        $divide: ['$totalCount', Filters.limit],
                                                    },
                                                },
                                            ],
                                        },
                                        then: Filters.page,
                                        else: {
                                            $ceil: {
                                                $divide: ['$totalCount', Filters.limit],
                                            },
                                        },
                                    },
                                },
                                totalPages: {
                                    $ceil: {
                                        $divide: ['$totalCount', Filters.limit],
                                    },
                                },
                            },
                        },
                    },
                    {
                        $project: {
                            data: 1,
                            'meta.totalCount': 1,
                            'meta.currentPage': '$meta.currentPage',
                            'meta.totalPages': '$meta.totalPages',
                        },
                    },
                ]).allowDiskUse(true);
                return Promise.resolve(FindLeads);
            }
        }
        catch (e) {
            return Promise.reject({
                code: 500,
                Success: false,
                message: 'Internal Server Error',
            });
        }
    };
})(LeadsService || (LeadsService = {}));
