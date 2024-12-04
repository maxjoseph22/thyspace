import { FaRegHeart, FaHeart } from "react-icons/fa6";
import { useState } from "react";
import { toggleLikes } from "../services/likes";
import { getPayloadFromToken } from "../services/helperFunctions";

const isLikedByUser = (likes, userId) => {
    return likes.some(like => {
        if (like.userId) {
            return like.userId._id === userId
        }
        return like._id === userId
    
    })
}

const Like = ({ entity, entityType, handleLikeUpdate }) => {
    const [ isLiked, setIsLiked ] = useState(() => {
        const token = localStorage.getItem('token')
        const userId = getPayloadFromToken(token).user_id
        return isLikedByUser(entity.likes, userId)
    })

    const handleLike = async () => {

        const token = localStorage.getItem('token')
        const userId = await getPayloadFromToken(token).user_id
        try {
            const updatedData = await toggleLikes( entity._id, userId, entityType, token)
            const alreadyLiked = isLikedByUser(updatedData.likes, userId)
            setIsLiked(alreadyLiked)
            handleLikeUpdate(updatedData)
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
            <p>{entity.likes.length}</p>
        </>
    )
}

export default Like