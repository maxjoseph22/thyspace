import createFetchMock from "vitest-fetch-mock";
import { describe, expect, vi } from "vitest";

import { createComment, deleteComment, updateComment } from "../../src/services/comments";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("createComment", () => {
    test("Creates a comment and gets new token", async () => {
      fetch.mockResponseOnce(JSON.stringify({ comment: {}, token: "newToken" }), {
        status: 201,
      });
      const fakeCommentContent = 'Some Content'
      const fakeUserId = 'i1u45kjnqkj1n34ijn'
      const fakePostId = 'l3u87partkj3q26ipq'

      const returnedComment = await createComment(fakeCommentContent, fakePostId, fakeUserId, "testToken");

      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/posts/${fakePostId}/comments`);
      expect(options.method).toEqual("POST");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
      expect(options.headers["Content-Type"]).toEqual("application/json");
      expect(options.body).toEqual(JSON.stringify({content: fakeCommentContent, userId: fakeUserId}));
      expect(returnedComment).toEqual({comment: {}, token: 'newToken'})
    });

    test("rejects with an error if the status is not 201", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );
      const fakeCommentContent = 'Some Content'
      const fakeUserId = 'i1u45kjnqkj1n34ijn'
      const fakePostId = 'l3u87partkj3q26ipq'

      try {
        await createComment(fakeCommentContent, fakePostId, fakeUserId, "testToken");
      } catch (err) {
        expect(err.message).toEqual("Unable to create comment");
      }
    });
  });

  describe("deleteComment", () => {
    test("Deletes a comment and gets new token", async () => {
      fetch.mockResponseOnce(JSON.stringify({ comment: {}, token: "newToken" }), {
        status: 202,
      });
      const fakeCommentId = 'i1u45kjnqkj1n34ijn'
      const fakePostId = 'l3u87partkj3q26ipq'

      const returnedComment = await deleteComment(fakePostId, fakeCommentId, "testToken");

      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      

      expect(url).toEqual(`${BACKEND_URL}/posts/${fakePostId}/comments/${fakeCommentId}`);
      expect(options.method).toEqual("DELETE");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
      expect(returnedComment).toEqual({comment: {}, token: 'newToken'})
    });

    test("rejects with an error if the status is not 202", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );
      const fakeCommentId = 'i1u45kjnqkj1n34ijn'
      const fakePostId = 'l3u87partkj3q26ipq'

      try {
        await deleteComment(fakePostId, fakeCommentId, "testToken");
      } catch (err) {
        expect(err.message).toEqual("Unable to delete comment");
      }
    });
  });

  describe("updateComment", () => {
    test("Updates a comment and gets new token", async () => {
      fetch.mockResponseOnce(JSON.stringify({ comment: {}, token: "newToken" }), {
        status: 202,
      });
      const fakePostId = 'l3u87partkj3q26ipq'
      const fakeCommentId = 'i1u45kjnqkj1n34ijn'
      const fakeComentContent = 'Some Content'
      

      const returnedComment = await updateComment(fakePostId, fakeCommentId, fakeComentContent, "testToken");

      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1]; 

      expect(url).toEqual(`${BACKEND_URL}/posts/${fakePostId}/comments/${fakeCommentId}`);
      expect(options.method).toEqual("PUT");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
      expect(returnedComment).toEqual({comment: {}, token: 'newToken'})
    });

    test("rejects with an error if the status is not 202", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );
      const fakePostId = 'l3u87partkj3q26ipq'
      const fakeCommentId = 'i1u45kjnqkj1n34ijn'
      const fakeCommentContent = 'Some Content'

      try {
        await updateComment(fakePostId, fakeCommentId, fakeCommentContent,"testToken");
      } catch (err) {
        expect(err.message).toEqual("Unable to update comment");
      }
    });
  });
