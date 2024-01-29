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
import multer from 'multer';
import path from 'path';
const Filter = {
    modules: {
        one: {
            filter: (req, file, cb) => {
                const allowedExtensions = ['.png', '.jpg', '.jpeg'];
                const fileExtension = path.extname(file.originalname).toLowerCase();
                if (allowedExtensions.includes(fileExtension)) {
                    cb(null, true);
                }
                else {
                    cb(new Error('Invalid file extension'));
                }
            },
            fileSize: 10 * 1024 * 1024,
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, './uploads/private/docs/');
                },
                filename: function (req, file, cb) {
                    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
                    const fileExtension = path.extname(file.originalname).toLowerCase();
                    if (['.png', '.jpg', '.jpeg'].includes(fileExtension)) {
                        cb(null, `${uniqueSuffix}${fileExtension}`);
                    }
                    else {
                        cb(new Error('Invalid file extension'), '');
                    }
                },
            }),
        },
        three: {
            filter: (req, file, cb) => {
                const allowedExtensions = ['.png', '.jpg', '.jpeg'];
                const fileExtension = path.extname(file.originalname).toLowerCase();
                if (allowedExtensions.includes(fileExtension)) {
                    cb(null, true);
                }
                else {
                    cb(new Error('Invalid file extension'));
                }
            },
            fileSize: 10 * 1024 * 1024,
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, './uploads/private/docs/');
                },
                filename: function (req, file, cb) {
                    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
                    const fileExtension = path.extname(file.originalname).toLowerCase();
                    if (['.png', '.jpg', '.jpeg'].includes(fileExtension)) {
                        cb(null, `${uniqueSuffix}${fileExtension}`);
                    }
                    else {
                        cb(new Error('Invalid file extension'), '');
                    }
                },
            }),
        },
    },
};
export const ThreeUpload = multer({
    storage: Filter.modules.three.storage,
    ...Filter.modules.three.filter,
    limits: {
        fileSize: Filter.modules.three.fileSize,
    },
});
export const OneUpload = multer({
    storage: Filter.modules.one.storage,
    ...Filter.modules.one.filter,
    limits: {
        fileSize: Filter.modules.one.fileSize,
    },
});
