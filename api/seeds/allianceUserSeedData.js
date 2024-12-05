const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user'); // Adjust path as needed
const Alliance = require('../models/alliance'); // Adjust path as needed
const Post = require('../models/post')
const Comment = require("../models/comment")

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Alliance.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    

    // Create users - password hashing will be handled by the pre-save middleware
    const users = [
      {
        username: 'johndoe',
        email: 'john.doe@example.com',
        password: 'Password123!',
        location: 'New York, NY',
        firstname: 'John',
        lastname: 'Doe',
        profilePicture: 'https://example.com/john.jpg'
      },
      {
        username: 'janesmit',
        email: 'jane.smit@example.com',
        password: 'SecurePass456!',
        location: 'San Francisco, CA',
        firstname: 'Jane',
        lastname: 'Smit',
        profilePicture: 'https://example.com/jane.jpg'
      },
      {
        username: 'mikebrown',
        email: 'mike.brown@example.com',
        password: 'MikePass789!',
        location: 'Chicago, IL',
        firstname: 'Mike',
        lastname: 'Brown',
        profilePicture: 'https://example.com/mike.jpg'
      },
      {
        username: 'sarahlee',
        email: 'sarah.lee@example.com',
        password: 'LeePass321!',
        location: 'Austin, TX',
        firstname: 'Sarah',
        lastname: 'Lee',
        profilePicture: 'https://example.com/sarah.jpg'
      },
      {
        username: 'alexwang',
        email: 'alex.wang@example.com',
        password: 'WangPass654!',
        location: 'Seattle, WA',
        firstname: 'Alex',
        lastname: 'Wang',
        profilePicture: 'https://example.com/alex.jpg'
      },
      {
        username: 'emilychan',
        email: 'emily.chan@example.com',
        password: 'ChanPass987!',
        location: 'Los Angeles, CA',
        firstname: 'Emily',
        lastname: 'Chan',
        profilePicture: 'https://example.com/emily.jpg'
      },
      {
        username: 'davidkim',
        email: 'david.kim@example.com',
        password: 'KimPass246!',
        location: 'Boston, MA',
        firstname: 'David',
        lastname: 'Kim',
        profilePicture: 'https://example.com/david.jpg'
      },
      {
        username: 'oliviagrace',
        email: 'olivia.grace@example.com',
        password: 'GracePass135!',
        location: 'Miami, FL',
        firstname: 'Olivia',
        lastname: 'Grace',
        profilePicture: 'https://example.com/olivia.jpg'
      },
      {
        username: 'ryanchen',
        email: 'ryan.chen@example.com',
        password: 'ChenPass864!',
        location: 'Denver, CO',
        firstname: 'Ryan',
        lastname: 'Chen',
        profilePicture: 'https://example.com/ryan.jpg'
      },
      {
        username: 'sophiamartinez',
        email: 'sophia.martinez@example.com',
        password: 'MartinezPass753!',
        location: 'Phoenix, AZ',
        firstname: 'Sophia',
        lastname: 'Martinez',
        profilePicture: 'https://example.com/sophia.jpg'
      }
    ];

    // Create users - the pre-save middleware will handle password hashing
    const createdUsers = await User.create(users);

    // Create alliances
    const allianceRequests = [
      { 
        sender: createdUsers[1]._id, 
        receiver: createdUsers[0]._id, 
        status: 'pending' 
      },
      { 
        sender: createdUsers[2]._id, 
        receiver: createdUsers[0]._id, 
        status: 'pending' 
      },
      { 
        sender: createdUsers[3]._id, 
        receiver: createdUsers[0]._id, 
        status: 'pending' 
      },
      { 
        sender: createdUsers[0]._id, 
        receiver: createdUsers[4]._id, 
        status: 'pending' 
      },
      { 
        sender: createdUsers[0]._id, 
        receiver: createdUsers[5]._id, 
        status: 'pending' 
      }
    ];

    const createdAlliances = await Alliance.create(allianceRequests);

    // Update users with their alliances
    await Promise.all(createdAlliances.map(async (alliance) => {
      if (alliance.status === 'accepted') {
        await User.findByIdAndUpdate(alliance.sender, {
          $addToSet: { alliances: alliance.receiver }
        });
        await User.findByIdAndUpdate(alliance.receiver, {
          $addToSet: { alliances: alliance.sender }
        });
      }
    }));

    console.log('Seed data created successfully');
    return { users: createdUsers, alliances: createdAlliances };
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = seedData;