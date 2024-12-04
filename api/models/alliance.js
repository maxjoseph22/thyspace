const mongoose = require("mongoose")
const { Schema, Types } = mongoose; 

const AlliancesSchema = new Schema({
    sender: { 
        type: Types.ObjectId,
        ref: "User",  
        required: true,
    },
    receiver: { 
        type: Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    status: { 
        type: String,
        ref: "Status",
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    },
},  {   
        timestamps: true
    });
const Alliance = mongoose.model("Alliance", AlliancesSchema);

module.exports = Alliance

// Ensure alliances are unique, you can maybe do this with logic though
// AlliancesSchema.index({ sender: 1, receiver: 1 }, { unique: true });