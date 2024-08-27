const backendUrl = import.meta.env.VITE_BACKEND_URL;

const RefreshToken = async () => {
    let url = `${backendUrl}/refresh`;
    const response = await fetch(url,
        {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        });
    if (!response.ok) {
        throw new Error(`RefreshError`);
    }
    const login_response = await response.json();
    return login_response;
};

export const FetchWithAuth = async (url, options) => {
    let token = localStorage.getItem("jwt");
    if (!token) throw new Error(`NotAuthenticated`);

    const makeRequest = async () => {
        return await fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                "Authorization": `Bearer ${token}`
            }
        });
    };

    try {
        let response = await makeRequest();
        if (response.status === 401) {
            const newTokens = await RefreshToken();
            if (newTokens && newTokens.access_token) {
                token = newTokens.access_token;
                localStorage.setItem("jwt", token);
                response = await makeRequest();
            } else {
                throw new Error('RefreshFailError');
            }
        }
        return response;
    } catch (error) {
        throw new Error(`ProcessingRequestError ${error}`);
    }
};