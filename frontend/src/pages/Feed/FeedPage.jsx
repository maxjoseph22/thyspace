import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPost, getPosts } from "../../services/posts";
import PostContainer from "../../components/PostContainer";
import PostForm from "../../components/PostForm";
import './FeedPage.css'
import { getPayloadFromToken } from "../../services/helperFunctions";
import NavBar from "../Nav/NavBar";


export function FeedPage() {
    const [posts, setPosts] = useState([]);
    const [seePostForm, setSeePostForm] = useState(false)
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
        document.body.classList.add("feed-page");
        return () => {
            document.body.classList.remove("feed-page");
        };
    }, [navigate]);

    const token = localStorage.getItem("token");
    if (!token) {
        navigate("/login");
        return;
    }

    const submitPost = async (postInfo, dealingWithImages) => {
        const token = localStorage.getItem("token");
        const decodedpayload = getPayloadFromToken(token)
        const imageUrl = await dealingWithImages(decodedpayload.user_id)
        const imageUrlCheck = imageUrl ? imageUrl.secure_url: ''
        const newPost = await createPost(postInfo, decodedpayload.user_id, token, imageUrlCheck)
        setPosts((prev) => [newPost.post, ...prev])
        localStorage.setItem('token', newPost.token)
    }

  return (
    <>
    {/* <img 
      src="https://see.fontimg.com/api/rf5/x3J88/ZWE0MjI4NDJjYTkzNGUwN2E4NTA5ZTJhMDY0ZmNkNmYudHRm/VGh5U3BhY2U/magnific-chaos-personal-use-regular.png?r=fs&h=130&w=2000&fg=000000&bg=FFFFFF&tb=1&s=65" 
      alt="Old English fonts"
      style={{ position: 'absolute', top: '0', left: '0', zIndex: '1000' }} 
      /> */}
    <NavBar />
      <h2>Thy Feed</h2>
      <div className="feed" role="feed">
        {seePostForm ? 
        <PostForm submitPost={submitPost} setSeePostForm={setSeePostForm}/>
        :
        <button
        onClick={() => setSeePostForm(true)}
        >Createth Post</button>}
        
        {posts.length > 0 && <PostContainer posts={posts} setPosts={setPosts}/>}
      </div>
    </>
  );
}
