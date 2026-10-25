const mongoose = require('mongoose');
const dns = require('dns');

// DNS Fix
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectToMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      family: 4
    });
    
    console.log(`✅ MongoDB Connected Successfully to DB: ${conn.connection.name}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

const disconnectFromMongoDB = async () => {
  await mongoose.disconnect();
  console.log("🔌 Disconnected from MongoDB");
};

module.exports = { connectToMongoDB, disconnectFromMongoDB };