import createFetchMock from "vitest-fetch-mock";
import { describe, expect, vi } from "vitest";
import { fakeUserOne, fakeUserTwo } from "../../../api/tests/fakeUsers"

import { viewReceivedRequests } from "../../src/services/alliances";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Mock fetch function
createFetchMock(vi).enableMocks();

describe("alliances service", () => {
    const mockToken = "testToken";
    const mockUserId = "1234567890abcdef";

    beforeEach( () => {
        fetch.resetMocks()
    })

    it("retrieves an empty list when no alliances have been requested of the user", async () => {
        const mockResponse = { usersThatRequested: []}

        fetch.mockResponseOnce(JSON.stringify({ usersThatRequested: [] }), {
            status: 200,
        });

        const result = await viewReceivedRequests(mockToken, mockUserId);
        
        const fetchArguments = fetch.mock.lastCall;
        const url = fetchArguments[0];
        const options = fetchArguments[1];

        expect(url).toEqual(`${BACKEND_URL}/alliances/${mockUserId}/viewReceivedRequests`);
        expect(options.method).toEqual("GET");
        expect(options.headers["Authorization"]).toEqual("Bearer testToken")

        expect(result).toEqual(mockResponse)
    })
})