import { FetchWithAuth } from "./FetchWithAuth";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const GetPostList = async (page, criteria) => {
    let fetchedPosts = null;
    try {
        let url = `${backendUrl}/post?page=${page}`;
        if (criteria !== null) {
            url += criteria;
        }
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`GetPostsError: ${response.statusText}`);
        }
        fetchedPosts = await response.json();
    } catch (error) {
        console.log(error)
    }
    return fetchedPosts;
};

export const getPost = async (postSlug) => {
    let postData = null;
    try {
        const url = `${backendUrl}/post/${postSlug}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`GetPostDataError: ${response.statusText}`);
        }
        postData = await response.json();
    } catch (error) {
        console.log(error)
    }
    return postData;
}

export const SavePost = async (method, postData) => {
    return await FetchWithAuth(`${backendUrl}/post`, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData)
    });
};

export const DeletePost = async (postId) => {
    return await FetchWithAuth(`${backendUrl}/post/${postId}`, {
        method: "DELETE"
    });
};