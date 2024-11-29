require("../mongodb_helper");
const mongoose = require("mongoose");
const Comment = require("../../models/comment");

describe("Comment model", () => {

    let mockUserId;
    beforeEach(async () => {
        await Comment.deleteMany({});
        mockUserId = new mongoose.Types.ObjectId();
    });

    it("creates a comment", () => {
        const comment = new Comment({
            userId: mockUserId,
            content: "test comment",
            image: "",
            likes: []
        });

        expect(comment.userId).toEqual(mockUserId);
        expect(comment.content).toEqual("test comment");
        expect(comment.image).toEqual("");
        expect(comment.likes).toEqual([]);
    });

    it("lists all comments", async () => {
        const comments = await Comment.find();
        expect(comments).toEqual([]);
    })

    it("saves comments", async () => {
        const comment1 = new Comment({
            userId: mockUserId,
            content: "weewoo",
            image: "",
            likes: []
        });
        const comment2 = new Comment({
            userId: mockUserId,
            content: "woowee",
            image: "",
            likes: []
        })

        await comment1.save();
        await comment2.save();

        const comments = await Comment.find();

        expect(comments[0].userId).toEqual(mockUserId);
        expect(comments[0].content).toEqual("weewoo");
        expect(comments[0].image).toEqual("");
        expect(comments[0].likes).toEqual([]);

        expect(comments[1].userId).toEqual(mockUserId);
        expect(comments[1].content).toEqual("woowee");
        expect(comments[1].image).toEqual("");
        expect(comments[1].likes).toEqual([]);
    });
})