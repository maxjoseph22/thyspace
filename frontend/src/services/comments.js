// docs: https://vitejs.dev/guide/env-and-mode.html
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// I don't think we need a get all comments function:

// export async function getPosts(token) {
//     const requestOptions = {
//         method: "GET",
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };

//     const response = await fetch(`${BACKEND_URL}/posts`, requestOptions);

//     if (response.status !== 200) {
//         throw new Error("Unable to fetch posts");
//     }

//     const data = await response.json();
//     return data;
// }
export async function createComment(commentInfo, postId, userId, token) {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: commentInfo, userId: userId})
    }

    const response = await fetch(`${BACKEND_URL}/posts/${postId}/comments`, requestOptions);

    if (response.status !== 201) {
        throw new Error("Unable to create comment");
    }

    const data = await response.json();
    return data;
}

export async function deleteComment(postId, commentId, token) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await fetch(`${BACKEND_URL}/posts/${postId}/comments/${commentId}`, requestOptions);

    if (response.status !== 202) {
        throw new Error("Unable to delete comment");
    }

    const data = await response.json();
    return data;
}

export async function updateComment(postId, commentId, commentInfo, token){
    const requestOptions = {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: commentInfo})
    }

    const response = await fetch(`${BACKEND_URL}/posts/${postId}/comments/${commentId}`, requestOptions);

    if (response.status !== 202) {
        throw new Error("Unable to update comment");
    }

    const data = await response.json();
    return data;
}

// I don't think we need a get all comments function:

// export async function getPostsById(userId, token) {
//     const requestOptions = {
//         method: "GET",
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     };

//     const response = await fetch(`${BACKEND_URL}/posts/${userId}`, requestOptions);

//     if (response.status !== 200) {
//         throw new Error("Unable to fetch posts");
//     }

//     const data = await response.json();
//     return data;
// }