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
});