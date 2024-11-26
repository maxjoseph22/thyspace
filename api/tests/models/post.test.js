require("../mongodb_helper");

const Post = require("../../models/post");

describe("Post model", () => {
  beforeEach(async () => {
    await Post.deleteMany({});
  });

  it("creates a post", () => {
    const post = new Post({ message: "some message", 
                            user_id: "12384hjfed", 
                            image: "", 
                            likes: [], 
                            comments: []
    });
    expect(post).toEqual({message: "some message", 
      user_id: "12384hjfed", 
      image: "", 
      likes: [], 
      comments: []});
  });

  it("can list all posts", async () => {
    const posts = await Post.find();
    expect(posts).toEqual([]);
  });

  it("can save a post", async () => {
    const post = new Post({ message: "some message", 
      user_id: "12384hjfed", 
      image: "", 
      likes: [], 
      comments: [] });

    await post.save();
    const posts = await Post.find();
    expect(posts[0]).toEqual({message: "some message", 
      user_id: "12384hjfed", 
      image: "", 
      likes: [], 
      comments: []});
  });

  it("can save multiple posts", async () => {
    const post1 = new Post({ message: "some message", 
      user_id: "12384hjfed", 
      image: "", 
      likes: [], 
      comments: []});

    const post2 = new Post({ message: "second message", 
      user_id: "12384hjfed", 
      image: "", 
      likes: [], 
      comments: [] });

    await post1.save();
    await post2.save();

    const posts = await Post.find();

    expect(posts).toEqual([
      {message: "some message", 
      user_id: "12384hjfed", 
      image: "", 
      likes: [], 
      comments: []}, 

      {message: "second message", 
        user_id: "12384hjfed", 
        image: "", 
        likes: [], 
        comments: []}]);
  });

  it("update a post", async () => {
    const post = new Post({message: "some message", 
      user_id: "12384hjfed", 
      image: "", 
      likes: [], 
      comments: []});

    await post.save();

    post.message = "new message";
    await post.save();
    
    const posts = await Post.find();
    expect(posts).toEqual([
      {message: "new message", 
        user_id: "12384hjfed", 
        image: "", 
        likes: [], 
        comments: []}
    ])
  })

  it("update a post with multiple posts in the database", async () => {
    const post1 = new Post({message: "some message", 
      user_id: "12384hjfed", 
      image: "", 
      likes: [], 
      comments: []});

    const post2 = new Post({message: "second message", 
      user_id: "12384hjfed", 
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

    expect(postTwo).toEqual({message: "second message", 
      user_id: "12384hjfed", 
      image: "", 
      likes: [], 
      comments: []});

    expect(postOne).toEqual([{
        message: "new message", 
        user_id: "12384hjfed", 
        image: "", 
        likes: [], 
        comments: []}
    ])

    expect(posts.length).toEqual(2);
  })

  it("deletes a post", async () => {
    const post = new Post({
      message: "some message", 
      user_id: "12384hjfed", 
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
      user_id: "12384hjfed", 
      image: "", 
      likes: [], 
      comments: []
    })
    const post2 = new Post({
      message: "second message", 
      user_id: "12384hjfed", 
      image: "", 
      likes: [], 
      comments: []
    })

    await post1.save();
    await post2.save();

    await Post.find({message: "some message"}).deleteOne();
    const posts = await Post.find();

    expect(posts.length).toEqual(1);
    expect(posts).toEqual([{
      message: "second message", 
      user_id: "12384hjfed", 
      image: "", 
      likes: [], 
      comments: []
    }])
  })
});
