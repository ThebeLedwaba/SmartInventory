import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

class Database {
  private static instance: Database;
  private mongod: MongoMemoryServer | null = null;

  private constructor() {}

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    try {
      let mongoUri = process.env.MONGO_URI;

      // Use in-memory database for testing
      if (process.env.NODE_ENV === 'test') {
        this.mongod = await MongoMemoryServer.create();
        mongoUri = this.mongod.getUri();
      }

      if (!mongoUri) {
        throw new Error('MONGO_URI environment variable is required');
      }

      const options = {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      };

      await mongoose.connect(mongoUri, options);
      
      console.log(`✅ MongoDB connected successfully in ${process.env.NODE_ENV} mode`);
      
      this.setupEventListeners();
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.connection.close();
      if (this.mongod) {
        await this.mongod.stop();
      }
      console.log('✅ MongoDB disconnected successfully');
    } catch (error) {
      console.error('❌ MongoDB disconnection error:', error);
    }
  }

  private setupEventListeners(): void {
    mongoose.connection.on('connected', () => {
      console.log('📊 Mongoose connected to MongoDB');
    });

    mongoose.connection.on('error', (error) => {
      console.error('❌ Mongoose connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ Mongoose disconnected from MongoDB');
    });

    process.on('SIGINT', async () => {
      await this.disconnect();
      process.exit(0);
    });
  }

  public getConnectionStatus(): string {
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    return states[mongoose.connection.readyState] || 'unknown';
  }
}

export const connectDB = (): Promise<void> => Database.getInstance().connect();
export const disconnectDB = (): Promise<void> => Database.getInstance().disconnect();
export const getDBStatus = (): string => Database.getInstance().getConnectionStatus();
