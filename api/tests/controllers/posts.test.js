const request = require("supertest");
const JWT = require("jsonwebtoken");

const app = require("../../app");
const Post = require("../../models/post");
const User = require("../../models/user");

require("../mongodb_helper");

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
let user;
describe("/posts", () => {
  beforeAll(async () => {
    user = new User({
      email: "post-test@test.com",
      password: "12345678",
      username: 'Something',
      firstname: 'testFirst',
      lastname: 'testSecond'
    });
    await user.save();
    await Post.deleteMany({});
    token = createToken(user.id);
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Post.deleteMany({});
  });

  describe("POST, when a valid token is present", () => {
    test("responds with a 201", async () => {
      const response = await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "Hello World!" , user_id: user._id });
      expect(response.status).toEqual(201);
    });

    test("creates a new post", async () => {
      await request(app)
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "Hello World!!" , user_id: user._id });

      const posts = await Post.find();
      expect(posts.length).toEqual(1);
      expect(posts[0].message).toEqual("Hello World!!");
      expect(posts[0].user_id).toEqual(user._id);
    });

    test("returns a new token", async () => {
      const testApp = request(app);
      const response = await testApp
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "hello world" , user_id: user._id});

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      // iat stands for issued at
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("POST, when token is missing", () => {
    test("responds with a 401", async () => {
      const response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" , user_id: user._id });

      expect(response.status).toEqual(401);
    });

    test("a post is not created", async () => {
      const response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" , user_id: user._id});

      const posts = await Post.find();
      expect(posts.length).toEqual(0);
    });

    test("a token is not returned", async () => {
      const response = await request(app)
        .post("/posts")
        .send({ message: "hello again world" , user_id: user._id});

      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("GET, when token is present", () => {
    test("the response code is 200", async () => {
      const post1 = new Post({ message: "I love all my children equally" , user_id: user._id});
      const post2 = new Post({ message: "I've never cared for GOB" , user_id: user._id});
      await post1.save();
      await post2.save();

      const response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(200);
    });

    test("returns every post in the collection", async () => {
      const post1 = new Post({ message: "howdy!" , user_id: user._id });
      const post2 = new Post({ message: "hola!" , user_id: user._id });
      await post1.save();
      await post2.save();

      const response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`);

      const posts = response.body.posts;
      const firstPost = posts[0];
      const secondPost = posts[1];
      
      expect(firstPost.message).toEqual("hola!");
      expect(secondPost.message).toEqual("howdy!");
    });

    test("returns a new token", async () => {
      const post1 = new Post({ message: "First Post!" , user_id: user._id });
      const post2 = new Post({ message: "Second Post!", user_id: user._id });
      await post1.save();
      await post2.save();

      const response = await request(app)
        .get("/posts")
        .set("Authorization", `Bearer ${token}`);

      const newToken = response.body.token;
      const newTokenDecoded = JWT.decode(newToken, process.env.JWT_SECRET);
      const oldTokenDecoded = JWT.decode(token, process.env.JWT_SECRET);

      // iat stands for issued at
      expect(newTokenDecoded.iat > oldTokenDecoded.iat).toEqual(true);
    });
  });

  describe("GET, when token is missing", () => {
    test("the response code is 401", async () => {
      const post1 = new Post({ message: "howdy!" , user_id: user._id });
      const post2 = new Post({ message: "hola!" , user_id: user._id });
      await post1.save();
      await post2.save();

      const response = await request(app).get("/posts");

      expect(response.status).toEqual(401);
    });

    test("returns no posts", async () => {
      const post1 = new Post({ message: "howdy!" , user_id: user._id });
      const post2 = new Post({ message: "hola!" , user_id: user._id });
      await post1.save();
      await post2.save();

      const response = await request(app).get("/posts");

      expect(response.body.posts).toEqual(undefined);
    });

    test("does not return a new token", async () => {
      const post1 = new Post({ message: "howdy!", user_id: user._id });
      const post2 = new Post({ message: "hola!" , user_id: user._id });
      await post1.save();
      await post2.save();

      const response = await request(app).get("/posts");

      expect(response.body.token).toEqual(undefined);
    });
  });

  describe("update methods", () => {
    test("successfully updates a post", async () => {
      const post1 = new Post({ message: "howdy!", user_id: user._id });
      const post2 = new Post({ message: "hola!" , user_id: user._id });

      await post1.save();
      await post2.save();

      
      const response = await request(app)
        .put(`/posts/${post1._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "Hello World!"});

      expect(response.status).toEqual(202);
    })

    test("updates the content of a post", async () => {
      const post1 = new Post({ message: "howdy!", user_id: user._id });
      const post2 = new Post({ message: "hola!" , user_id: user._id });

      await post1.save();
      await post2.save();

      
      const response = await request(app)
        .put(`/posts/${post1._id}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ message: "Hello World!"});

      const postOne = await Post.findOne({message: "Hello World!"});
      const postTwo = await Post.findOne({message: "hola!"});
      
      expect(response.body.post.message).toEqual(postOne.message);
      expect(postOne.message).toEqual("Hello World!");
      expect(postTwo.message).toEqual("hola!");
    })
  })

  describe("delete methods", () => {
    test("successfully deletes a post", async () => {
      const post1 = new Post({ message: "howdy!", user_id: user._id });
      const post2 = new Post({ message: "hola!" , user_id: user._id });

      await post1.save();
      await post2.save();

      const response = await request(app)
        .delete(`/posts/${post1._id}`)
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toEqual(202);

      const posts = await Post.find();

      expect(posts.length).toEqual(1);
      expect(response.body.post.message).toEqual("howdy!");
    })
  })
});
