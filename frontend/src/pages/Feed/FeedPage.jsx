import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { createPost, getPosts } from "../../services/posts";
// import Post from "../../components/Post";
import LogoutButton from "../../components/LogoutButton";
import PostContainer from "../../components/PostContainer";
import PostForm from "../../components/PostForm";
import './FeedPage.css'
import { getPayloadFromToken } from "../../services/helperFunctions";

export function FeedPage() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loggedIn = token !== null;
    if (loggedIn) {
      getPosts(token)
        .then((data) => {
          setPosts(data.posts);
          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.error(err);
          navigate("/login");
        });
    }
  }, [navigate]);

  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return;
  }


  const submitPost = async (postInfo) => {
    const token = localStorage.getItem("token");
    const decodedpayload = getPayloadFromToken(token)
    const newPost = await createPost(postInfo, decodedpayload.user_id, token)
    setPosts((prev) => [newPost.post, ...prev])
    localStorage.setItem('token', newPost.token)
  }

  return (
    <>
      <h2>Posts</h2>
      <div className="feed" role="feed">
        <PostForm submitPost={submitPost}/>
        {posts.length > 0 && <PostContainer posts={posts} setPosts={setPosts}/>}
        {/* {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))} */}
      </div>
      <button onClick={() => console.log(posts)}>Click Me!</button>
      <LogoutButton />
    </>
  );
}
