const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const viewReceivedRequests = async (token) => {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    const response = await fetch(`${BACKEND_URL}/alliances/viewReceivedRequests`, requestOptions);

    if (response.status != 200) {
        throw new Error("Unable to get alliances")
    }

    const data = await response.json();
    return data
}

export const requestAlliance = async (token, receiverId) => {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json"
        },
    }

    const response = await fetch(`${BACKEND_URL}/alliances/${receiverId}`, requestOptions)
    
    if (response.status != 201) {
        throw new Error("Unable to request alliance")
    }

    const data = await response.json();
    return data
}

export const withdrawAllianceRequest = async (token, receiverId) => {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json"
        },
    }

    const response = await fetch(`${BACKEND_URL}/alliances/${receiverId}/cancel`, requestOptions)
    
    if (response.status != 200) {
        throw new Error("Unable to cancel alliance request")
    }

    const data = await response.json();
    return data
}

export const forgeAlliance = async (token, senderId) => {
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json"
        },
    }

    const response = await fetch(`${BACKEND_URL}/alliances/${senderId}/forge`, requestOptions)
    
    if (response.status != 200) {
        throw new Error("Unable to accept alliance request")
    }

    const data = await response.json();
    return data
}

export const viewForgedAlliances = async (token) => {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await fetch(`${BACKEND_URL}/alliances/viewForgedAlliances`, requestOptions) 

    if (response.status != 200) {
        throw new Error("Unable to view forged alliances")
    }

    const data = await response.json();
    return data
}

export const viewPotentialAlliances = async (token) => {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await fetch(`${BACKEND_URL}/alliances/viewPotentialAlliances`, requestOptions) 

    if (response.status != 200) {
        throw new Error("Unable to view potential alliances")
    }

    const data = await response.json();
    return data
}