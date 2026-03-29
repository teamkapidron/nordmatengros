import mongoose from 'mongoose';

let isConnected = false;

export default async function connectToMongo() {
  if (isConnected) {
    return;
  }

  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error('MONGO_URI is not defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI!);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw error;
  }
}
