const mongoose = require("mongoose")
const { Schema, Types } = mongoose; 

const ConnectionSchema = new Schema({
    userOne: { type: Types.ObjectId, required: true, ref: "User" },
    userTwo: { type: Types.ObjectId, required: true, ref: "User" },
})
const Connection = mongoose.model("Connection", ConnectionSchema);

module.exports = Connection