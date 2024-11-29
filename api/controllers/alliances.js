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
        const receiverId = req.params.id
        const receivedRequests = await Alliance.find({receiver: receiverId, status: "pending"})
        const rawUsersThatRequested = await Promise.all(receivedRequests.map(async (request) => await (User.findOne({_id: request.sender }))))
        const usersThatRequested = rawUsersThatRequested.map((user) => ({
            _id: user._id,
            firstname: user.firstname, 
            lastname: user.lastname,
            location: user.location,
            profilePicture: user.profilePicture
    }))
        res.status(200).json({ usersThatRequested: usersThatRequested })

    } catch (error) {
        console.log(`\n${error.message}\n`)
        res.status(500).json({message: "An error occured, alliances were not returned"})
    }
}
const requestAlliance = async (req, res) => {
    try {
        const { sender, receiver } = req.body
        const alliance = new Alliance({sender, receiver})
        await alliance.save()

        const newToken = generateToken(req.user_id);
        res.status(201).json({alliance: alliance, token: newToken })
    } catch (error) {
        console.log(`\n${error.message}\n`)
        res.status(500).json({message: "An error occured, alliance not requested"})
    }
} 

const withdrawAllianceRequest = async (req, res) => {
    try {
        const sender = req.body.sender
        const receiver = req.params.id

        const alliance = await Alliance.findOne({sender: sender, receiver: receiver})
    
        if (alliance.status !== 'pending') {
            res.status(403).json({message: "You may not withdraw a forged alliance! Only spilled blood can unforge this alliance."})
        }

        await Alliance.deleteOne({ _id: alliance._id })
        res.status(201).json({message: "Alliance request successfully withdrawn!"})

    } catch (error) {
        console.log(`\n${error.message}\n`)
        res.status(500).json({message: "An error occured, alliance not withdrawn!"})
    }
}
const acceptAlliance = async (req, res) => {
    try {
        const receiver = req.body.receiver
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
        res.status(500).json({message: "Aliance failed to forge!"})
    }


}

const AllianceController = {
    requestAlliance: requestAlliance,
    withdrawAllianceRequest: withdrawAllianceRequest,
    viewReceivedRequestsAdmin: viewReceivedRequestsAdmin,
    viewReceivedRequests: viewReceivedRequests,
    acceptAlliance: acceptAlliance
}

module.exports = { AllianceController }


// TODO, how can we make it so that only one alliance can be made between two users?