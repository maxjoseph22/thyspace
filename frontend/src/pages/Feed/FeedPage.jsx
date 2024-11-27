import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getPosts } from "../../services/posts";
// import Post from "../../components/Post";
import LogoutButton from "../../components/LogoutButton";
import PostContainer from "../../components/PostContainer";
import PostForm from "../../components/PostForm";

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
          const decodedpayload = getPayloadFromToken(token)
          console.log(decodedpayload)
          localStorage.setItem("userId", decodedpayload.user_id)
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

  function getPayloadFromToken(token) {
    if (!token) {
      return false
    }
    const encryptedPayload = token.split('.')
    return JSON.parse(window.atob(encryptedPayload[1]))
  }

  return (
    <>
      <h2>Posts</h2>
      <div className="feed" role="feed">
        <PostForm />
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
