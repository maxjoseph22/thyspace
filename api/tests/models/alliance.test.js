require("../mongodb_helper");
const Alliance = require("../../models/alliance")
const User = require("../../models/user")


describe("Alliance model", () => {
    beforeEach(async () => {
        await Alliance.deleteMany({});
      });

    it('instantiates with two unique user ids', async () => {
        const fakeUserOne = await new User({
            email: "mickymouse@getmail.com", 
            password: "1234typr%",
        }).save();

        const fakeUserTwo = await new User({
            email: "minniemouse@getmail.com", 
            password: "1234typr%",
        }).save();

        const alliance = new Alliance({userOne: fakeUserOne._id, userTwo: fakeUserTwo._id})
        expect(alliance.userOne).toEqual(fakeUserOne._id);
        expect(alliance.userTwo).toEqual(fakeUserTwo._id);
    })
    // it('instantiates with Tom')
})