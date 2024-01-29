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

import mongoose from 'mongoose';

export class MongooseConfig {
  readonly mongoose: typeof mongoose;

  constructor() {
    this.mongoose = mongoose;
    this.connectToDatabase().then((r) => r);
  }

  private async connectToDatabase() {
    const dbUri: string = process.env.DATABASEURL as string;

    const options: mongoose.ConnectOptions = {
      dbName: process.env.DATABASENAME,
    };

    try {
      await this.mongoose.connect(dbUri, options);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error(`MongoDB connection error: ${error}`);
    }

    this.mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    this.mongoose.connection.on('disconnected', () => {
      console.log('Disconnected from MongoDB');
    });

    process.on('SIGINT', async () => {
      try {
        await this.mongoose.connection.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
      } catch (err) {
        console.error(`Error closing MongoDB connection: ${err}`);
        process.exit(1);
      }
    });
  }
}
