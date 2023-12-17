import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose || { conn: null, promise: null };

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) {
    console.error('MONGODB_URI is missing');
    throw new Error('MONGODB_URI is missing');
  }

  try {
    cached.promise = cached.promise || mongoose.connect(MONGODB_URI, {
      dbName: 'evently',
      bufferCommands: false,
    });

    cached.conn = await cached.promise;

    // Log success message
    console.log('MongoDB connected successfully!');

    return cached.conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
};
