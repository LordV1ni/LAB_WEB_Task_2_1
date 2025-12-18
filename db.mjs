import debug from 'debug';
const debugLogger = debug('joke3:server');

import path from 'path';
import { fileURLToPath } from 'url';
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

import dotenv from 'dotenv';
dotenv.config({ path: path.join(_dirname, '.env') });

import mongoose from 'mongoose';
const MONGO_URL = process.env.MONGO_URL

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URL, {});
        debugLogger('MongoDB connected');
    } catch (err) {
        debugLogger(`MongoDB connection error: ${err}`);
        process.exit(1); // Beende den Prozess bei Verbindungsfehler
    }
};

export default connectDB;