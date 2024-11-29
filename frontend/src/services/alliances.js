const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const viewReceivedRequests = async (token, userId) => {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await fetch(`${BACKEND_URL}/alliances/${userId}/viewReceivedRequests`, requestOptions);

    if (response.status != 200) {
        throw new Error("Unable to get alliances")
    }

    const data = await response.json();
    return data
}