const Like =  require('../models/like')
const Post =  require('../models/post')
const Comment =  require('../models/comment')

async function toggleLike(req, res) {
    const { entityId, entityType, userId } = req.body;
    if(!['Post', 'Comment'].includes(entityType)){
        return res.status(400).json({ message: 'Invalid entity type'})
    }

    const model = entityType === 'Post' ? Post: Comment
    try {
        const entity = await model.findById(entityId);
        if (!entity) {
            return res.status(404).json({ message: `${entityType} not found` })
        }

        const alreadyLiked = await Like.findOne({ userId, entityId, entityType });
        if (alreadyLiked) {
            await alreadyLiked.deleteOne();

            await model.findByIdAndUpdate(entityId, {
                $pull: { likes: userId }
            });

            const updatedLikes = await Like.find({ entityId, entityType })
            .populate('userId', 'username _id')
            await  Like.deleteOne({ entityId, entityType })
            // Flatten 

            return res.status(200).json({
                message: 'Unliked successfully!',
                likes: updatedLikes,
            })
        } else {
            const newLike = new Like({
                userId,
                entityId,
                entityType
            })

            await newLike.save();

            await model.findByIdAndUpdate(entityId, {
                $addToSet: { likes: userId}
            })

            const updatedLikes = await Like.find({ entityId, entityType })
            .populate('userId', 'username _id');

            return res.status(201).json({
                message: 'Liked successfully!',
                likes: updatedLikes,
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while toggling like.'})
    }
}

const LikeController = {
    toggleLike: toggleLike
}

module.exports = LikeController