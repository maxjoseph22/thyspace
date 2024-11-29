const request = require("supertest");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const app = require("../../app");
const Comment = require("../../models/comment");

const mongoose = require("mongoose");
require("../mongodb_helper");

function createToken(userId) {
    return JWT.sign(
      {
        user_id: userId,
        // Backdate this token of 5 minutes
        iat: Math.floor(Date.now() / 1000) - 5 * 60,
        // Set the JWT token to expire in 10 minutes
        exp: Math.floor(Date.now() / 1000) + 10 * 60,
      },
      secret
    );
}

let mockUserId;
let token;
    
describe("/comments", () => {

    beforeAll(async () => {
        token = createToken(mockUserId);
    });
    beforeEach(async () => {
        await Comment.deleteMany({});
        mockUserId = new mongoose.Types.ObjectId();
    });
    
    describe("GET, when token is missing", () => {
        test("response code 401", async () => {
            const comment = new Comment({
                userId: mockUserId,
                content: ":]"
            });
            await comment.save();

            const response = await request(app)
                .get("/comments");
                
            expect(response.status).toEqual(401);
        });
    });
    
    describe("GET, when a token is present", () => {
        test("response code 200", async () => {
            const comment1 = new Comment({
                userId: mockUserId,
                content: "boop",
                image: "",
                likes: []
            });
            const comment2 = new Comment({
                userId: mockUserId,
                content: "beep",
                image: "",
                likes: []
            })

            await comment1.save();
            await comment2.save();

            const response = await request(app)
                .get("/comments")
                .set("Authorization", `Bearer ${token}`);
            
            expect(response.status).toEqual(200);
        });

        test("returns every comment in the collection", async () => {
            const comment1 = new Comment({
                userId:mockUserId, 
                content:"yeehaw"
            });
            const comment2 = new Comment({
                userId:mockUserId, 
                content:"meowdy"
            });
            await comment1.save();
            await comment2.save();

            const response = await request(app)
                .get("/comments")
                .set("Authorization", `Bearer ${token}`);

            const comments = await Comment.find();

            expect(comments[0].content).toEqual("yeehaw");
            expect(comments[1].content).toEqual("meowdy");
        });
    });

    

    describe("POST, when a token is present", () => {
        test("response code 201", async () => {
            const response = await request(app)
                .post("/comments")
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: mockUserId, 
                    content: "RAAAGHAGHAG TESTING"
                });     

            expect(response.status).toEqual(201);
        });

        test("creates a new comment", async () => {
            await request(app)
                .post("/comments")
                .set("Authorization", `Bearer ${token}`)
                .send({ 
                    userId: mockUserId, 
                    content: "i miss gaming"
                });

            const comments = await Comment.find();

            expect(comments.length).toEqual(1);
            expect(comments[0].userId).toEqual(mockUserId);
            expect(comments[0].content).toEqual("i miss gaming");
        });
    });

    describe("PUT, when a token is present", () => {
        test("response code 202", async () => {
            const comment = new Comment({
                userId: mockUserId,
                content: "new comment"
            });
            await comment.save();

            const response = await request(app)
                .put(`/comments/${comment._id}`)
                .set("Authorization", `Bearer ${token}`)
                .send({
                    userId: mockUserId, 
                    content: "edited comment"
                });     

            expect(response.status).toEqual(202);
        });

        test("updates a comment", async () => {
            const comment1 = new Comment({
                userId: mockUserId,
                content: "new comment"
            });
            const comment2 = new Comment({
                userId: mockUserId,
                content: "second comment"
            })
            await comment1.save();
            await comment2.save();

            const response = await request(app)
                .put(`/comments/${comment1._id}`)
                .set("Authorization", `Bearer ${token}`)
                .send({content: "updated comment!"});

            const commentOne = await Comment.findOne({content: "updated comment!"});
            const commentTwo = await Comment.findOne({content: "second comment"});

            expect(commentOne.content).toEqual("updated comment!");
            expect(commentTwo.content).toEqual("second comment");

        });
    });

    describe("DELETE, when a token is present", () => {
        test("response code 200", async () => {
            const comment1 = new Comment({
                userId: mockUserId,
                content: "this comment will be deleted"
            });
            comment1.save();

            const response = await request(app)
                .delete(`/comments/${comment1._id}`)
                .set("Authorization", `Bearer ${token}`)

            expect(response.statusCode).toBe(200);
        });

        test("deletes a comment", async () => {
            const comment1 = new Comment({
                userId: mockUserId,
                content: "bye bye"
            });
            const comment2 = new Comment({
                userId: mockUserId,
                content: "this comment should stay"
            });

            await comment1.save();
            await comment2.save();

            const response = await request(app)
                .delete(`/comments/${comment1._id}`)
                .set("Authorization", `Bearer ${token}`);

            const comments = await Comment.find();
            expect(comments.length).toEqual(1);
            expect(comments[0].content).toEqual("this comment should stay");
        });
    });
});
