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

const findOneAlliance = async (req, res) => {
    try {
        const allianceId = req.params.id
        const alliance = await Alliance.findOne({ _id: allianceId})
        if (!alliance) {
            return res.status(404).json({message: "Alliance not found in database"})
        }
        res.status(200).json({alliance})
    } catch (error) {
        res.status(500).json({message: "An error occured, alliance was not returned"})
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

const viewPotentialAlliances = async (req, res) => {
    try {
        const currentUser = req.user_id;

        // Step 1: Find users where the alliance status is NOT 'accepted' and exclude the current user
        const otherUsers = await User.find({ _id: { $ne: currentUser } }, "_id firstname lastname location profilePicture");

        // Step 2: Fetch alliances to exclude 'accepted' ones
        const acceptedAlliances = await Alliance.find({
            $or: [
                { sender: currentUser, status: "accepted" },
                { receiver: currentUser, status: "accepted" }
            ]
        }).select("sender receiver");

        // Step 3: Extract IDs of users in accepted alliances
        const excludedUserIds = new Set(
            acceptedAlliances.flatMap(alliance => [alliance.sender.toString(), alliance.receiver.toString()])
        );

        // Step 4: Filter users who are not part of 'accepted' alliances
        const filteredUsers = otherUsers.filter(user => !excludedUserIds.has(user._id.toString()));

        // Step 5: Add status information to remaining users
        const usersWithAlliancesData = await Promise.all(filteredUsers.map(async (user) => {
            const alliance = await Alliance.findOne({
                $or: [
                    { sender: currentUser, receiver: user._id },
                    { receiver: currentUser, sender: user._id },
                ]
            });

            const plainUser = user.toObject();
            if (alliance) {
                plainUser["status"] = alliance.status;
                plainUser["allianceRole"] = alliance.sender.toString() === currentUser ? "sender" : "receiver";
            } else {
                plainUser["status"] = "none";
            }
            return plainUser;
        }));

        res.status(200).json({ usersWithAlliancesData });
    } catch (error) {
        console.error(`Error in viewPotentialAlliances: ${error.message}`);
        res.status(500).json({ message: "An error occurred, users were not returned" });
    }
};

const viewForgedAlliances = async (req, res) => {
    try {
        const currentUser = await User.findOne({ _id: req.user_id })
            .populate({
                path: 'alliances',
                select: "_id firstname lastname location profilePicture"
            });

        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ alliances: currentUser.alliances });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred, alliances were not returned" });
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
            return res.status(403).json({message: "You may not withdraw a forged alliance! Only spilled blood can unforge this alliance."})
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
    findOneAlliance: findOneAlliance,
    rejectAlliance: rejectAlliance,
    viewPotentialAlliances: viewPotentialAlliances,
    viewForgedAlliances: viewForgedAlliances,
    acceptAlliance: acceptAlliance
}

module.exports = { AllianceController }


// // TODO:
// - how can we make it so that only one alliance can be made between two users? DONE
// - Refactor acceptAlliance to use findByIdAndUpdate 