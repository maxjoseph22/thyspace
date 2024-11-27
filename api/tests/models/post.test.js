require("../mongodb_helper");
const mongoose = require("mongoose");
const Post = require("../../models/post");

describe("Post model", () => {

  let mockUserId
  beforeEach(async () => {
    await Post.deleteMany({});
    mockUserId = new mongoose.Types.ObjectId();
  });

  it("creates a post", () => {

    const post = new Post({
      message: "some message", 
      user_id: mockUserId, 
      image: "", 
      likes: [], 
      comments: []
    });

    expect(post.message).toEqual("some message");
    expect(post.user_id).toEqual(mockUserId);
    expect(post.image).toEqual("");
    expect(post.likes).toEqual([]);
    expect(post.comments).toEqual([]);
  });

  it("can list all posts", async () => {
    const posts = await Post.find();
    expect(posts).toEqual([]);
  });

  it("can save a post", async () => {
    const post = new Post({ message: "some message", 
      user_id: mockUserId, 
      image: "", 
      likes: [], 
      comments: [] });

    await post.save();
    const posts = await Post.find();
    
    expect(posts[0].message).toEqual("some message");
    expect(posts[0].user_id).toEqual(mockUserId);
    expect(posts[0].image).toEqual("");
    expect(posts[0].likes).toEqual([]);
    expect(posts[0].comments).toEqual([]);
  });

  it("can save multiple posts", async () => {
    const post1 = new Post({ message: "some message", 
      user_id: mockUserId, 
      image: "", 
      likes: [], 
      comments: []});

    const post2 = new Post({ message: "second message", 
      user_id: mockUserId, 
      image: "", 
      likes: [], 
      comments: [] });

    await post1.save();
    await post2.save();

    const posts = await Post.find();
    expect(posts[0].message).toEqual("some message");
    expect(posts[0].user_id).toEqual(mockUserId);
    expect(posts[0].image).toEqual("");
    expect(posts[0].likes).toEqual([]);
    expect(posts[0].comments).toEqual([]);

    expect(posts[1].message).toEqual("second message");
    expect(posts[1].user_id).toEqual(mockUserId);
    expect(posts[1].image).toEqual("");
    expect(posts[1].likes).toEqual([]);
    expect(posts[1].comments).toEqual([]);
    
  });

  it("update a post", async () => {
    const post = new Post({message: "some message", 
      user_id: mockUserId, 
      image: "", 
      likes: [], 
      comments: []});

    await post.save();

    post.message = "new message";
    await post.save();
    
    const posts = await Post.find();
    
    expect(post.message).toEqual("new message");
    expect(post.user_id).toEqual(mockUserId);
    expect(post.image).toEqual("");
    expect(post.likes).toEqual([]);
    expect(post.comments).toEqual([]);

  })

  it("update a post with multiple posts in the database", async () => {
    const post1 = new Post({message: "some message", 
      user_id: mockUserId, 
      image: "", 
      likes: [], 
      comments: []});

    const post2 = new Post({message: "second message", 
      user_id: mockUserId, 
      image: "", 
      likes: [], 
      comments: []});

    await post1.save();
    await post2.save();


    post1.message = "new message";
    await post1.save();
    
    const postOne = await Post.find({message: "new message"});
    const postTwo = await Post.find({message: "second message"});
    const posts = await Post.find();
    
    expect(post2.message).toEqual("second message");
    expect(post2.user_id).toEqual(mockUserId);
    expect(post2.image).toEqual("");
    expect(post2.likes).toEqual([]);
    expect(post2.comments).toEqual([]);

    expect(post1.message).toEqual("new message");
    expect(post1.user_id).toEqual(mockUserId);
    expect(post1.image).toEqual("");
    expect(post1.likes).toEqual([]);
    expect(post1.comments).toEqual([]);

    expect(posts.length).toEqual(2);
  })

  it("deletes a post", async () => {
    const post = new Post({
      message: "some message", 
      user_id: mockUserId, 
      image: "", 
      likes: [], 
      comments: []})

    await post.save();
    await Post.find({message: "some message"}).deleteOne();
    const posts = await Post.find();

    expect(posts.length).toEqual(0);
  })

  it("definitely deletes one instead of all of them", async () => {
    const post1 = new Post({
      message: "some message", 
      user_id: mockUserId, 
      image: "", 
      likes: [], 
      comments: []
    })
    const post2 = new Post({
      message: "second message", 
      user_id: mockUserId, 
      image: "", 
      likes: [], 
      comments: []
    })

    await post1.save();
    await post2.save();

    await Post.find({message: "some message"}).deleteOne();
    const posts = await Post.find();

    expect(posts.length).toEqual(1);
    
    expect(posts[0].message).toEqual("second message");
    expect(posts[0].user_id).toEqual(mockUserId);
    expect(posts[0].image).toEqual("");
    expect(posts[0].likes).toEqual([]);
    expect(posts[0].comments).toEqual([]);
  })
});
