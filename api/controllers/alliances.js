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

const AllianceController = {
    requestAlliance: requestAlliance
}

module.exports = { AllianceController }


// TODO, how can we make it so that only one alliance can be made between two users?