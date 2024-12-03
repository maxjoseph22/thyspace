const mongoose = require('mongoose')
const { Schema, Types } = mongoose

const LikeSchema = new Schema({
    userId: {type: Types.ObjectId, ref: 'User', required: true},
    entityId: {
        type: Types.ObjectId,
        required: true,
        refPath: 'entityType'
    },
    entityType: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
}, {timestamp: true})

LikeSchema.index({ userId: 1, entityId: 1, entityType: 1 }, { unique: true })

const Like = mongoose.model('Like', LikeSchema)

module.exports = Like