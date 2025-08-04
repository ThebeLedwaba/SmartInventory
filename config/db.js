const mongoose = require('mongoose');
const logger = require('./logger'); // Optional: for advanced logging

// Configuration options
const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
  maxPoolSize: 10, // Maintain up to 10 socket connections
  socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  family: 4, // Use IPv4, skip IPv6
};

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose.connect(process.env.MONGO_URI, MONGO_OPTIONS)
      .then(() => {
        console.log('MongoDB connection established successfully');
        
        // Optional: Log connection metrics
        this._logConnectionStats();
      })
      .catch(error => {
        console.error('MongoDB connection error:', error.message);
        
        // Implement retry logic for production environments
        if (process.env.NODE_ENV === 'production') {
          console.log('Retrying connection in 5 seconds...');
          setTimeout(() => this._connect(), 5000);
        } else {
          process.exit(1); // Exit in development for immediate feedback
        }
      });

    // Event listeners for connection monitoring
    mongoose.connection.on('connected', () => {
      console.log('Mongoose connected to DB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('Mongoose connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('Mongoose disconnected from DB');
    });

    // Close the Mongoose connection when the Node process ends
    process.on('SIGINT', this._gracefulExit).on('SIGTERM', this._gracefulExit);
  }

  _logConnectionStats() {
    if (process.env.NODE_ENV === 'development') {
      setInterval(() => {
        const { hosts, readyState, _connectionString } = mongoose.connection;
        console.debug(`MongoDB Connection Status:
          Host: ${hosts}
          State: ${this._getStateName(readyState)}
          Connection String: ${_connectionString.replace(/\/\/.*@/, '//****:****@')}
        `);
      }, 60000); // Log every minute
    }
  }

  _getStateName(state) {
    const states = {
      0: 'Disconnected',
      1: 'Connected',
      2: 'Connecting',
      3: 'Disconnecting',
      99: 'Uninitialized'
    };
    return states[state] || 'Unknown';
  }

  _gracefulExit() {
    mongoose.connection.close(() => {
      console.log('Mongoose connection closed through app termination');
      process.exit(0);
    });
  }
}

module.exports = new Database();
