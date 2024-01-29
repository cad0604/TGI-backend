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
import { MongooseConfig } from '../mongoose/config.js';
import express from 'express';
import cluster from 'cluster';
import os from 'os';
export class ExpressConfig extends MongooseConfig {
    app;
    useCluster;
    constructor(useCluster = false) {
        super();
        this.app = express();
        this.useCluster = useCluster;
    }
    start() {
        if (this.useCluster && cluster.isPrimary) {
            const numCPUs = os.cpus().length;
            console.log(`Master ${process.pid} is running`);
            for (let i = 0; i < numCPUs; i++) {
                cluster.fork();
            }
            cluster.on('listening', (worker) => {
                console.log(`Worker ${worker.process.pid} listening`);
            });
            cluster.on('exit', (worker, code, signal) => {
                console.log(`Worker ${worker.process.pid} died`);
            });
        }
        else {
            const port = process.env.PORT || 4000;
            this.app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        }
    }
}
