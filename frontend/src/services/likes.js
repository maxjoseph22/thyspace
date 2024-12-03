const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function toggleLikes(entityId, userId, entityType, token) {
    const requestOptions = {
        method: "post",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ entityId: entityId, userId: userId, entityType: entityType })
    };

    const response = await fetch(`${BACKEND_URL}/likes`, requestOptions);

    if (![200, 201].includes(response.status)) {
        throw new Error("Unable to fetch posts");
    }

    const data = await response.json();
    return data;
}