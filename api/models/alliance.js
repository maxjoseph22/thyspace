const mongoose = require("mongoose")
const { Schema, Types } = mongoose; 

const AlliancesSchema = new Schema({
    sender: { type: Types.ObjectId, required: true, ref: "User" },
    receiver: { type: Types.ObjectId, required: true, ref: "User" },
    status: { type: String, required: true, default: 'Pending' }
})
const Alliance = mongoose.model("Alliance", AlliancesSchema);

module.exports = Alliance