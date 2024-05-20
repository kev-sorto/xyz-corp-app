import { UserPostType } from "@/types/userPostType";

const API_URL = process.env.apiUrl;
const API_TOKEN = process.env.apiToken;

type CreateNewPostOptions = {
    title: UserPostType["title"];
    content: UserPostType["body"];
    user_id: UserPostType["user_id"];
}
export async function createNewPost ({ title, content, user_id}: CreateNewPostOptions) {
    const body = {
        title,
        body: content
    }
    const res = await fetch(`${API_URL}/users/${user_id}/posts`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Authorization': `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json()
}