const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectDB = async () => {
  try {
    mongoServer = await MongoMemoryServer.create({
  binary: {
    version: "7.0.3"
  }
});
    const uri = mongoServer.getUri();

    await mongoose.connect(uri);
    console.log(`MongoDB-Memory-Server connected: ${uri}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    if (mongoServer) {
      await mongoServer.stop();
    }
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error(`Error disconnecting: ${error.message}`);
  }
};

module.exports = { connectDB, disconnectDB };
