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
import express from 'express';
import 'dotenv/config';
import { PrivateRoutes, PublicRoutes, Routes } from './routes/index.js';
import morgan from 'morgan';
import { ErrorMiddleware } from './core/middlewares/error/error.middleware.js'; // import statusMonitor from 'express-status-monitor';
import cors from 'cors';
import { CheckBlankHelper } from './helper/check/blank/check.blank.helper.js';
import { ExpressConfig } from './vendor/index.js';
import EventEmitter from 'events';
import cookieParser from 'cookie-parser';
import { TestController } from './utils/test/test.controller.js';
import { WebhookStripe } from './webhook/stripe/webhook.stripe.js';
class MyEmitter extends EventEmitter {
}
const myEmitter = new MyEmitter();
// Define an event listener
myEmitter.on('customEvent', async (arg) => {
    console.log('Event triggered with argument:', arg);
});
// Emit the custom event with an argument
myEmitter.emit('customEvent', 'Hello, TypeScript!');
// Emit the custom event again with a different argument
myEmitter.emit('customEvent', 'Another message');
class Main extends ExpressConfig {
    constructor(useCluster = false) {
        super(useCluster);
        this.middlewares();
    }
    middlewares() {
        this.app.use(cors({
            origin: [
                'http://localhost:3000/api',
                'https://loan-client.vercel.app/api',
                'http://192.168.1.4:3000/api',
            ],
        }));
        // this.app.use(express_status_monitor());
        this.app.post('/webhook', WebhookStripe);
        this.app.get('/', TestController);
        this.app.use(cookieParser());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use('/uploads', express.static('./uploads'));
        this.app.use([Routes.system, Routes.onboardingStatus, Routes.iam]);
        this.app.use(CheckBlankHelper);
        this.app.use('/resource', [PublicRoutes.index]);
        this.app.use('/resource', [PrivateRoutes.index]);
        this.app.use(ErrorMiddleware.setup);
    }
}
const server = new Main(false);
server.start();
