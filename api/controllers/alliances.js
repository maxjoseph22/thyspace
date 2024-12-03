const Alliance = require("../models/alliance")
const User = require("../models/user")
const { generateToken } = require("../lib/token")
const mongoose = require("mongoose")
const { Types } = mongoose;


const viewReceivedRequestsAdmin = async (req, res) => { 
    try {
        const receiverId = req.params.id
        const receivedRequests = await Alliance.find({receiver: receiverId, status: "pending"})
        res.status(200).json({receivedRequests: receivedRequests})
    } catch (error) {
        console.log(`\n${error.message}\n`)
        res.status(500).json({message: "An error occured, alliances were not returned"})
    }
}
const viewReceivedRequests = async (req, res) => {
    try {
        const receiverId = req.user_id
        
        const receivedRequestsWithUserData = await Alliance.find({receiver: receiverId, status: "pending"})
            .populate('sender', "_id firstname lastname location profilePicture")
        const usersThatRequested = receivedRequestsWithUserData.map((request) => request.sender)
        res.status(200).json({ usersThatRequested })
        
    } catch (error) {
        console.log(`\n${error.message}\n`)
        res.status(500).json({message: "An error occured, alliances were not returned"})
    }
}
// DONE

const viewPotentialAlliances = async (req, res) => {
    try {
        const currentUser = req.user_id
        const otherUsers = await User.find({ _id: { $ne: currentUser } },
        "_id firstname lastname location profilePicture")
        res.status(200).json({ otherUsers })
      } catch (error) {
        console.log(`\n${error.message}\n`)
        res.status(500).json({message: "An error occured, users were not returned"})
      }
}

const viewForgedAlliances = async (req, res) => {
    try{
        const currentUser = await User.findOne({ _id: req.user_id})
            .populate('alliances', "_id firstname lastname location profilePicture")
        res.status(200).json({ forgedAlliances: currentUser.alliances })

    } catch (error) {
        console.log(`\n${error.message}\n`)
        res.status(500).json({message: "An error occured, alliances were not returned"})
    }
}

const requestAlliance = async (req, res) => {
    try {
        const sender = req.user_id
        const receiver = req.params.id
        const existingRequest = await Alliance.findOne({
            $or: [
                { sender: sender, receiver: receiver },
                { sender: receiver, receiver: sender }
            ]
        })
        if (existingRequest) {
            throw new Error("This alliance has already been requested.")
        }
        const alliance = new Alliance({sender, receiver})
        await alliance.save()

        const newToken = generateToken(req.user_id);
        res.status(201).json({alliance: alliance, token: newToken })
    } catch (error) {
        console.log(`\n${error.message}\n`)
        if (error.message === "This alliance has already been requested.") {
            res.status(409).json({ message: error.message})
        } else {
            res.status(500).json({message: "An error occured, alliance not requested"})
        }
        
    }
} 


const withdrawAllianceRequest = async (req, res) => {
    try {
        const sender = req.user_id
        const receiver = req.params.id

        const alliance = await Alliance.findOne({sender: sender, receiver: receiver})
    
        if (alliance.status !== 'pending') {
            res.status(403).json({message: "You may not withdraw a forged alliance! Only spilled blood can unforge this alliance."})
        }

        await Alliance.deleteOne({ _id: alliance._id })
        res.status(200).json({message: "Alliance request successfully withdrawn!"})

    } catch (error) {
        console.log(`\n${error.message}\n`)
        res.status(500).json({message: "An error occured, alliance not withdrawn!"})
    }
}

const acceptAlliance = async (req, res) => {
    try {
        const receiver = req.user_id
        const sender = req.params.id
        // Can we use findByIdAndUpdate here?
        const alliance = await Alliance.findOne({sender: sender, receiver: receiver})
        alliance.status = "accepted"
        await alliance.save()
        await User.findByIdAndUpdate(sender, { $addToSet: { alliances: receiver }})
        await User.findByIdAndUpdate(receiver, { $addToSet: { alliances: sender }})
        res.status(200).json({message: "Alliance forged."})
    } catch (error) {
        console.log(`\n${error.message}\n`)
        res.status(500).json({message: "Alliance failed to forge!"})
    }
}

const rejectAlliance = async (req, res) => {
    try {
        const sender = req.params.id
        const receiver = req.user_id

        const alliance = await Alliance.findOne({sender: sender, receiver: receiver})
    
        if (alliance.status !== 'pending') {
            res.status(403).json({message: "You may not reject a forged alliance! Only spilled blood can unforge this alliance."})
        }

        await Alliance.deleteOne({ _id: alliance._id })
        res.status(200).json({message: "Alliance request successfully rejected!"})

    } catch (error) {
        console.log(`\n${error.message}\n`)
        res.status(500).json({message: "An error occured, alliance not rejected!"})
    }
}


const AllianceController = {
    requestAlliance: requestAlliance,
    withdrawAllianceRequest: withdrawAllianceRequest,
    viewReceivedRequestsAdmin: viewReceivedRequestsAdmin,
    viewReceivedRequests: viewReceivedRequests,
    rejectAlliance: rejectAlliance,
    viewPotentialAlliances: viewPotentialAlliances,
    viewForgedAlliances: viewForgedAlliances,
    acceptAlliance: acceptAlliance
}

module.exports = { AllianceController }


// // TODO:
// - how can we make it so that only one alliance can be made between two users?
// - Refactor acceptAlliance to use findByIdAndUpdate 