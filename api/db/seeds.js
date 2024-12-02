require("dotenv").config();

const mongoose = require("mongoose");
const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Alliance = require("../models/alliance");

const { connectToDatabase } = require("./db.js");
connectToDatabase();

const seed = async () => {
    await createUsers();
    await createPosts();
};

const createUsers = async () => {
    const users = [
        new User({
            username: "coff-ee",
            email: "safaa@gmail.com",
            password: "password123",
            location: "United Kingdom",
            firstname: "Safaa",
            lastname: "Imran",
            profilePicture: "",
            alliances: [],
            posts: []
        }),
        new User({
            username: "khal2023",
            email: "khalid@gmail.com",
            password: "password456",
            location: "United Kingdom",
            firstname: "Khalid",
            lastname: "Ham",
            profilePicture: "",
            alliances: [],
            posts: []
        }),
        new User({
            username: "DougF-5749",
            email: "doug@gmail.com",
            password: "password789",
            location: "United Kingdom",
            firstname: "Doug",
            lastname: "Just Doug",
            profilePicture: "",
            alliances: [],
            posts: []
        }),
        new User({
            username: "K-B13",
            email: "cezary@gmail.com",
            password: "123password",
            location: "United Kingdom",
            firstname: "Cezary",
            lastname: "Karwoski-Budd",
            profilePicture: "",
            alliances: [],
            posts: []
        }),
        new User({
            username: "SholaF1",
            email: "shola@gmail.com",
            password: "456password",
            location: "United Kingdom",
            firstname: "Shola",
            lastname: "Forbes",
            profilePicture: "",
            alliances: [],
            posts: []
        }),
        new User({
            username: "maxjoseph22",
            email: "max@gmail.com",
            password: "789password",
            location: "United Kingdom",
            firstname: "Max",
            lastname: "Joseph",
            profilePicture: "",
            alliances: [],
            posts: []
        }),
        new User({
            username: "azureDragoon",
            email: "estinien@gmail.com",
            password: "top1dragonslayer",
            location: "Ishgard",
            firstname: "Estinien",
            lastname: "Varlineau"
        }),
        new User({
            username: "WarriorOfLightOrSomething",
            email: "wol@hydaelyn.com",
            password: "godsfavouriteboy",
            location: "Ul'dah",
            firstname: "Sami",
            lastname: "Epocahn",
            alliances: [],
            posts: []
        }),
        new User({
            username: "alfiee_node",
            email: "alphi@gmail.com",
            password: "carbuncle7024",
            location: "Sharlayan",
            firstname: "Alphinaud",
            lastname: "Leveilleur",
            alliances: [],
            posts: []
        }),
        new User({
            username: "alislay3000",
            email: "alisaie@gmail.com",
            password: "number1redMage",
            location: "Sharlayan",
            firstname: "Alisaie",
            lastname: "Leveilleur",
            alliances: [],
            posts: []
        }),
    ];

    await User.deleteMany({});
    for (const userData of users){
        await userData.save();
        console.log(userData);
    };
};

const createPosts = async () => {
    const users = await User.find();
    const posts = [
        new Post({
            message: "boring first post",
            user_id: users[0]._id,
            image: ""
        }),
        new Post({
            message: "hey guys",
            user_id: users[7]._id,
            image: "",
        }),
        new Post({
            message: "Well met, all!",
            user_id: users[8]._id
        }),
        new Post({
            message: "if I see that wombat one more time",
            user_id: users[1]._id
        }),
        new Post({
            message: "I heard this place was a suitable replacement for 'X'. They should not have renamed it into a 'close' button.",
            user_id: users[6]._id
        }),
        new Post({
            message: "second post...",
            user_id: users[0]._id
        }),
        new Post({
            message: "wow I do not have anything to say. third post",
            user_id: users[0]._id
        })
    ];
    await Post.deleteMany({});
    await Post.insertMany(posts);
};

seed()
    .then(() => {
        console.log("database seeded");
        mongoose.connection.close() })
    .catch((error) => {
        console.log(error);
        
    });