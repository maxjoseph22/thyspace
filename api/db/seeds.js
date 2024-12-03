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
    await createAlliances();
    // await createComments();
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
            lastname: "Fairfield",
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
            message: "We as a society must needs work toward a better method of settling disputes than with petty duelling.",
            user_id: users[8]._id
        }),
        new Post({
            message: "if I see that damn wombat one more time",
            user_id: users[1]._id
        }),
        new Post({
            message: "Half of a half is a quarter I think",
            user_id: users[2]._id
        }),
        new Post({
            message: "I yearn for the battlefield",
            user_id: users[3]._id
        }),
        new Post({
            message: "How are you guys cleaning your armour? I feel like just soap and water doesn't do it for me. I miss the shine",
            user_id: users[5]._id
        }),
        new Post({
            message: "I heard this place was a suitable replacement for 'X'. They should not have renamed it into a 'close' button.",
            user_id: users[6]._id
        }),
        new Post({
            message: "Why must men fight amongst themselves when there's quite literally dragons out here",
            user_id: users[6]._id
        }),
        new Post({
            message: "second post...",
            user_id: users[0]._id
        }),
        new Post({
            message: "wow I do not have anything to say. third post",
            user_id: users[0]._id
        }),
        new Post({
            message: "should i liveblog this dragon battle",
            user_id: users[7]._id
        }),
        new Post({
            message: "just ended a thousand year war now im going to get chips :)",
            user_id: users[7]._id
        }),
        new Post({
            message: "Hey all! Just wanted to hop on and let everyone know I've been knighted! So grateful for this amazing opportunity, thank you to everyone who's supported me through this journey.",
            user_id: users[4]._id
        }),
        new Post({
            message: "post number 4",
            user_id: users[0]._id
        }),
        new Post({
            message: "Can you believe they're trying to criminalise killing for sport? What, are we all supposed to be bounty hunters now?",
            user_id: users[9]._id
        }),
        new Post({
            message: "we said we wanted 10 posts per page so i'm making a few to help that. 5",
            user_id: users[0]._id
        })
    ];
    await Post.deleteMany({});
    await Post.insertMany(posts);
};

// const createComments = async () => {
//     const users = await User.find();
//     const posts = await Post.find();
//     const comments = [
//         new Comment({

//         })
//     ];
//     await Comment.deleteMany({});
//     await Comment.insertMany(comments);
// };

const createAlliances = async () => {
    const users = await User.find();
    const alliances = [
        new Alliance({
            sender: users[8]._id,
            receiver: users[9]._id,
            status: "accepted"
        }),
        new Alliance({
            sender: users[6]._id,
            receiver: users[8]._id,
            status: "accepted"
        }),
        new Alliance({
            sender: users[7]._id,
            receiver: users[6]._id,
            status: "rejected"
        }),
        new Alliance({
            sender: users[7]._id,
            receiver: users[9]._id,
            status: "pending"
        }),
        new Alliance({
            sender: users[3]._id,
            receiver: users[1]._id,
            status: "rejected"
        }),
        new Alliance({
            sender: users[3]._id,
            receiver: users[2]._id,
            status: "accepted"
        }),
        new Alliance({
            sender: users[4]._id,
            receiver: users[5]._id,
            status: "accepted"
        }),
        new Alliance({
            sender: users[4]._id,
            receiver: users[1]._id,
            status: "pending"
        }),
        new Alliance({
            sender: users[0]._id,
            receiver: users[6]._id,
            status: "pending"
        }),
        new Alliance({
            sender: users[0]._id,
            receiver: users[1]._id,
            status: "accepted"
        }),
        new Alliance({
            sender: users[0]._id,
            receiver: users[2]._id,
            status: "accepted"
        }),
        new Alliance({
            sender: users[0]._id,
            receiver: users[3]._id,
            status: "accepted"
        }),
        new Alliance({
            sender: users[0]._id,
            receiver: users[4]._id,
            status: "accepted"
        }),
        new Alliance({
            sender: users[0]._id,
            receiver: users[5]._id,
            status: "accepted"
        }),
        new Alliance({
            sender: users[9]._id,
            receiver: users[7]._id,
            status: "pending"
        }),
        new Alliance({
            sender: users[1]._id,
            receiver: users[2]._id,
            status: "accepted"
        }),
        new Alliance({
            sender: users[1]._id,
            receiver: users[5]._id,
            status: "rejected"
        }),
        new Alliance({
            sender: users[1]._id,
            receiver: users[8]._id,
            status: "accepted"
        })
    ]
    await Alliance.deleteMany({});
    await Alliance.insertMany(alliances);
};

seed()
    .then(() => {
        console.log("database seeded");
        mongoose.connection.close() })
    .catch((error) => {
        console.log(error); 
    });