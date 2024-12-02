const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    export async function getUsers(token) {

        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await fetch(`${BACKEND_URL}/users`, requestOptions);
        
        if (response.status !== 200) {
            throw new Error("Unable to fetch users");
        }
        
        const data = await response.json();
        return data;
    }


    export async function getUserById(id, token) {
        console.log(id, "user id")

        const requestOptions = {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(`${BACKEND_URL}/users/${id}`, requestOptions)
        console.log(response)
        
        if (response.status !== 200) {
            throw new Error("Unable to fetch user")
        }

        const data = await response.json();
        return data;
    }


    export async function updateUser (id, data, token) {

        const requestOptions = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        };
        const response = await fetch(`${BACKEND_URL}/users/${id}`, requestOptions)

        if (response.status !== 200) {
            throw new Error("Unable to update user")
        }

        const result = await response.json();
        return result.user;
    }

    export async function deleteUser(id, token) {
        
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await fetch(`${BACKEND_URL}/users/${id}`, requestOptions)

        if (response.status !== 200) {
            throw new Error("Unable to delete user")
        }

        const result = await response.json();
        return result;
    }
