const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
const User = require("../../models/user");
const Alliance = require("../../models/alliance")
const { fakeUserOne, fakeUserTwo, fakeUserThree } = require("../fakeUsers")
const { generateToken, decodeToken } = require("../../lib/token")

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
    })

    beforeEach(async () => {
        await Alliance.deleteMany({});
        await User.deleteMany({});
        userOne = await new User(fakeUserOne).save();
        userTwo = await new User(fakeUserTwo).save();
        userThree = await new User(fakeUserThree).save();
        tokenOne = createToken(userOne._id);
        tokenTwo = createToken(userTwo._id);
        tokenThree = createToken(userThree._id);
    })

    describe("POST, when a valid token is present", () => {
        it("returns a response code of 201 when a new alliance is requested", async () => {
            const response = await request(app)
                .post(`/alliances/${userTwo._id}`)
                .set("Authorization", `Bearer ${tokenOne}`)

            expect(response.status).toEqual(201);
        })
        it("correctly adds a new alliance to the database when the sender requests one", async () => {
            const response = await request(app)
                .post(`/alliances/${userTwo._id}`)
                .set("Authorization", `Bearer ${tokenOne}`)
            
            const alliance = await Alliance.findOne({sender: userOne._id})
    
            expect(alliance.receiver).toEqual(userTwo._id);
            expect(alliance.status).toEqual("pending")
        })
        it("correctly removes a pending alliance if a sender changes their mind", async () => {
            const responseOne = await request(app)
                .post(`/alliances/${userTwo._id}`)
                .set("Authorization", `Bearer ${tokenOne}`)
                
            expect(responseOne.body.alliance.sender).toEqual(userOne._id.toString())
            expect(responseOne.body.alliance.receiver).toEqual(userTwo._id.toString())
        
            const receiverId = responseOne.body.alliance.receiver

            const responseTwo = await request(app)
                .post(`/alliances/${receiverId}/cancel`)
                .set("Authorization", `Bearer ${tokenOne}`)
                
            expect(responseTwo.status).toEqual(200)
            expect(await Alliance.findOne({sender: userOne._id})).toBeNull();
        })
        it("adds user ids to the correct users friend lists when a reciever accepts an alliance request" , async () => {
            const allianceOne = await new Alliance({ sender: userOne._id, receiver: userTwo._id }).save();
            const acceptRequestResponse = await request(app)
                .post(`/alliances/${userOne._id}/forge`)
                .set("Authorization", `Bearer ${tokenTwo}`)
        
            expect(acceptRequestResponse.status).toEqual(200)
            const updatedAllianceOne = await Alliance.findOne({ sender: userOne._id, receiver: userTwo._id })
            expect(updatedAllianceOne.status).toEqual("accepted")
            const updatedUserOne = await User.findOne({_id: userOne._id})
            const updatedUserTwo = await User.findOne({_id: userTwo._id})
            expect(updatedUserOne.alliances).toEqual([userTwo._id])
            expect(updatedUserTwo.alliances).toEqual([userOne._id])
        })
        it("forges mutiple alliances", async () => {
            const allianceOne = await new Alliance({ sender: userOne._id, receiver: userTwo._id }).save();
            const allianceTwo = await new Alliance({ sender: userThree._id, receiver: userTwo._id }).save();
            const responseOne = await request(app)
                .post(`/alliances/${userOne._id}/forge`)
                .set("Authorization", `Bearer ${tokenTwo}`)
                
            const responseTwo = await request(app)
                .post(`/alliances/${userThree._id}/forge`)
                .set("Authorization", `Bearer ${tokenTwo}`)

            const updatedUserOne = await User.findOne({_id: userOne._id})
            const updatedUserTwo = await User.findOne({_id: userTwo._id})
            const updatedUserThree = await User.findOne({_id: userThree._id})
            expect(updatedUserOne.alliances).toEqual([userTwo._id])
            expect(updatedUserTwo.alliances).toEqual([userOne._id, userThree._id])
            expect(updatedUserThree.alliances).toEqual([userTwo._id])
        })

    })
    
    // describe("POST, when token is missing or invalid", () => {
    
    // } )
    
    describe("GET, when a valid token is present", () => {
        it("returns a list of a users pending requests", async () => {
            const allianceOne = await new Alliance({ sender: userOne._id, receiver: userTwo._id }).save();
            const allianceTwo = await new Alliance({ sender: userThree._id, receiver: userTwo._id }).save();
            const allianceThree = await new Alliance({ sender: userThree._id, receiver: userOne._id }).save();

            const findRequestsResponse = await request(app)
                .get(`/alliances/${userTwo._id.toString()}/receivedRequestsAdmin`)
                .set("Authorization", `Bearer ${tokenTwo}`)
            expect(findRequestsResponse.status).toEqual(200)
            expect(findRequestsResponse.body.receivedRequests).toEqual([
                expect.objectContaining({
                    _id: allianceOne._id.toString(),
                    sender: userOne._id.toString(),
                    receiver: userTwo._id.toString()
                }),
                expect.objectContaining({
                    _id: allianceTwo._id.toString(),
                    sender: userThree._id.toString(),
                    receiver: userTwo._id.toString()
                }) 
            ])
        })
        it("allows a user to view basic data of people who have requested alliances", async () => {
            const allianceOne = await new Alliance({ sender: userOne._id, receiver: userTwo._id }).save();
            const allianceTwo = await new Alliance({ sender: userThree._id, receiver: userTwo._id }).save();
            const allianceThree = await new Alliance({ sender: userThree._id, receiver: userOne._id }).save();

            const findRequestsResponse = await request(app)
                .get(`/alliances/viewReceivedRequests`)
                .set("Authorization", `Bearer ${tokenTwo}`)
            expect(findRequestsResponse.status).toEqual(200)
            expect(findRequestsResponse.body.usersThatRequested).toEqual([{
                _id: userOne._id.toString(),
                firstname: "John",
                lastname: "Doe",
                location: "New York, USA",
                profilePicture: "https://example.com/images/user_one.jpg"
            }, {
                _id: userThree._id.toString(),
                firstname: "Max",
                lastname: "Power",
                location: "Los Angeles, USA",
                profilePicture: "https://example.com/images/user_one.jpg"
            }
        ])
        })
        it("allows a user to view basic data of all people available for alliances", async () => {
            const allianceOne = await new Alliance({ sender: userOne._id, receiver: userTwo._id }).save();
            const allianceTwo = await new Alliance({ sender: userThree._id, receiver: userTwo._id }).save();
            const allianceThree = await new Alliance({ sender: userThree._id, receiver: userOne._id }).save();

            const findUsersResponse = await request(app)
                .get('/alliances/viewPotentialAlliances')
                .set("Authorization", `Bearer ${tokenTwo}`)
            
            expect(findUsersResponse.status).toEqual(200)
            expect(findUsersResponse.body.otherUsers).toEqual([{
                _id: userOne._id.toString(),
                firstname: "John",
                lastname: "Doe",
                location: "New York, USA",
                profilePicture: "https://example.com/images/user_one.jpg"
            }, {
                _id: userThree._id.toString(),
                firstname: "Max",
                lastname: "Power",
                location: "Los Angeles, USA",
                profilePicture: "https://example.com/images/user_one.jpg"
            }
            ])
        })
            it("allows a user to view basic data of people they have forged alliances with", async () => {
                const allianceOne = await new Alliance({ sender: userOne._id, receiver: userTwo._id }).save();
                const allianceTwo = await new Alliance({ sender: userThree._id, receiver: userTwo._id }).save();
                const allianceThree = await new Alliance({ sender: userThree._id, receiver: userOne._id }).save();
                
                const Response = await request(app)
                    .post(`/alliances/${userOne._id}/forge`)
                    .set("Authorization", `Bearer ${tokenTwo}`)
                
    
                const findForgedResponse = await request(app)
                    .get('/alliances/viewForgedAlliances')
                    .set("Authorization", `Bearer ${tokenTwo}`)
                
                expect(findForgedResponse.status).toEqual(200)
                expect(findForgedResponse.body.forgedAlliances).toEqual([{
                    _id: userOne._id.toString(),
                    firstname: "John",
                    lastname: "Doe",
                    location: "New York, USA",
                    profilePicture: "https://example.com/images/user_one.jpg"
                }
            ])
        })

    })
})
