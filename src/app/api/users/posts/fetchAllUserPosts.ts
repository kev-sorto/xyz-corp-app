import { UserPostType } from "@/types/userPostType";
import { UserType } from "@/types/userType";

const API_URL = process.env.apiUrl;
const API_TOKEN = process.env.apiToken;

type FetchAllUserPostsOptions = {
    userId: UserType['id'];
}

export async function fetchAllUserPosts ({ userId }: FetchAllUserPostsOptions): Promise<UserPostType[]> {

    const res = await fetch(`${API_URL}/users/${userId}/posts`, {
        headers: {
            'Authorization': `Bearer ${API_TOKEN}`
        }
    });

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }
    return res.json()

}