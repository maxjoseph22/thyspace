require("../mongodb_helper");
const Alliance = require("../../models/alliance")
const User = require("../../models/user")
const { fakeUserOne, fakeUserTwo, fakeUserThree } = require("../fakeUsers")


describe("Alliance model", () => {
    let userOne;
    let userTwo;
    let userThree;
    
    beforeEach(async () => {
        await Alliance.deleteMany({});
        await User.deleteMany({})
        userOne = await new User(fakeUserOne).save();
        userTwo = await new User(fakeUserTwo).save();
      });

    it('correctly creates fake user', async () => {
        expect(userOne.username).toEqual(fakeUserOne.username)
    })

    it('instantiates with both sender and receiver ids', async () => {
        const alliance = new Alliance({ sender: userOne._id, receiver: userTwo._id });
        expect(alliance.sender).toEqual(userOne._id);
        expect(alliance.receiver).toEqual(userTwo._id)
   
    })

    it('instantiates with pending status', async () => {
        const alliance = new Alliance({ sender: userOne._id, receiver: userTwo._id });
        expect(alliance.status).toEqual('Pending')
    })




    // it('instantiates with Tom')
})