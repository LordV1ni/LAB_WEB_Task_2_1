import mongoose from 'mongoose';

export const globalSetup = async () => {
    // nothing to do yet
};

export const globalTeardown = async () => {
    await mongoose.connection.close();
};