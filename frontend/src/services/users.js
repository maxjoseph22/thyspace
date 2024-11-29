const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getUsers() {
    const response = await fetch(`${BACKEND_URL}/users`);

    if (response.status !== 200) {
        throw new Error("Unable to fetch users");
    }

    const data = await response.json();
    return data;
}
