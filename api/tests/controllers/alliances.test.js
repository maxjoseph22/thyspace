const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
const User = require("../../models/user");
const Alliance = require("../../models/alliance")
const { fakeUserOne, fakeUserTwo, fakeUserThree } = require("../fakeUsers")

require("../mongodb_helper")

const secret = process.env.JWT_SECRET;

function createToken(userId) {
    return JWT.sign(
      {
        user_id: userId,
        // Backdate this token of 5 minutes
        iat: Math.floor(Date.now() / 1000) - 5 * 60,
        // Set the JWT token to expire in 10 minutes
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      secret
    );
}

let token;
let userOne;
let userTwo;
let userThree;

describe('/alliances', () => {
    beforeAll(async () => {
        await Alliance.deleteMany({});
        await User.deleteMany({});
        userOne = await new User(fakeUserOne).save();
        userTwo = await new User(fakeUserTwo).save();
        userThree = await new User(fakeUserThree).save();
        tokenOne = createToken(userOne._id);
        tokenTwo = createToken(userTwo._id);
        tokenThree = createToken(userThree._id);
    })

    beforeEach(async () => {
        await Alliance.deleteMany({});
        await User.deleteMany({});
    })

    describe("POST, when a valid token is present", () => {
        it("returns a response code of 201 when a new alliance is requested", async () => {
            const response = await request(app)
                .post("/alliances")
                .set("Authorization", `Bearer ${tokenOne}`)
                .send({ sender: userOne._id, receiver: userTwo._id })
            expect(response.status).toEqual(201);
        })
        it("correctly adds a new alliance to the database when the sender requests one", async () => {
            const response = await request(app)
                .post("/alliances")
                .set("Authorization", `Bearer ${tokenOne}`)
                .send({ sender: userOne._id, receiver: userTwo._id })
            
            const alliance = await Alliance.findOne({sender: userOne._id})
    
            expect(alliance.receiver).toEqual(userTwo._id);
            expect(alliance.status).toEqual("pending")
        })
        it("correctly removes a pending alliance if a sender changes their mind", async () => {
            const responseOne = await request(app)
                .post("/alliances")
                .set("Authorization", `Bearer ${tokenOne}`)
                .send({ sender: userOne._id, receiver: userTwo._id })
            expect(responseOne.body.alliance.sender).toEqual(userOne._id.toString())
            expect(responseOne.body.alliance.receiver).toEqual(userTwo._id.toString())
            // const allianceId = responseOne.body.alliance._id
            const receiverId = responseOne.body.alliance.receiver

            
            const responseTwo = await request(app)
                .post(`/alliances/${receiverId}/cancel`)
                .set("Authorization", `Bearer ${tokenOne}`)
                .send({ sender: userOne._id })
            expect(responseTwo.status).toEqual(201)
            expect(await Alliance.findOne({sender: userOne._id})).toBeNull();
        })
        // it("adds user ids to the correct users friend lists when a reciever accepts a friend request , () => {

        // })

    })
    
    // describe("POST, when token is missing or invalid", () => {
    
    // } )
    
    // describe("GET, when a valid token is present", () => {

    // })

    // describe("GET, when a token is missing or invalid", () => {

    // })
})

