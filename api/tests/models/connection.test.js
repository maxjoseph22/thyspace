require("../mongodb_helper");
const Connection = require("../../models/connection")
const User = require("../../models/user")


describe("Connection model", () => {
    beforeEach(async () => {
        await Connection.deleteMany({});
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

        const connection = new Connection({userOne: fakeUserOne._id, userTwo: fakeUserTwo._id})
        expect(connection.userOne).toEqual(fakeUserOne._id);
        expect(connection.userTwo).toEqual(fakeUserTwo._id);
    })
    // it('instantiates with Tom')
})