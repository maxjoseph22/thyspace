import createFetchMock from "vitest-fetch-mock";
import { describe, expect, vi } from "vitest";

import { getPosts, createPost, deletePost, updatePost, getPostsById } from "../../src/services/posts";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("posts service", () => {
  describe("getPosts", () => {
    test("includes a token with its request", async () => {
      fetch.mockResponseOnce(JSON.stringify({ posts: [], token: "newToken" }), {
        status: 200,
      });

      await getPosts("testToken");

      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/posts`);
      expect(options.method).toEqual("GET");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    });

    test("rejects with an error if the status is not 200", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );

      try {
        await getPosts("testToken");
      } catch (err) {
        expect(err.message).toEqual("Unable to fetch posts");
      }
    });
  });

  describe("createPost", () => {
    test("Creates a post and gets new token", async () => {
      fetch.mockResponseOnce(JSON.stringify({ post: {}, token: "newToken" }), {
        status: 201,
      });
      const fakePostContent = 'Some Content'
      const fakeUserId = 'i1u45kjnqkj1n34ijn'
      const testToken = "testToken"

      const returnedPost = await createPost(fakePostContent, fakeUserId, testToken);
      console.log("returned post:", returnedPost)

      const fetchArguments = fetch.mock.lastCall;
      console.log("fetched arguments:", fetchArguments)
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/posts`);
      expect(options.method).toEqual("POST");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
      expect(options.headers["Content-Type"]).toEqual("application/json");
      expect(options.body).toEqual(JSON.stringify({message: fakePostContent, user_id: fakeUserId}));
      expect(returnedPost).toEqual({post: {}, token: 'newToken'})
    });

    test("rejects with an error if the status is not 201", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );
      const fakePostContent = 'Some Content'
      const fakeUserId = 'i1u45kjnqkj1n34ijn'

      try {
        await createPost(fakePostContent, fakeUserId, "testToken");
      } catch (err) {
        expect(err.message).toEqual("Unable to create post");
      }
    });
  });

  describe("deletePost", () => {
    test("Deletes a post and gets new token", async () => {
      fetch.mockResponseOnce(JSON.stringify({ post: {}, token: "newToken" }), {
        status: 202,
      });
      const fakePostId = 'i1u45kjnqkj1n34ijn'

      const returnedPost = await deletePost(fakePostId, "testToken");

      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      

      expect(url).toEqual(`${BACKEND_URL}/posts/${fakePostId}`);
      expect(options.method).toEqual("DELETE");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
      expect(returnedPost).toEqual({post: {}, token: 'newToken'})
    });

    test("rejects with an error if the status is not 202", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );
      const fakePostId = 'i1u45kjnqkj1n34ijn'

      try {
        await deletePost(fakePostId, "testToken");
      } catch (err) {
        expect(err.message).toEqual("Unable to delete post");
      }
    });
  });

  describe("updatePost", () => {
    test("Updates a post and gets new token", async () => {
      fetch.mockResponseOnce(JSON.stringify({ post: {}, token: "newToken" }), {
        status: 202,
      });
      const fakePostId = 'i1u45kjnqkj1n34ijn'
      const fakePostContent = 'Some Content'

      const returnedPost = await updatePost(fakePostId, fakePostContent, "testToken");

      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      

      expect(url).toEqual(`${BACKEND_URL}/posts/${fakePostId}`);
      expect(options.method).toEqual("PUT");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
      expect(returnedPost).toEqual({post: {}, token: 'newToken'})
    });

    test("rejects with an error if the status is not 202", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );
      const fakePostId = 'i1u45kjnqkj1n34ijn'
      const fakePostContent = 'Some Content'

      try {
        await updatePost(fakePostId, fakePostContent,"testToken");
      } catch (err) {
        expect(err.message).toEqual("Unable to update post");
      }
    });
  });

  describe("getPostsById", () => {
    test("includes a token with its request", async () => {
      fetch.mockResponseOnce(JSON.stringify({ posts: [], token: "newToken" }), {
        status: 200,
      });

      const fakeUserId = 'i1u45kjnqkj1n34ijn'
      await getPostsById(fakeUserId, "testToken");

      const fetchArguments = fetch.mock.lastCall;
      const url = fetchArguments[0];
      const options = fetchArguments[1];

      expect(url).toEqual(`${BACKEND_URL}/posts/${fakeUserId}`);
      expect(options.method).toEqual("GET");
      expect(options.headers["Authorization"]).toEqual("Bearer testToken");
    });
    test("rejects with an error if the status is not 200", async () => {
      fetch.mockResponseOnce(
        JSON.stringify({ message: "Something went wrong" }),
        { status: 400 }
      );
      const fakeUserId = 'i1u45kjnqkj1n34ijn'
      try {
        await getPostsById(fakeUserId, "testToken");
      } catch (err) {
        expect(err.message).toEqual("Unable to fetch posts");
      }
    });
  });
});