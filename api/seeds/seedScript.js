require('dotenv').config();
const mongoose = require('mongoose');
const seedData = require('./allianceUserSeedData'); // Path to your seed data function

const connectAndSeed = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');

    // Run the seed function
    await seedData();
    console.log('Seeding completed');

    // Close the connection
    await mongoose.connection.close();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

connectAndSeed();