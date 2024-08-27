import { FetchWithAuth } from "./FetchWithAuth";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const LoginRequest = async (username, password, totp) => {
    const url = `${backendUrl}/login`;
    try {
        const response = await fetch(url,
            {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "username": username, "password": password, "totp": totp })
            });
        if (!response.ok) {
            throw new Error(`Login error: ${response.statusText}`);
        }
        const loginResponse = await response.json();
        localStorage.setItem("jwt", loginResponse.access_token);
        return loginResponse;
    } catch (error) {
        throw new Error(`LoginError`)
    }
};

export const LogoutRequest = async () => {
    const token = localStorage.getItem("jwt");
    if (!token) return false;
    const url = `${backendUrl}/revoke`;
    try {
        const response = await fetch(url,
            {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
        if (!response.ok) {
            throw new Error(`Error on logout: ${response.statusText}`);
        }
        localStorage.removeItem("jwt");
        return true;
    } catch (error) {
        return false;
    }
};

export const ValidateToken = async () => {
    try {
        const response = await FetchWithAuth(`${backendUrl}/valid`, { method: "GET" });
        if (!response.ok) {
            throw new Error(`Token validation error: ${response.statusText}`);
        }
        return true;
    } catch (error) {
        throw new Error(`ValueError ${error}`);
    }
};