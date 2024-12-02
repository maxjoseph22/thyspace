const request = require("supertest");

const app = require("../../app");
const User = require("../../models/user");

require("../mongodb_helper");

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  describe("POST, when required fields are are provided", () => {
    test("the response code is 201", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "poppy@email.com", password: "password", username: "Popps", firstname: "Poppy", lastname: "Test" });

      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      await request(app)
        .post("/users")
        .send({ email: "poppy@email.com", password: "password", username: "Popps", firstname: "Poppy", lastname: "Test" });

      const users = await User.find();
      const newUser = users[users.length - 1];
      expect(newUser.email).toEqual("poppy@email.com");
      expect(newUser.createdAt).toBeDefined();
      expect(newUser.updatedAt).toBeDefined();
    });
  });

  describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ email: "skye@email.com" });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ email: "skye@email.com" });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      const response = await request(app)
        .post("/users")
        .send({ password: "password" });

      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      await request(app).post("/users").send({ password: "password" });

      const users = await User.find();
      expect(users.length).toEqual(0);
    });
  });

  describe("DELETE, when user id is given", () => {
    test("the response code is 200 and the user is deleted", async () => {
      // create a user
      const user = await User.create({
        username: "Test_Username",
        email: "someone@example.com",
        password: "password",
        firstname: "testFirstName",
        lastname: "testLastName",
      });
      
      console.log(user)

      const response = await request(app)
        .delete(`/users/${user._id}`)
      // check the response code
      expect(response.statusCode).toBe(200);
      // check database user collection is empty
      const deletedUser = await User.findById(user._id);
      expect(deletedUser).toBeNull()
    });
  });

  describe("PUT, when user id is given", () => {
    test("the response code is 200 and the user is updated", async () => {
      // create a user
      const user = await User.create({
        username: "Test_Username",
        email: "someone@example.com",
        password: "password",
        firstname: "testFirstName",
        lastname: "testLastName",
      });

      const response = await request(app)
        .put(`/users/${user._id}`)
        .send({password: "new_password"})

      expect(response.statusCode).toBe(200);

      updatedUser = await User.findById(user._id);
      expect(updatedUser.password).toBe("new_password")
    });
  });

  describe("GET, when user id is given", () => {
    test("the response code is 200 and the user is found", async () => {
      // create a user
      const user = await User.create({
        username: "Test_Username",
        email: "someone@example.com",
        password: "password",
        firstname: "testFirstName",
        lastname: "testLastName",
      });

      const response = await request(app)
        .get(`/users/${user._id}`)

      expect(response.statusCode).toBe(200);


      foundUser = await User.findById(user._id);
      expect(foundUser.firstname).toBe("testFirstName")
      expect(foundUser.email).toBe("someone@example.com")
    });
  });

  describe("GET, all users", () => {
    test("the response code is 200 and all users are found", async () => {
      // create a user
      const user1 = await User.create({
        username: "Test_Username1",
        email: "someone1@example.com",
        password: "password1",
        firstname: "testFirstName1",
        lastname: "testLastName1",
      });

      const user2 = await User.create({
        username: "Test_Username2",
        email: "someone@example.com2",
        password: "password2",
        firstname: "testFirstName2",
        lastname: "testLastName2",
      });

      const user3 = await User.create({
        username: "Test_Username3",
        email: "someone3@example.com",
        password: "password3",
        firstname: "testFirstName3",
        lastname: "testLastName3",
      });

      const response = await request(app)
        .get(`/users`)


      expect(response.statusCode).toBe(200);
      console.log(response.body.users)
      console.log([
        user1, user2, user3
      ])
      expect(response.body.users[0].username).toEqual(user1.username)
      expect(response.body.users[0].email).toEqual(user1.email)
      expect(response.body.users[0].password).toEqual(user1.password)
      expect(response.body.users[0].firstname).toEqual(user1.firstname)
      expect(response.body.users[0].lastname).toEqual(user1.lastname)

      expect(response.body.users[1].username).toEqual(user2.username)
      expect(response.body.users[1].email).toEqual(user2.email)
      expect(response.body.users[1].password).toEqual(user2.password)
      expect(response.body.users[1].firstname).toEqual(user2.firstname)
      expect(response.body.users[1].lastname).toEqual(user2.lastname)

      expect(response.body.users[2].username).toEqual(user3.username)
      expect(response.body.users[2].email).toEqual(user3.email)
      expect(response.body.users[2].password).toEqual(user3.password)
      expect(response.body.users[2].firstname).toEqual(user3.firstname)
      expect(response.body.users[2].lastname).toEqual(user3.lastname)
      
    });
  });
});