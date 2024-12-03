import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { useState } from "react";
import { toggleLikes } from "../services/likes";
import { getPayloadFromToken } from "../services/helperFunctions";

const isLikedByUser = (likes, userId) => {
    console.log(likes)
    return likes.some(like => {
        if (like.userId) {
            return like.userId._id === userId
        }
        return like._id === userId
    
    })
}

const Like = ({ setPosts, post }) => {
    const [ isLiked, setIsLiked ] = useState(() => {
        const token = localStorage.getItem('token')
        const userId = getPayloadFromToken(token).user_id
        return isLikedByUser(post.likes, userId)
    })

    const handleLike = async () => {
        const token = localStorage.getItem('token')
        const userId = await getPayloadFromToken(token).user_id
        try {
            const updatedData = await toggleLikes( post._id, userId, 'Post', token)
            console.log(updatedData.likes, 'updatedData')
            const alreadyLiked = isLikedByUser(updatedData.likes, userId)
            
            setIsLiked(alreadyLiked)

            setPosts(prevPosts => prevPosts.map(p => {
                return p._id === post._id ? { ...p, likes: updatedData.likes} : p
            }))
        } catch (error) {
            console.error('Error toggling like:', error)
        }
    }

    return (
        <>
            {isLiked ? 
                <FaHeart 
                onClick={handleLike}
                />
                :
                <FaRegHeart
                onClick={handleLike}
                />
            }
            <p>{post.likes.length}</p>
        </>
    )
}

export default Like