const Alliance = require("../models/alliance")
const { generateToken } = require("../lib/token")

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

const AllianceController = {
    requestAlliance: requestAlliance,
    withdrawAllianceRequest: withdrawAllianceRequest
}

module.exports = { AllianceController }


// TODO, how can we make it so that only one alliance can be made between two users?